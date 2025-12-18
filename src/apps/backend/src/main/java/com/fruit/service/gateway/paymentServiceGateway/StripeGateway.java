package com.fruit.service.gateway.paymentServiceGateway;

import com.fruit.service.dto.payment.PaymentRequest;
import com.fruit.service.dto.payment.PaymentResponse;
import com.fruit.service.enums.PaymentProvider;
import com.fruit.service.enums.PaymentStatus;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class StripeGateway implements PaymentGateway {

    @Override
    public PaymentProvider getProviderType() {
        return PaymentProvider.STRIPE;
    }

    @Override
    public PaymentResponse charge(PaymentRequest request) {
        // --- Actual Stripe SDK Integration Logic Here ---
        System.out.println("Processing payment for Order ID " + request.orderId() + " via Stripe.");

        // Mock success response
        String externalId = "STRIPE-" + UUID.randomUUID().toString().substring(0, 8);
        return new PaymentResponse(
                null, // Internal ID will be set by our Service later
                request.orderId(),
                PaymentProvider.STRIPE,
                PaymentStatus.COMPLETED,
                new BigDecimal("150.00"), // Should fetch actual amount from OrderService
                externalId);
    }

    @Override
    public PaymentResponse verifyTransaction(String transactionId) {
        // --- Actual Stripe API Verification Call ---
        // ...
        return new PaymentResponse(
                null, null, PaymentProvider.STRIPE,
                PaymentStatus.COMPLETED, new BigDecimal("150.00"), transactionId);
    }
}
