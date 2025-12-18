package com.fruit.service.dto.order;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Order Item Request DTO")
public record OrderItemRequest(
        @NotNull(message = "Inventory ID is required") Long inventoryId,

        @NotNull(message = "Quantity must be specified") @Min(value = 1, message = "Quantity must be at least 1") Integer quantity) {
}
