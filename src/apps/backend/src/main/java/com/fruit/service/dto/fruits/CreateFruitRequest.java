package com.fruit.service.dto.fruits;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request DTO for creating a new Fruit")
public record CreateFruitRequest(
        String botanicalName,
        String commonName,
        String originCountry,
        String description,
        String imageUrl,
        Double pricePerUnit,
        Number stockQuantity,
        Long categoryId) {
}