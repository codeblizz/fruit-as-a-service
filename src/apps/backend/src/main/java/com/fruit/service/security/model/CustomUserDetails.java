package com.fruit.service.security.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import java.util.Collection;
import java.util.UUID;

public class CustomUserDetails extends User {

    private final UUID userId;

    public CustomUserDetails(
            UUID userId,
            String email,
            String passwordHash,
            Collection<? extends GrantedAuthority> authorities) {
        super(email, passwordHash, authorities);
        this.userId = userId;
    }

    public UUID getUserId() {
        return userId;
    }
}
