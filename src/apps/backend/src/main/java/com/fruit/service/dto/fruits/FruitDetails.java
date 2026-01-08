package com.fruit.service.dto.fruits;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.fruit.service.dto.FruitImageDto;
import com.fruit.service.dto.InventoryDto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response DTO for detailed Fruit information")
public record FruitDetails(
        @Schema(description = "Database internal ID") Long id,
        @Schema(description = "Public unique identifier") UUID fruitId,
        String botanicalName,
        String commonName,
        String originCountry,
        String description,
        @Schema(description = "Name of the associated category") String categoryName,
        List<InventoryDto> inventory,
        List<FruitImageDto> images,
        Integer totalStock,
        BigDecimal currentPrice) implements Serializable {
    private static final long serialVersionUID = 1L;
}