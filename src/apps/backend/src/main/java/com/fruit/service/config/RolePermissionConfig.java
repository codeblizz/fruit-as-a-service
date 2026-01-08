package com.fruit.service.config;

import java.util.Map;
import java.util.Set;

import com.fruit.service.enums.UserPermission;

public class RolePermissionConfig {
        public static final Map<String, Set<UserPermission>> ROLE_PERMISSIONS = Map.of(
                        "GUEST", Set.of(UserPermission.READ_FRUITS),
                        "STAFF", Set.of(
                                UserPermission.READ_FRUITS,
                                UserPermission.READ_PROFILE,
                                UserPermission.READ_ORDERS),
                        "USER", Set.of(
                                UserPermission.READ_FRUITS,
                                UserPermission.WRITE_ORDERS,
                                UserPermission.READ_PROFILE),
                        "CUSTOMER", Set.of(
                                UserPermission.READ_FRUITS,
                                UserPermission.WRITE_ORDERS,
                                UserPermission.READ_PROFILE),
                        "MANAGER", Set.of(
                                UserPermission.READ_USERS,
                                UserPermission.READ_FRUITS,
                                UserPermission.READ_ORDERS,
                                UserPermission.MANAGE_ORDERS),
                        "ADMIN", Set.of(
                                UserPermission.READ_USERS,
                                UserPermission.READ_FRUITS,
                                UserPermission.READ_ORDERS,
                                UserPermission.MANAGE_ORDERS,
                                UserPermission.DELETE_CACHE,
                                UserPermission.WRITE_FRUITS,
                                UserPermission.WRITE_ORDERS,
                                UserPermission.READ_PROFILE,
                                UserPermission.DELETE_FRUITS,
                                UserPermission.VIEW_REPORTS),
                        "SUPER", Set.of(UserPermission.ALL_ACCESS));
}
