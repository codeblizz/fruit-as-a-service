package com.fruit.service.gateway.paymentServiceGateway;

import com.fruit.service.dto.payment.PaymentRequest;
import com.fruit.service.dto.payment.PaymentResponse;
import com.fruit.service.enums.PaymentProvider;
import com.fruit.service.enums.PaymentStatus;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class PaystackGateway implements PaymentGateway {
    @Override
    public PaymentProvider getProviderType() {
        return PaymentProvider.PAYSTACK;
    }

    @Override
    public PaymentResponse charge(PaymentRequest request) {
        // --- Actual PAYSTACK SDK Integration Logic Here ---
        System.out.println("Processing payment for Order ID " + request.orderId() + " via PAYSTACK.");

        // Mock success response
        String externalId = "PAYSTACK-" + UUID.randomUUID().toString().substring(0, 8);
        return new PaymentResponse(
                null, // Internal ID will be set by our Service later
                request.orderId(),
                PaymentProvider.PAYSTACK,
                PaymentStatus.COMPLETED,
                new BigDecimal("150.00"), // Should fetch actual amount from OrderService
                externalId);
    }

    @Override
    public PaymentResponse verifyTransaction(String transactionId) {
        // --- Actual PAYSTACK API Verification Call ---
        // ...
        return new PaymentResponse(
                null, null, PaymentProvider.PAYSTACK,
                PaymentStatus.COMPLETED, new BigDecimal("150.00"), transactionId);
    }
}
