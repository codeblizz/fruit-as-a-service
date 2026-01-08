package com.fruit.service.util;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.time.Duration;

@Service
public class RedisRateLimiter {

    private final StringRedisTemplate redisTemplate;

    // Configuration can be externalized to application.properties if needed
    private static final int MAX_REQUESTS = 100; // max requests per window
    private static final int WINDOW_SECONDS = 60; // 1 minute window

    public RedisRateLimiter(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public boolean tryAcquire(String key) {
        String redisKey = "rate_limit:" + key;

        // Atomically increment the counter for the key
        Long currentCount = redisTemplate.opsForValue().increment(redisKey);

        if (currentCount == null) return false;

        // If it's the first request in the window, set the TTL.
        // This relies on atomicity provided by Redis 'increment' and is generally safe.
        Long ttl = redisTemplate.getExpire(redisKey);
        if (ttl == null || ttl == -1) {
            redisTemplate.expire(redisKey, Duration.ofSeconds(WINDOW_SECONDS));
        }

        // Check the limit
        return currentCount <= MAX_REQUESTS;
    }
}
