package com.fruit.service.controller;

import java.lang.IllegalArgumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fruit.service.dto.AppApiResponse;
import com.fruit.service.mapper.AppApiResponseMapper;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/cache")
@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
@Validated
public class CacheController {
    private final CacheManager cacheManager;

    @Autowired
    public CacheController(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    private org.springframework.cache.Cache getCache(String cacheName) {
        org.springframework.cache.Cache cache = cacheManager.getCache(cacheName);
        if (cache == null) {
            throw new IllegalArgumentException("Cache name not found: " + cacheName);
        }
        return cache;
    }

    @DeleteMapping("/clear/{cacheName}")
    public ResponseEntity<AppApiResponse<String>> clearSpecificCache(@NotEmpty @PathVariable String cacheName) {
        getCache(cacheName).clear();
        AppApiResponse<String> response = AppApiResponseMapper.mapOkResponse(
                "Cache '" + cacheName + "' flushed successfully.", null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/evict/{cacheName}/{key}")
    public ResponseEntity<AppApiResponse<String>> evictSpecificCacheEntry(@NotEmpty @PathVariable String cacheName,
            @NotEmpty @PathVariable String key) {
        getCache(cacheName).evict(key);
        AppApiResponse<String> response = AppApiResponseMapper.mapOkResponse(
                String.format("Entry with key '%s' evicted from cache '%s'.", key, cacheName), null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/flushall")
    public ResponseEntity<AppApiResponse<String>> flushAllCaches() {
        cacheManager.getCacheNames()
                .forEach(cacheName -> Objects.requireNonNull(cacheManager.getCache(cacheName)).clear());
        AppApiResponse<String> response = AppApiResponseMapper.mapOkResponse(
                "All application caches flushed successfully.", null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/list")
    public ResponseEntity<AppApiResponse<List<String>>> listCacheNames() {
        List<String> names = cacheManager.getCacheNames().stream().collect(Collectors.toList());
        AppApiResponse<List<String>> response = AppApiResponseMapper.mapOkResponse(
                "List of application caches", names);
        return ResponseEntity.ok(response);
    }
}
