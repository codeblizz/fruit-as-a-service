package com.fruit.service.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

@Schema(description = "Add Stock Request DTO")
public record AddStockRequest(
        @NotNull(message = "Fruit ID is required") UUID fruitId,

        @NotNull(message = "Quantity must be specified") @Min(value = 1, message = "Quantity must be at least 1") Integer quantityAvailable,

        @NotNull(message = "Unit price is required") @DecimalMin(value = "0.01", inclusive = false, message = "Price must be greater than 0") BigDecimal unitPrice,

        @PastOrPresent(message = "Harvest date cannot be in the future") LocalDate harvestDate,

        @Future(message = "Expiry date must be in the future") LocalDate expiryDate,

        @NotBlank(message = "Batch number is required") String batchNumber,

        @NotBlank(message = "Supplier name is required") String supplier) {
}
