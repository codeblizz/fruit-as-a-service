package com.fruit.service.dto.categories;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Category Response DTO")
public record CategoryResponse(
        Long id,
        String name,
        String description) {
}
