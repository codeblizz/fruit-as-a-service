package com.fruit.service.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.fruit.service.dto.AppApiResponse;
import com.fruit.service.dto.auth.SignupRequest;
import com.fruit.service.dto.users.UpdateUserRequest;
import com.fruit.service.dto.users.UserProfileResponse;
import com.fruit.service.entity.UserEntity;
import com.fruit.service.mapper.AppApiResponseMapper;
import com.fruit.service.mapper.UserMapper;
import com.fruit.service.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/users")
@Validated
@Tag(name = "User Management API", description = "Endpoints for managing available users and their profiles.")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    private static record UserExistResponse(Boolean isUserExist) {
    };

    @Autowired
    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping("/exist/{username}")
    @Operation(summary = "Retrieve a User by its ID", description = "Provides details about a specific fruit in inventory.")
    @ApiResponse(responseCode = "200", description = "User found successfully")
    @ApiResponse(responseCode = "404", description = "User not found for the given ID")
    public ResponseEntity<AppApiResponse<UserExistResponse>> isUserExist(@NotEmpty @PathVariable String email) {
        Boolean isExist = this.userService.isUserExist(email);
        UserExistResponse hasUser = new UserExistResponse(isExist);
        AppApiResponse<UserExistResponse> response = AppApiResponseMapper.mapOkResponse(
                "User found successful", hasUser);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile/user-id/{userId}")
    @Operation(summary = "Retrieve a user profile by its user id", description = "Provides details about a specific user.")
    @ApiResponse(responseCode = "200", description = "User profile found successfully")
    @ApiResponse(responseCode = "404", description = "User profile not found for the given ID")
    public ResponseEntity<AppApiResponse<UserProfileResponse>> findUserProfileById(@NotNull @PathVariable UUID userId) {
        UserEntity user = userService.findUserProfileById(userId);
        UserProfileResponse userProfileDto = userMapper.mapToUserProfileResponse(user);
        AppApiResponse<UserProfileResponse> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "User profile found successfully",
                userProfileDto,
                null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile/email/{email}")
    @Operation(summary = "Retrieve a user profile by its email", description = "Provides details about a specific user.")
    @ApiResponse(responseCode = "200", description = "User profile found successfully")
    @ApiResponse(responseCode = "404", description = "User profile not found for the given email")
    public ResponseEntity<AppApiResponse<UserEntity>> findUserProfileByEmail(@Email @PathVariable String email) {
        UserEntity user = userService.findUserProfileByEmail(email);
        AppApiResponse<UserEntity> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "User profile found successfully",
                user,
                null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    @Operation(summary = "Retrieve a user profile by its email", description = "Provides details about a specific user.")
    @ApiResponse(responseCode = "200", description = "User profile found successfully")
    @ApiResponse(responseCode = "404", description = "User profile not found for the given email")
    public ResponseEntity<AppApiResponse<UserProfileResponse>> findUserProfileByRole(@Valid @RequestParam("roles") String userRole,
            @RequestParam("isActive") String isActive) {
        if (isActive.equals("false")) {
            return ResponseEntity.ok(null);
        }
        UserEntity user = userService.findUserProfileByRole(userRole);
        UserProfileResponse userProfileDto = userMapper.mapToUserProfileResponse(user);
        AppApiResponse<UserProfileResponse> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "User profile found successfully",
                userProfileDto,
                null);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'SUPER')")
    @Operation(summary = "Create User Manager/Staff profile", description = "Create User Manager/Staff profile")
    @ApiResponse(responseCode = "200", description = "User Manager/Staff profile created successfully")
    @ApiResponse(responseCode = "404", description = "User Manager/Staff profile creation failed!")
    public ResponseEntity<AppApiResponse<Void>> createManagerOrStaffProfile(
            @Valid @PathVariable SignupRequest signupRequest) {
        String message = userService.createManagerOrStaffProfile(signupRequest);
        AppApiResponse<Void> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                message,
                null,
                null);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}")
    @Operation(summary = "Update User profile", description = "Update User profile")
    @ApiResponse(responseCode = "200", description = "User profile updated successfully")
    @ApiResponse(responseCode = "404", description = "User profile update failed!")
    public ResponseEntity<AppApiResponse<UserProfileResponse>> updateUser(@NotEmpty @PathVariable UUID userId,
            @RequestBody UpdateUserRequest userRequest) {
        UserEntity user = userService.updateUser(userId, userRequest);
        UserProfileResponse userProfileDto = userMapper.mapToUserProfileResponse(user);
        AppApiResponse<UserProfileResponse> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "User profile updated successfully",
                userProfileDto,
                null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{userId}")
    @Operation(summary = "Delete a user by its user id", description = "Delete details of a specific user.")
    @ApiResponse(responseCode = "200", description = "User deleted successfully")
    @ApiResponse(responseCode = "404", description = "Fruit not found for the given ID")
    public ResponseEntity<AppApiResponse<Void>> deleteUser(@NotEmpty @PathVariable Long userId) {
        String message = this.userService.deleteUser(userId);
        AppApiResponse<Void> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.NO_CONTENT,
                message,
                null, null);
        return ResponseEntity.ok(response);
    }
}
