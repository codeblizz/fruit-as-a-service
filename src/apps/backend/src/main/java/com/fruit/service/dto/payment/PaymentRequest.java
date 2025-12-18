package com.fruit.service.dto.payment;

import java.util.UUID;

import com.fruit.service.enums.PaymentProvider;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

@Schema(description = "Data Transfer Object for Payment Request")
public record PaymentRequest(
        @NotNull(message = "Order ID is required") UUID orderId,

        @NotNull(message = "Payment method is required") PaymentProvider provider,

        // In a real app, this would include card/token details, but we simplify for
        // architecture
        @NotBlank(message = "Payment token/nonce is required") String paymentToken) {
}
