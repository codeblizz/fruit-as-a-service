package com.fruit.service.dto;

import java.time.Instant;
import java.util.Map;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Error Response DTO")
public record ErrorResponse(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path,
        Map<String, String> details
) {
}
