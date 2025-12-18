package com.fruit.service.dto.users;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Update User DTO Request")
public record UpdateUserRequest(
        @NotNull(message = "first name cannot be empty") String firstName,
        @NotNull(message = "last name cannot be empty") String lastName,
        @NotNull(message = "busness name cannot be empty") String businessName) {
}
