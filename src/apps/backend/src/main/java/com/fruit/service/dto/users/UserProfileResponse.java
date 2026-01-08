package com.fruit.service.dto.users;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public record UserProfileResponse(
        UUID userId,
        String firstName,
        String lastName,
        String email,
        String businessName,
        Set<String> roles,
        Instant createdAt,
        Instant updatedAt,
        Instant lastLogin,
        boolean isActive,
        boolean isVerified,
        boolean isLocked,
        boolean isTwoFactorEnabled) {
}
