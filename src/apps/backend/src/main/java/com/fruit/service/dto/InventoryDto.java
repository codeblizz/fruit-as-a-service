package com.fruit.service.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record InventoryDto(
        Long id,
        String batchNumber,
        Integer quantityReserved,
        UUID inventoryId,
        String supplier,
        Integer quantityAvailable,
        BigDecimal unitPrice,
        String status,
        String harvestDate,
        String expiryDate) implements java.io.Serializable {
    private static final long serialVersionUID = 1L;
}
