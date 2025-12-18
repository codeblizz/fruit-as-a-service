package com.fruit.service.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.AssertTrue;

@Schema(description = "Request DTO for user registration (sign-up)")
public record SignupRequest(
        @NotBlank(message = "Email cannot be empty") @Email(message = "Email should be valid") String email,
        @NotBlank(message = "Password cannot be empty") String password,
        @NotBlank(message = "First name cannot be empty") String firstName,
        @NotBlank(message = "Last name cannot be empty") String lastName,
        @NotBlank(message = "Business name is empty") String businessName,
        @NotNull(message = "Terms and conditions must be accepted") @AssertTrue(message = "You must accept the terms") Boolean termsAccepted,
        String role) {
}
            