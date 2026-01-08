package com.fruit.service.dto;

import java.time.Instant;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "API Response DTO")
public record AppApiResponse<T>(
    Instant timestamp,
    int status,
    String message,
    T data,
    Object metadata
) {}
