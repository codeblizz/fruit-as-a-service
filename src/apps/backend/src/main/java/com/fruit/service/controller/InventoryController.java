package com.fruit.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fruit.service.dto.AddStockRequest;
import com.fruit.service.dto.AppApiResponse;
import com.fruit.service.entity.InventoryEntity;
import com.fruit.service.mapper.AppApiResponseMapper;
import com.fruit.service.service.InventoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@Tag(name = "Inventory Management API", description = "Endpoints for managing fruit inventory such as adding, updating, deleting, and retrieving fruits.")
@Validated
public class InventoryController {
    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/all")
    @Operation(summary = "View current stock levels for all products")
    @ApiResponse(responseCode = "200", description = "Current inventory retrieved successfully")
    @ApiResponse(responseCode = "404", description = "No inventory found")
    public ResponseEntity<AppApiResponse<List<InventoryEntity>>> getCurrentInventory() {
        List<InventoryEntity> inventory = inventoryService.findAllInventory();
        AppApiResponse<List<InventoryEntity>> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Current inventory retrieved successfully",
                inventory,
                null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{fruitId}")
    @Operation(summary = "View inventory details for a specific fruit ID")
    @ApiResponse(responseCode = "200", description = "Inventory details retrieved successfully")
    @ApiResponse(responseCode = "404", description = "Fruit not found")
    public ResponseEntity<AppApiResponse<List<InventoryEntity>>> getInventoryByFruitId(@Min(value = 1, message = "Fruit ID must be positive") @PathVariable Long fruitId) {
        List<InventoryEntity> inventoryList = inventoryService.findInventoryByFruitId(fruitId);
        AppApiResponse<List<InventoryEntity>> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Current inventory retrieved successfully",
                inventoryList,
                null);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-stock")
    @Operation(summary = "Adds a new batch of stock to the inventory")
    @ApiResponse(responseCode = "201", description = "Stock added successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<AppApiResponse<InventoryEntity>> addStock(@Valid @RequestBody AddStockRequest request) {
        InventoryEntity newStock = inventoryService.addStock(request);
        AppApiResponse<InventoryEntity> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.CREATED,
                "Stock added successfully",
                newStock,
                null);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
