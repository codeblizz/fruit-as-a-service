package com.fruit.service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import com.fruit.service.dto.AppApiResponse;
import com.fruit.service.service.AuthService;
import com.fruit.service.mapper.AppApiResponseMapper;
import com.fruit.service.dto.auth.JwtResponse;
import com.fruit.service.dto.auth.SigninRequest;
import com.fruit.service.dto.auth.SignupRequest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController()
@RequestMapping("/auth")
@Validated
@Tag(name = "Authentication Management API", description = "Endpoints for managing authentication processes such as sign-in, sign-up, and sign-out.")
public class AuthController {
    private final AuthService authService;

    @Value("${frontend.base-url}")
    private String frontendBaseUrl;

    @Value("${app.verification.success-redirect-path}")
    private String redirectPath;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    private static record SignupResponse(UUID userId) {
    };

    @PostMapping("/signup")
    @Operation(summary = "Sign up a new account", description = "Provides details about a new account creation.")
    @ApiResponse(responseCode = "200", description = "Account created! Please check your email for verification.")
    @ApiResponse(responseCode = "404", description = "Fruit not found for the given ID")
    public ResponseEntity<AppApiResponse<SignupResponse>> signUp(@Valid @RequestBody SignupRequest signupRequest) {
        UUID userId = authService.signUp(signupRequest);
        SignupResponse signupResponse = new SignupResponse(userId);
        AppApiResponse<SignupResponse> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.CREATED,
                "Account created! Please check your email for verification.",
                signupResponse,
                null);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/signin")
    @Operation(summary = "Authenticate user and receive JWT token", description = "Provides details of user sign operation.")
    @ApiResponse(responseCode = "200", description = "Sign in successfully")
    @ApiResponse(responseCode = "401", description = "UnAuthorized User")
    public ResponseEntity<AppApiResponse<JwtResponse>> signIn(@Valid @RequestBody SigninRequest signinRequest) {
        JwtResponse jwtResponse = authService.signIn(signinRequest);
        AppApiResponse<JwtResponse> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Sign in successful",
                jwtResponse,
                null);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token/{token}")
    @Operation(summary = "Retrieve refresh token", description = "Provides details about a refresh token.")
    @ApiResponse(responseCode = "200", description = "Refretch token successful")
    @ApiResponse(responseCode = "404", description = "User not found for the given token")
    public ResponseEntity<AppApiResponse<String>> refreshToken(
            @NotEmpty(message = "Token must not be null or empty") @PathVariable String token) {
        String newToken = authService.refreshToken(token);
        AppApiResponse<String> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Refretch token successful",
                newToken,
                null);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signout")
    @Operation(summary = "Sign out ", description = "Provides details on sign out user.")
    @ApiResponse(responseCode = "200", description = "Sign out successful")
    @ApiResponse(responseCode = "400", description = "Authorization header token invalidated!")
    public ResponseEntity<AppApiResponse<String>> signOut(
            @NotEmpty @RequestHeader("Authorization") String authorizationHeader) {
        String message = authService.signOut(authorizationHeader);
        AppApiResponse<String> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                message,
                null,
                null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify")
    @Operation(summary = "Activate user account using verification token.")
    @ApiResponse(responseCode = "200", description = "Account successfully activated.")
    @ApiResponse(responseCode = "400", description = "Invalid or expired token.")
    public ResponseEntity<Void> verifyAccount(@NotEmpty @RequestParam("token") String token) {
        authService.verifyUser(token);
        String successMessage = "Account verified successfully! You can now log in.";
        String encodedMessage = URLEncoder.encode(successMessage, StandardCharsets.UTF_8);
        String redirectUrl = frontendBaseUrl + redirectPath + "?status=verified" + "&message="
                + encodedMessage;
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(redirectUrl));
        return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);
    }
}
