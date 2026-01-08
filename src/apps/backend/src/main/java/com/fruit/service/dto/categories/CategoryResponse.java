package com.fruit.service.dto.categories;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Category Response DTO")
public record CategoryResponse(
        Long id,
        String name,
        String description,
        List<String> kinds) implements java.io.Serializable {
                private static final long serialVersionUID = 1L;
}
