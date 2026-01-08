package com.fruit.service.security;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.concurrent.TimeUnit;

@Service
public class TokenBlacklistService {
    private final StringRedisTemplate redisTemplate;
    private static final String BLACKLIST_PREFIX = "blacklist:";

    @Autowired
    public TokenBlacklistService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void blacklistToken(String token, long expirationSeconds) {
        redisTemplate.opsForValue().set(BLACKLIST_PREFIX + token, "invalidated", expirationSeconds, TimeUnit.SECONDS);
    }

    public boolean isTokenBlacklisted(String token) {
        // Check if the token key exists in Redis
        return Boolean.TRUE.equals(redisTemplate.hasKey(BLACKLIST_PREFIX + token));
    }

}
