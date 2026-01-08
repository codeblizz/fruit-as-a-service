package com.fruit.service.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.fruit.service.util.RedisRateLimiter;

import java.io.IOException;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private final RedisRateLimiter rateLimiter;

    @Autowired
    public RateLimitingFilter(RedisRateLimiter rateLimiter) {
        this.rateLimiter = rateLimiter;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Get the client's IP address (getRemoteAddr is often sufficient in dev,
        // but X-Forwarded-For is better in production behind a proxy)
        String clientIpAddress = request.getRemoteAddr();

        if (rateLimiter.tryAcquire(clientIpAddress)) {
            // Request allowed
            filterChain.doFilter(request, response);
        } else {
            // Request denied: 429 Too Many Requests
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write("Too many requests from this IP address. Please try again in 60 seconds.");
        }
    }
}
