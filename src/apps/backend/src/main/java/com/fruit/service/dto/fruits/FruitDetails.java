package com.fruit.service.dto.fruits;

import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response DTO for detailed Fruit information")
public record FruitDetails(
        UUID fruitId,
        Long categoryId,
        String botanicalName,
        String commonName,
        String originCountry,
        String description,
        String imageUrl,
        String categoryName) {
}