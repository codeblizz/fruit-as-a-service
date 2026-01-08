package com.fruit.service.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.fruit.service.dto.auth.JwtResponse;
import com.fruit.service.dto.auth.SigninRequest;
import com.fruit.service.dto.auth.SignupRequest;
import com.fruit.service.dto.email.EmailDetails;
import com.fruit.service.entity.UserEntity;
import com.fruit.service.exception.ApiException;
import com.fruit.service.exception.RoleAssignmentException;
import com.fruit.service.exception.UserNotFoundException;
import com.fruit.service.gateway.emailServiceGateway.EmailService;
import com.fruit.service.repository.UserRepository;
import com.fruit.service.security.TokenBlacklistService;
import com.fruit.service.util.EmailUtil;
import com.fruit.service.util.JwtUtil;
import com.fruit.service.util.SecurityConstants;

import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final EmailUtil emailUtil;
    private final PasswordEncoder passwordEncoder;
    private final TokenBlacklistService blacklistService;
    private final EmailService emailService;
    private final String frontendBaseUrl;
    private final String preferredEmailServiceName;

    @Autowired
    public AuthService(
            // @Qualifier("resendEmailService") EmailService emailService,
            Map<String, EmailService> emailServiceMap,
            @Value("${app.email.service}") String preferredEmailServiceName,
            @Value("${frontend.base-url}") String frontendBaseUrl,
            UserRepository userRepository, @Lazy AuthenticationManager authenticationManager,
            JwtUtil jwtUtil, EmailUtil emailUtil,
            PasswordEncoder passwordEncoder, TokenBlacklistService blacklistService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.emailUtil = emailUtil;
        this.passwordEncoder = passwordEncoder;
        this.blacklistService = blacklistService;
        this.preferredEmailServiceName = preferredEmailServiceName;
        this.emailService = emailServiceMap.get(preferredEmailServiceName);
        this.frontendBaseUrl = frontendBaseUrl;
    }

    @Transactional
    public JwtResponse signIn(SigninRequest signinRequest) {
        UserEntity user = userRepository.findByEmail(signinRequest.email())
                .orElseThrow(() -> new UserNotFoundException("Error: User not found."));

        if (!user.isActive()) {
            throw new ApiException("Account is not active. Please check your email for verification.",
                    HttpStatus.FORBIDDEN);
        }

        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signinRequest.email(),
                            signinRequest.password()));

        } catch (AuthenticationException e) {
            throw new ApiException("Email or password is invalid.", HttpStatus.UNAUTHORIZED);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        List<String> roles = Optional.ofNullable(user.getRoles())
                .orElse(Collections.emptySet())
                .stream()
                .toList();

        List<String> permissions = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(authority -> !roles.contains(authority))
                .toList();
        String accessToken = jwtUtil.generateAccessToken(signinRequest.email(), roles);
        String refreshToken = jwtUtil.generateRefreshToken(signinRequest.email());
        user.setLastLogin(Instant.now());
        userRepository.save(user);
        return new JwtResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getUserId(),
                user.getProfileImageUrl(),
                permissions,
                user.getBusinessName(),
                user.isTermsAccepted(),
                user.isActive(),
                user.isVerified(),
                roles,
                accessToken,
                "Bearer",
                refreshToken);
    }

    @Transactional
    public UUID signUp(SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.email()).isPresent()) {
            throw new IllegalArgumentException("Error: Email is already in use!");
        }

        String requestedRole = signupRequest.role();
        String finalRole;

        if (StringUtils.hasText(requestedRole)
                && SecurityConstants.ALLOWED_ROLES.contains(requestedRole.toUpperCase())) {
            if (requestedRole.equalsIgnoreCase("ADMIN") || requestedRole.equalsIgnoreCase("MANAGER")
                    || requestedRole.equalsIgnoreCase("SUPER")) {
                throw new RoleAssignmentException(
                        "Security violation: The " + requestedRole.toUpperCase()
                                + " role cannot be assigned during standard registration.");
            }
            finalRole = requestedRole.toUpperCase();
        } else {
            finalRole = SecurityConstants.AUTH_DEFAULT_ROLE;
        }

        // Create new user entity and hash the password
        UserEntity user = new UserEntity();
        user.setEmail(signupRequest.email());
        user.setPasswordHash(passwordEncoder.encode(signupRequest.password()));
        user.setTermsAccepted(signupRequest.termsAccepted());
        user.setFirstName(signupRequest.firstName());
        user.setLastName(signupRequest.lastName());
        user.setBusinessName(signupRequest.businessName());
        user.getRoles().add(finalRole);
        user.setCreatedAt(Instant.now());

        UserEntity newUser = userRepository.save(user);
        try {
            this.generateAndSendVerificationToken(newUser);
        } catch (Exception e) {
            // Log the error. IMPORTANT: Do not re-throw here if token sending is
            // non-critical.
            // Handle error if user record is already saved, but the email failed.
            System.err.println(
                    "Failed to send verification email for user: " + newUser.getEmail() + " " + e.getMessage());
        }
        return newUser.getUserId();
    }

    public String signOut(String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Date expirationDate = jwtUtil.getExpirationDateFromJwtToken(token);
        long issuedAtMillis = System.currentTimeMillis();
        long expirationMillis = expirationDate.getTime();
        long remainingSeconds = Math.max(0, (expirationMillis - issuedAtMillis) / 1000);
        blacklistService.blacklistToken(token, remainingSeconds);
        return "Logout successful, token invalidated.";
    }

    public String refreshToken(String token) {
        UserEntity user = userRepository.findByEmail(jwtUtil.getUserNameFromJwtToken(token))
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        return jwtUtil.generateAccessToken(user.getEmail(), user.getRoles().stream().toList());
    }

    @Transactional
    public String generateAndSendVerificationToken(UserEntity user) {
        String token = jwtUtil.generateVerificationToken(user.getUserId());
        String verificationLink = frontendBaseUrl + "/auth/verify?token=" + token;

        EmailDetails details = emailUtil.buildEmailDetails(user, verificationLink);

        if (this.emailService == null) {
            throw new IllegalArgumentException(
                    "No EmailService found with name: " + preferredEmailServiceName +
                            ". Check 'app.email.service' property in application.properties.");
        }
        try {
            emailService.sendEmail(details);
        } catch (Exception e) {
            // Log the error and handle the failure gracefully
            System.err.println("Failed to send email: " + e.getMessage());
        }
        System.out.println("Email sent to " + user.getEmail() + " with token: " + token);
        return token;
    }

    @Transactional
    public boolean verifyUser(String token) {
        UUID userId = jwtUtil.validateVerificationToken(token)
                .orElseThrow(() -> new ApiException("Invalid or expired verification link.", HttpStatus.BAD_REQUEST));

        UserEntity user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException("User not found.", HttpStatus.NOT_FOUND));

        if (user.isActive() && user.isVerified()) {
            throw new ApiException("Account is already verifed and active.", HttpStatus.CONFLICT);
        }

        user.setActive(true);
        user.setVerified(true);
        userRepository.save(user);
        return true;
    }

}
