package com.fruit.service.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${fruit.app.jwt.expiration-ms}")
    private int jwtExpirationMs;

    @Value("${fruit.app.jwt.verification.expiration}")
    private long tokenVerificationExpirationMs;

    @Value("${fruit.app.jwt.refreshExpiration-ms}")
    private int jwtRefreshExpirationMs;

    private final SecretKey verificationSigningKey;
    private final SecretKey authSigningKey;

    public JwtUtil(
            @Value("${fruit.app.jwt.secret}") String jwtSecret,
            @Value("${fruit.app.jwt.verification.secret}") String verificationSecret) {
        this.authSigningKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
        this.verificationSigningKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(verificationSecret));
    }

    public String generateAccessToken(String email, java.util.List<String> roles) {
        return Jwts.builder()
                .subject(email)
                .id(UUID.randomUUID().toString())
                .claims().add("roles", roles).and()
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(authSigningKey)
                .compact();
    }

    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .subject(email)
                .id(UUID.randomUUID().toString())
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtRefreshExpirationMs))
                .signWith(authSigningKey)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().verifyWith(authSigningKey).build()
                .parseSignedClaims(token).getPayload().getSubject();
    }

    public Date getExpirationDateFromJwtToken(String token) {
        return Jwts.parser().verifyWith(authSigningKey).build()
                .parseSignedClaims(token).getPayload().getExpiration();
    }

    public boolean validateJwtToken(String authToken, UserDetails userDetails) {
        try {
            Jwts.parser().verifyWith(authSigningKey).build().parseSignedClaims(authToken);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            logger.error("Invalid JWT signature/format: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    public String generateVerificationToken(UUID userId) {
        Instant now = Instant.now();
        Date expirationDate = Date.from(now.plusMillis(tokenVerificationExpirationMs));

        return Jwts.builder()
                .subject(userId.toString())
                .id(UUID.randomUUID().toString())
                .issuedAt(Date.from(now))
                .expiration(expirationDate)
                .signWith(verificationSigningKey)
                .compact();
    }

    public Optional<UUID> validateVerificationToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(verificationSigningKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return Optional.of(UUID.fromString(claims.getSubject()));
        } catch (Exception e) {
            logger.warn("Verification token validation failed: {}", e.getMessage());
            return Optional.empty();
        }
    }

}