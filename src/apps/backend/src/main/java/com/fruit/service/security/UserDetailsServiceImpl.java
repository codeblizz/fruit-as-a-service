package com.fruit.service.security;

import com.fruit.service.config.RolePermissionConfig;
import com.fruit.service.entity.UserEntity;
import com.fruit.service.enums.UserPermission;
import com.fruit.service.repository.UserRepository;
import com.fruit.service.security.model.CustomUserDetails;

import java.util.Collection;
import java.util.HashSet;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(@Lazy UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        Collection<? extends GrantedAuthority> authorities = getAuthorities(userEntity.getRoles());

        return new CustomUserDetails(
                userEntity.getUserId(),
                userEntity.getEmail(),
                userEntity.getPasswordHash(),
                authorities);
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Set<String> roles) {
        Set<String> authorities = new HashSet<>();
        authorities.addAll(roles);
        for (String role : roles) {
            Set<UserPermission> perms = RolePermissionConfig.ROLE_PERMISSIONS.get(role);
            if (perms != null) {
                perms.stream()
                        .map(UserPermission::name)
                        .forEach(authorities::add);
            }
        }
        return authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}