package com.fruit.service.dto.payment;

import com.fruit.service.enums.PaymentStatus;
import com.fruit.service.enums.PaymentProvider;

import java.math.BigDecimal;
import java.util.UUID;

public record PaymentResponse(
        UUID paymentId,
        UUID orderId,
        PaymentProvider provider,
        PaymentStatus status,
        BigDecimal amount,
        String externalReference) {
}