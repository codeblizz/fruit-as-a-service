package com.fruit.service.mapper;

import java.util.Collections;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.fruit.service.dto.fruits.FruitDetails;
import com.fruit.service.entity.FruitEntity;
import com.fruit.service.dto.FruitImageDto;
import com.fruit.service.dto.InventoryDto;

@Component
public class FruitMapper {
    public FruitDetails mapToResponseDto(FruitEntity entity) {
        if (entity == null)
            return null;
        // Map Inventory entities to DTOs
        var inventoryDtos = entity.getInventory() != null
                ? entity.getInventory().stream()
                        .map(inv -> new InventoryDto(
                                inv.getId(),
                                inv.getBatchNumber(),
                                inv.getQuantityReserved(),
                                inv.getInventoryId(),
                                inv.getSupplier(),
                                inv.getQuantityAvailable(),
                                inv.getUnitPrice(),
                                inv.getStatus() != null ? inv.getStatus().name() : null,
                                inv.getHarvestDate() != null ? inv.getHarvestDate().toString() : null,
                                inv.getExpiryDate() != null ? inv.getExpiryDate().toString() : null))
                        .collect(Collectors.toList())
                : Collections.<InventoryDto>emptyList();

        // Map Image entities to DTOs
        var imageDtos = entity.getImages() != null
                ? entity.getImages().stream()
                        .map(img -> new FruitImageDto(
                                img.getId(),
                                img.getImageUrl(),
                                img.getCreatedAt() != null ? img.getCreatedAt().toString() : null))
                        .collect(Collectors.toList())
                : Collections.<FruitImageDto>emptyList();

        return new FruitDetails(
                entity.getId(),
                entity.getFruitId(),
                entity.getBotanicalName(),
                entity.getCommonName(),
                entity.getOriginCountry(),
                entity.getDescription(),
                entity.getCategory() != null ? entity.getCategory().getName() : "N/A",
                inventoryDtos,
                imageDtos,
                entity.getTotalStock(),
                entity.getCurrentPrice());
    }
}
