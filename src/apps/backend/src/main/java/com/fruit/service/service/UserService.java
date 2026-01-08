package com.fruit.service.service;

import com.fruit.service.dto.auth.SignupRequest;
import com.fruit.service.dto.users.UpdateUserRequest;
import com.fruit.service.entity.UserEntity;
import com.fruit.service.exception.UserNotFoundException;
import com.fruit.service.repository.UserRepository;
import com.fruit.service.util.SecurityConstants;
import com.fruit.service.exception.ApiException;
import com.fruit.service.exception.RoleAssignmentException;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.cache.annotation.CachePut;
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

    @Transactional
    @Caching(put = { @CachePut(value = "user", key = "#result.id") }, evict = {
            @CacheEvict(value = "user", key = "'allUsers'") })
    public String createManagerOrStaffProfile(SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.email()).isPresent()) {
            throw new ApiException("User profile with email " + signupRequest.email() +
                    " already exists.", HttpStatus.CONFLICT);
        }
        String requestedRole = signupRequest.role().toUpperCase();
        if (!SecurityConstants.ALLOWED_STAFF_ROLES.contains(requestedRole)) {
            throw new RoleAssignmentException("Invalid role specified for staff/manager creation.");
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
        newUser.setBusinessName("Internal Business Staff/Manager");
        userRepository.save(newUser);
        return "Staff/Manager user created successfully";
    }

    @Cacheable(value = "user", key = "#userId")
    @Transactional(readOnly = true)
    public UserEntity findUserProfileById(UUID userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Cacheable(value = "user", key = "#email")
    @Transactional(readOnly = true)
    public UserEntity findUserProfileByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Cacheable(value = "user", key = "#userRole")
    @Transactional(readOnly = true)
    public UserEntity findUserProfileByRole(String userRole) {
        return userRepository.findByRoles(userRole).orElse(null);
    }

    @Cacheable(value = "users", key = "'allUsers'")
    @Transactional(readOnly = true)
    public List<UserEntity> findAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Caching(put = { @CachePut(value = "user", key = "#result.id") }, evict = {
            @CacheEvict(value = "users", key = "'allUsers'") })
    public UserEntity updateUser(UUID userId, UpdateUserRequest userRequest) {
        UserEntity user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("User profile not found"));
        user.setBusinessName(userRequest.businessName());
        user.setFirstName(userRequest.firstName());
        user.setLastName(userRequest.lastName());
        return userRepository.save(user);
    }

    // @Modifying
    @Transactional
    // @Query("DELETE FROM User u WHERE u.id = :id")
    @Caching(evict = {
            @CacheEvict(value = "user", key = "#userId"),
            @CacheEvict(value = "users", key = "'allUsers'")
    })
    public String deleteUser(UUID userId) {
        userRepository.deleteByUserId(userId);
        return "User with ID " + userId + " has been deleted.";
    }

}
