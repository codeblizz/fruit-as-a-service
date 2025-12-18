package com.fruit.service.dto.order;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;

@Schema(description = "Order Request DTO")
public record OrderRequest(
        @NotEmpty(message = "Order must contain at least one item") List<OrderItemRequest> items) {
}
