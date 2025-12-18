package com.fruit.service.util;

import com.fruit.service.enums.UserRole;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public final class SecurityConstants {

    private SecurityConstants() {
    }

    public static final Set<String> ALLOWED_ROLES = Arrays.stream(UserRole.values())
            .map(Enum::name)
            .collect(Collectors.toUnmodifiableSet());

    public static final String AUTH_DEFAULT_ROLE = UserRole.USER.name();

    public static final Set<String> PRIVILEGED_ROLE = Set.of(UserRole.SUPER.name(), UserRole.ADMIN.name());

    public static final Set<String> ALLOWED_ADMIN_STAFF_ROLES = Set.of(
            UserRole.MANAGER.name(),
            UserRole.STAFF.name());
}
