package com.fruit.service.mapper;

import org.springframework.stereotype.Component;

import com.fruit.service.dto.users.UserProfileResponse;
import com.fruit.service.entity.UserEntity;

@Component
public class UserMapper {

    public UserProfileResponse mapToUserProfileResponse(UserEntity entity) {
        if (entity == null) {
            return null;
        }
        return new UserProfileResponse(
                entity.getUserId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getEmail(),
                entity.getBusinessName(),
                entity.getRoles(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                entity.getLastLogin(),
                entity.isActive(),
                entity.isVerified(),
                entity.isLocked(),
                entity.isTwoFactorEnabled());
    }
}
