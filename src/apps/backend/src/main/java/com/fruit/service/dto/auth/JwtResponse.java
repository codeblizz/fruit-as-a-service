package com.fruit.service.dto.auth;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Jwt Response DTO")
public record JwtResponse(
                @NotEmpty(message = "FirstName must not be empty") String firstName,
                @NotEmpty(message = "LastName must not be empty") String lastName,
                @NotEmpty(message = "Email must not be empty.") String email,
                @NotNull(message = "User id must not be empty.") UUID userId,
                String profileImageUrl,
                List<String> permissions,
                @NotEmpty(message = "Business name must not be empty.") String businessName,
                @NotEmpty(message = "Terms accepted must not be empty") boolean termsAccepted,
                @NotEmpty(message = "Active status must not be empty") boolean isActive,
                @NotEmpty(message = "Verified status must not be empty") boolean isVerified,
                @NotNull(message = "Roles list must not be null.") @NotEmpty(message = "Roles list must contain at least one role.") @Valid List<@NotBlank(message = "Role name must not be blank.") String> roles,
                @NotBlank(message = "Token value must not be empty.") String accessToken,
                @NotBlank(message = "Token type must not be empty.") String type,
                @NotBlank(message = "Refresh token value must not be empty.") String refreshToken) {
}