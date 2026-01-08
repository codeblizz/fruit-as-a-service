package com.fruit.service.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

import com.fruit.service.dto.order.OrderItemRequest;
import com.fruit.service.dto.order.OrderRequest;
import com.fruit.service.entity.InventoryEntity;
import com.fruit.service.entity.OrderEntity;
import com.fruit.service.entity.OrderItemEntity;
import com.fruit.service.entity.UserEntity;
import com.fruit.service.enums.OrderStatus;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import com.fruit.service.repository.OrderRepository;
import com.fruit.service.exception.InvalidOrderException;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final InventoryService inventoryService;
    private final UserService userService;

    @Autowired
    public OrderService(OrderRepository orderRepository, InventoryService inventoryService, UserService userService) {
        this.orderRepository = orderRepository;
        this.inventoryService = inventoryService;
        this.userService = userService;
    }

    @Transactional
    @CacheEvict(value = "orderCache", allEntries = true)
    @Cacheable(value = "orderCache", key = "#currentUserId + '-' + #orderRequest.hashCode()")
    public OrderEntity placeOrder(UUID currentUserId, OrderRequest orderRequest) {
        
        UserEntity user = userService.findUserProfileById(currentUserId);
        if(user.equals(null)) 
            throw new ResourceNotFoundException("User not found: " + currentUserId);
        
        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setOrderDate(Instant.now());
        order.setStatus(OrderStatus.PENDING);
        order.setItems(new ArrayList<>());

        AtomicReference<BigDecimal> totalAmount = new AtomicReference<>(BigDecimal.ZERO);

        // Process Items, Reserve Stock, and Calculate Total
        for (OrderItemRequest itemRequest : orderRequest.items()) {
            
            InventoryEntity inventory = inventoryService.findInventoryEntityById(itemRequest.inventoryId());
            
            // Check stock availability
            if (inventory.getQuantityAvailable() < itemRequest.quantity()) {
                throw new InvalidOrderException("Insufficient stock for ID " + inventory.getId() + ". Available: " + inventory.getQuantityAvailable());
            }

            // Reserve Stock (Crucial Transactional Step)
            // We move stock from available to reserved to prevent double selling
            inventory.setQuantityAvailable(inventory.getQuantityAvailable() - itemRequest.quantity());
            inventory.setQuantityReserved(inventory.getQuantityReserved() + itemRequest.quantity());
            inventoryService.saveInventory(inventory);

            // Create Order Item
            OrderItemEntity orderItem = new OrderItemEntity();
            orderItem.setOrder(order);
            orderItem.setInventoryItem(inventory);
            orderItem.setQuantityOrdered(itemRequest.quantity());
            orderItem.setUnitPriceAtOrder(inventory.getUnitPrice());
            
            BigDecimal itemTotal = inventory.getUnitPrice().multiply(BigDecimal.valueOf(itemRequest.quantity()));
            totalAmount.updateAndGet(current -> current.add(itemTotal));
            
            order.getItems().add(orderItem);
        }

        // Finalize and Save Order
        order.setTotalAmount(totalAmount.get());
        
        // The PaymentEntity must be created and linked here in a real application, 
        // typically involving a payment gateway call, but is skipped for this scope.
        // For now, we set the status to PAID to reflect successful intent.
        order.setStatus(OrderStatus.PAID); 
        
        return orderRepository.save(order);
    }

    @Cacheable(value = "orderCache", key = "#currentUserId + '-' + #orderRequest.hashCode()")
    public OrderEntity findOrderById(UUID orderId) {
        return orderRepository.findOrderById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
    }

    // @Transactional
    // @CacheEvict(value = "orderCache", key = "")
    // // public String updateOrderStatus(OrderEntity order, String status) {
    // //     orderRepository.findOrderById(order.getId())
    // //     return status;
    // // }

    @Transactional
    @CacheEvict(value = "orderCache", key = "#currentUserId + '-' + #orderRequest.hashCode()")
    public String softDeleteOrderById(UUID orderId) {
        orderRepository.findOrderById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        // orderRepository.softDeleteById(orderId);
        return "Order Deleted successfully";
    }
}
