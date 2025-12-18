package com.fruit.service.util;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.time.Duration;

@Service
public class RedisRateLimiter {

    private final StringRedisTemplate redisTemplate;

    // Configuration can be externalized to application.properties if needed
    private static final int MAX_REQUESTS = 10;
    private static final int WINDOW_SECONDS = 60; // 1 minute

    public RedisRateLimiter(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * Checks if the request is allowed based on the Fixed Window limit.
     * 
     * @param key The unique identifier (e.g., client IP address).
     * @return true if allowed, false if the limit is exceeded.
     */
    public boolean tryAcquire(String key) {
        // Use a descriptive key prefix in Redis
        String redisKey = "rate_limit:" + key;

        // 1. Atomically increment the counter for the key
        Long currentCount = redisTemplate.opsForValue().increment(redisKey);

        if (currentCount == null) {
            return false;
        }

        // 2. If it's the first request in the window, set the TTL.
        // This relies on atomicity provided by Redis 'increment' and is generally safe.
        if (currentCount == 1) {
            redisTemplate.expire(redisKey, Duration.ofSeconds(WINDOW_SECONDS));
        }

        // 3. Check the limit
        return currentCount <= MAX_REQUESTS;
    }
}
