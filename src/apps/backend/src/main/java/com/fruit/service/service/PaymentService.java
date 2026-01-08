package com.fruit.service.service;

import com.fruit.service.dto.payment.PaymentRequest;
import com.fruit.service.dto.payment.PaymentResponse;
import com.fruit.service.entity.OrderEntity;
import com.fruit.service.entity.PaymentEntity;
import com.fruit.service.enums.OrderStatus;
import com.fruit.service.enums.PaymentProvider;
import com.fruit.service.exception.InvalidOrderException;
import com.fruit.service.gateway.paymentServiceGateway.PaymentGateway;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;

import com.fruit.service.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderService orderService;

    // Map to hold all injected PaymentGateway implementations (DIP/Composition)
    private final Map<PaymentProvider, PaymentGateway> gatewayStrategies;

    @Autowired
    public PaymentService(
            PaymentRepository paymentRepository,
            OrderService orderService,
            List<PaymentGateway> gateways) {
        this.paymentRepository = paymentRepository;
        this.orderService = orderService;
        // Collect all gateways into a map keyed by their provider type for quick lookup
        this.gatewayStrategies = gateways.stream()
                .collect(Collectors.toMap(PaymentGateway::getProviderType, Function.identity()));
    }

    @Cacheable(value = "paymentCache", key = "#request.orderId")
    public PaymentResponse getPaymentById(UUID orderId) {
        PaymentEntity payment = paymentRepository.findByPaymentId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found: " + orderId));

        UUID itemUuid = payment.getOrder().getOrderItemUuids().stream().filter((data) -> data.equals(orderId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Target item not found in order."));

        return new PaymentResponse(
                payment.getPaymentId(),
                itemUuid,
                payment.getProvider(),
                payment.getStatus(),
                payment.getAmountPaid(),
                payment.getGatewayTransactionId());
    }

    @Cacheable(value = "paymentHistoryCache", key = "#page + '-' + #size")
    public List<PaymentEntity> getPaymentHistory(int page, int size) {
        // Implementation here
        return paymentRepository.findAll();
    }

    @Transactional
    @Cacheable()
    public PaymentResponse initiatePayment(PaymentRequest request) {
        OrderEntity order = orderService.findOrderById(request.orderId());
        if (order.getStatus() != OrderStatus.PENDING)
            throw new InvalidOrderException("You don't have a pending order");

        PaymentGateway gateway = gatewayStrategies.get(request.provider());
        if (gateway == null) {
            throw new IllegalArgumentException("Unsupported payment provider: " + request.provider());
        }

        PaymentResponse gatewayResponse = gateway.charge(request);

        PaymentEntity payment = new PaymentEntity();
        payment.setOrder(order);
        payment.setProvider(request.provider());
        payment.setAmountPaid(gatewayResponse.amount());
        payment.setStatus(gatewayResponse.status());
        payment.setPaymentDate(Instant.now());
        payment.setGatewayTransactionId(gatewayResponse.externalReference());
        payment.setInternalReference(UUID.randomUUID().toString());

        paymentRepository.save(payment);

        UUID itemUuid = payment.getOrder().getOrderItemUuids().stream()
                .filter((data) -> data.equals(payment.getPaymentId())).findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Target item not found in order."));

        // Update Order status based on final payment status (if COMPLETED/FAILED)
        // orderService.updateOrderStatus(order, payment.getStatus());

        return new PaymentResponse(
                payment.getPaymentId(),
                itemUuid,
                payment.getProvider(),
                payment.getStatus(),
                payment.getAmountPaid(),
                payment.getGatewayTransactionId());
    }

    // Verifying a payment using an external ID
    public PaymentResponse verifyPayment(String transactionId) {
        // Find payment by its internal reference or external ID, then call the relevant
        // gateway's verifyTransaction() method.
        // ...
        return null;
    }
}
