package com.fruit.service.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.fruit.service.dto.AppApiResponse;
import com.fruit.service.dto.order.OrderRequest;
import com.fruit.service.entity.OrderEntity;
import com.fruit.service.mapper.AppApiResponseMapper;
import com.fruit.service.security.model.CustomUserDetails;
import com.fruit.service.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/order")
@Validated
@Tag(name = "Order Management API", description = "Endpoints for managing fruit orders such as placing, updating, deleting, and retrieving orders.")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @Operation(summary = "Place a new order")
    @ApiResponse(responseCode = "201", description = "Order successfully created")
    @ApiResponse(responseCode = "400", description = "Invalid order data")
    public ResponseEntity<AppApiResponse<OrderEntity>> placeOrder(@Valid @RequestBody OrderRequest orderRequest,
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        UUID currentUserId = customUserDetails.getUserId();
        OrderEntity newOrder = orderService.placeOrder(currentUserId, orderRequest);
        AppApiResponse<OrderEntity> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.CREATED,
                "Order successfully created",
                newOrder,
                null);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    @Operation(summary = "Retrieve specific order details")
    @ApiResponse(responseCode = "200", description = "Order successfully created")
    @ApiResponse(responseCode = "404", description = "Invalid order data")
    public ResponseEntity<AppApiResponse<OrderEntity>> findOrderById(@Valid @PathVariable UUID orderId) {
        OrderEntity order = orderService.findOrderById(orderId);
        AppApiResponse<OrderEntity> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Order successfully created",
                order,
                null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{orderId}")
    @Operation(summary = "Delete an order entry")
    @ApiResponse(responseCode = "204", description = "Deletion was successful")
    public ResponseEntity<AppApiResponse<Void>> cancelOrder(@Valid @PathVariable Long orderId) {
        // String message = orderService.softDeleteOrderById(orderId);
        AppApiResponse<Void> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.NO_CONTENT,
                "",
                null, null);
        return ResponseEntity.ok(response);
    }
}
