package com.fruit.service.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

@Schema(description = "Request DTO for user sign-in")
public record SigninRequest(
    @NotBlank(message = "Email cannot be empty") @Email(message = "Email should be valid") String email,
    @NotBlank(message = "Password cannot be empty") String password) {
}
