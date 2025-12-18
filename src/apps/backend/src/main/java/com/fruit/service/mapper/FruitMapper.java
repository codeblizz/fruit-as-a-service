package com.fruit.service.mapper;

import org.springframework.stereotype.Component;

import com.fruit.service.dto.fruits.FruitDetails;
import com.fruit.service.entity.FruitEntity;

@Component
public class FruitMapper {
    // Helper method to map Entity to Response DTO
    public FruitDetails mapToResponseDto(FruitEntity entity) {
        return new FruitDetails(
                entity.getFruitId(),
                entity.getId(),
                entity.getBotanicalName(),
                entity.getCommonName(),
                entity.getOriginCountry(),
                entity.getDescription(),
                entity.getImageUrl(),
                entity.getCategory() != null ? entity.getCategory().getName() : "N/A");
    }
}
