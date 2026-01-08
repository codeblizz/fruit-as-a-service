package com.fruit.service.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.fruit.service.dto.AppApiResponse;
import com.fruit.service.dto.payment.PaymentRequest;
import com.fruit.service.dto.payment.PaymentResponse;
import com.fruit.service.entity.PaymentEntity;
import com.fruit.service.enums.PaymentStatus;
import com.fruit.service.mapper.AppApiResponseMapper;
import com.fruit.service.service.PaymentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/payments")
@Validated
@Tag(name = "Payment Management API", description = "Endpoints for managing available payments and their history.")
public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Retrieve a payment details by ID", description = "Provides details about a specific payment.")
    @ApiResponse(responseCode = "200", description = "Payment details retrieved successfully")
    @ApiResponse(responseCode = "404", description = "Payment details not found for the given ID")
    public ResponseEntity<AppApiResponse<PaymentResponse>> getPaymentById(@Valid @PathVariable UUID orderId) {
        PaymentResponse paymentResponse = paymentService.getPaymentById(orderId);
        AppApiResponse<PaymentResponse> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Payment details retrieved successfully",
                paymentResponse,
                null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    @Operation(summary = "Retrieve payment history", description = "Provides list of payment history.")
    @ApiResponse(responseCode = "200", description = "Payment history successful")
    @ApiResponse(responseCode = "404", description = "Payment history not found")
    public ResponseEntity<AppApiResponse<List<PaymentEntity>>> getPaymentHistory(@Valid 
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<PaymentEntity> fruitHistory = paymentService.getPaymentHistory(page, size);
        AppApiResponse<List<PaymentEntity>> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Payment history retrieved successfully",
                fruitHistory,
                null);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/initiate")
    @Operation(summary = "Initiate a new payment for an existing order")
    @ApiResponse(responseCode = "200", description = "Payment successful")
    @ApiResponse(responseCode = "400", description = "Invalid payment paramater")
    public ResponseEntity<AppApiResponse<PaymentResponse>> initiatePayment(@Valid @RequestBody PaymentRequest request) {
        PaymentResponse paymentData = paymentService.initiatePayment(request);
        if (paymentData.status() == PaymentStatus.PENDING) {
            AppApiResponse<PaymentResponse> response = AppApiResponseMapper.mapToApiResponse(
                    HttpStatus.ACCEPTED,
                    "Payment initiated!",
                    paymentData,
                    null);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } else if (paymentData.status() == PaymentStatus.COMPLETED) {
            AppApiResponse<PaymentResponse> response = AppApiResponseMapper.mapToApiResponse(
                    HttpStatus.CREATED,
                    "Payment initiated!",
                    paymentData,
                    null);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            AppApiResponse<PaymentResponse> response = AppApiResponseMapper.mapToApiResponse(
                    HttpStatus.BAD_REQUEST,
                    "Payment attempt failed immediately.",
                    paymentData,
                    null);

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/verify/{transactionId}")
    @Operation(summary = "Verify the status of a payment using the gateway transaction ID")
    @ApiResponse(responseCode = "200", description = "Payment verified!")
    @ApiResponse(responseCode = "400", description = "Invalid payment verification paramater")
    public ResponseEntity<AppApiResponse<PaymentResponse>> verifyPayment(@Valid @PathVariable String transactionId) {
        PaymentResponse paymentData = paymentService.verifyPayment(transactionId);
        AppApiResponse<PaymentResponse> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Payment verified!",
                paymentData,
                null);
        return ResponseEntity.ok(response);
    }
}
