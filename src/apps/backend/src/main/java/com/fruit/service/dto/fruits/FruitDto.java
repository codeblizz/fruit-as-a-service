package com.fruit.service.dto.fruits;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object for Fruit details")
public record FruitDto(
        Long id,
        String name,
        String color,
        Double price) {
}
