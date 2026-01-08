package com.fruit.service.gateway.paymentServiceGateway;

import com.fruit.service.dto.payment.PaymentRequest;
import com.fruit.service.dto.payment.PaymentResponse;
import com.fruit.service.enums.PaymentProvider;

public interface PaymentGateway {

    PaymentProvider getProviderType();

    PaymentResponse charge(PaymentRequest request);

    PaymentResponse verifyTransaction(String transactionId);
}
