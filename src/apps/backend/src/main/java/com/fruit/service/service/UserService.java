package com.fruit.service.service;

import com.fruit.service.dto.auth.SignupRequest;
import com.fruit.service.dto.users.UpdateUserRequest;
import com.fruit.service.entity.UserEntity;
import com.fruit.service.exception.UserNotFoundException;
import com.fruit.service.repository.UserRepository;
import com.fruit.service.util.SecurityConstants;
import com.fruit.service.exception.ApiException;
import com.fruit.service.exception.RoleAssignmentException;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean isUserExist(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    @Cacheable(value = "createManagerOrStaffProfileCache", key = "#signupRequest")
    public String createManagerOrStaffProfile(SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.email()).isPresent()) {
            throw new ApiException("User profile with email " + signupRequest.email() +
                    " already exists.", HttpStatus.CONFLICT);
        }
        String requestedRole = signupRequest.role().toUpperCase();
        if (!SecurityConstants.PRIVILEGED_ROLE.contains(requestedRole)) {
            throw new RoleAssignmentException("Invalid role specified for admin/staff creation.");
        }
        UserEntity newUser = new UserEntity();
        newUser.setEmail(signupRequest.email());
        String encodedPassword = passwordEncoder.encode(signupRequest.password());
        newUser.setPasswordHash(encodedPassword);
        newUser.setFirstName(signupRequest.firstName());
        newUser.setLastName(signupRequest.lastName());
        newUser.getRoles().add(requestedRole);
        newUser.setTermsAccepted(true);
        newUser.setCreatedAt(Instant.now());
        newUser.setBusinessName("Internal Business Staff/Admin");
        userRepository.save(newUser);
        return "Admin/Staff user created successfully";
    }

    @Cacheable(value = "userProfileByIdCache", key = "#userId")
    public UserEntity findUserProfileById(UUID userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Cacheable(value = "userProfileByEmailCache", key = "#email")
    public UserEntity findUserProfileByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Cacheable(value = "userProfileByRoleCache", key = "#userRole")
    public UserEntity findUserProfileByRole(String userRole) {
        return userRepository.findByRoles(userRole).orElse(null);
    }

    @Transactional
    @CacheEvict(value = "updateUserCache", key = "#userId")
    @Cacheable(value = "updateUserCache", key = "#userId")
    public UserEntity updateUser(UUID userId, UpdateUserRequest userRequest) {
        UserEntity user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("User profile not found"));
        user.setBusinessName(userRequest.businessName());
        user.setFirstName(userRequest.firstName());
        user.setLastName(userRequest.lastName());
        return userRepository.save(user);
    }

    @CacheEvict(value = "deleteUserCache", key = "#userId")
    public String deleteUser(Long userId) {
        userRepository.deleteById(userId);
        return "User with ID " + userId + " has been deleted.";
    }

}
