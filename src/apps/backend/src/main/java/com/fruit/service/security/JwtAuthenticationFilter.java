package com.fruit.service.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.security.core.AuthenticationException;
import io.jsonwebtoken.ExpiredJwtException;

import com.fruit.service.util.JwtUtil;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenBlacklistService blacklistService;
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;
    private final HandlerExceptionResolver resolver;

    @Autowired
    public JwtAuthenticationFilter(TokenBlacklistService blacklistService,
            JwtUtil jwtUtil,
            UserDetailsServiceImpl userDetailsService, 
            @Qualifier("handlerExceptionResolver") HandlerExceptionResolver resolver) {
        this.blacklistService = blacklistService;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.resolver = resolver;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        try {
            if (header != null && header.startsWith("Bearer ")) {
                jwt = header.substring(7);
    
                if (blacklistService.isTokenBlacklisted(jwt)) {
                    throw new BadCredentialsException("Token invalidated or blacklisted");
                }
                username = jwtUtil.getUserNameFromJwtToken(jwt);
            }
    
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
    
                if (jwtUtil.validateJwtToken(jwt, userDetails)) { 
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    throw new BadCredentialsException("Token validation failed");
                }
            }
            filterChain.doFilter(request, response);
        } catch(ExpiredJwtException e) {
            resolver.resolveException(request, response, null, new BadCredentialsException("JWT token has expired", e));
        } catch(AuthenticationException | io.jsonwebtoken.JwtException e) {
            resolver.resolveException(request, response, null, e);
        } catch(Exception e) {
            resolver.resolveException(request, response, null, e);
        }
    }
}

