package com.fruit.service.gateway.paymentServiceGateway;

import com.fruit.service.dto.payment.PaymentRequest;
import com.fruit.service.dto.payment.PaymentResponse;
import com.fruit.service.enums.PaymentProvider;
import com.fruit.service.enums.PaymentStatus;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class PayPalGateway implements PaymentGateway {

    @Override
    public PaymentProvider getProviderType() {
        return PaymentProvider.PAYPAL;
    }

    @Override
    public PaymentResponse charge(PaymentRequest request) {
        // --- Actual PAYPAL SDK Integration Logic Here ---
        System.out.println("Processing payment for Order ID " + request.orderId() + " via PAYPAL.");

        // Mock success response
        String externalId = "PAYPAL-" + UUID.randomUUID().toString().substring(0, 8);
        return new PaymentResponse(
                null, // Internal ID will be set by our Service later
                request.orderId(),
                PaymentProvider.PAYPAL,
                PaymentStatus.COMPLETED,
                new BigDecimal("150.00"), // Should fetch actual amount from OrderService
                externalId);
    }

    @Override
    public PaymentResponse verifyTransaction(String transactionId) {
        // --- Actual PAYPAL API Verification Call ---
        // ...
        return new PaymentResponse(
                null, null, PaymentProvider.PAYPAL,
                PaymentStatus.COMPLETED, new BigDecimal("150.00"), transactionId);
    }
}