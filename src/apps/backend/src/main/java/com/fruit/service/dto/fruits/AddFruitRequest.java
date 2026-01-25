package com.fruit.service.dto.fruits;

import java.math.BigDecimal;
import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Request DTO for creating a new Fruit with its initial inventory batch")
public record AddFruitRequest(
                @NotBlank(message = "Botanical name is required") String botanicalName,

                @NotBlank(message = "Common name is required") String commonName,

                String originCountry,
                String description,

                @NotNull(message = "Category name is required") String categoryName,

                @Schema(description = "Price per unit for this initial batch", example = "2.50") @NotNull(message = "Unit price is required") @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero") BigDecimal unitPrice,

                @Schema(description = "Initial quantity available for this batch", example = "100") @NotNull(message = "Initial stock is required") @Min(value = 0, message = "Stock cannot be negative") Integer currentStock,

                @Schema(description = "The date the fruit was harvested", example = "2023-10-01") @NotNull(message = "Harvest date is required") LocalDate harvestDate,

                @Schema(description = "The date the fruit expires", example = "2023-11-01") @NotNull(message = "Expiry date is required") LocalDate expiryDate,

                @Schema(description = "The supplier name for this batch") String supplier,

                @Schema(description = "Optional batch number (system will generate if null)") String batchNumber) {
}