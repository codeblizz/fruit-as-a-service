package com.fruit.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fruit.service.dto.UpdateInventoryRequest;
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
import java.util.UUID;

@RestController
@RequestMapping("/fruits/inventories")
@Tag(name = "Inventory Management API", description = "Endpoints for managing fruit inventory such as adding, updating, deleting, and retrieving fruits.")
@Validated
public class InventoryController {
    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
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
    public ResponseEntity<AppApiResponse<List<InventoryEntity>>> getInventoryByFruitId(
            @Min(value = 1, message = "Fruit ID must be positive") @PathVariable Long fruitId) {
        List<InventoryEntity> inventoryList = inventoryService.findInventoryByFruitId(fruitId);
        AppApiResponse<List<InventoryEntity>> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Current inventory retrieved successfully",
                inventoryList,
                null);
        return ResponseEntity.ok(response);
    }

    @PutMapping
    @Operation(summary = "Update a batch of stock to the inventory")
    @ApiResponse(responseCode = "200", description = "Stock updated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'SUPER')")
    public ResponseEntity<AppApiResponse<InventoryEntity>> updateInventory(@RequestParam UUID inventoryId,
            @Valid @RequestBody UpdateInventoryRequest request) {
        InventoryEntity updatedStock = inventoryService.updateInventory(inventoryId, request);
        AppApiResponse<InventoryEntity> response = AppApiResponseMapper.mapToApiResponse(
            HttpStatus.OK,
            "Stock updated successfully",
            updatedStock,
            null);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{inventoryId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'SUPER')")
    @Operation(summary = "Deletes an inventory record by its ID")
    @ApiResponse(responseCode = "200", description = "Inventory record deleted successfully")
    public ResponseEntity<AppApiResponse<Void>> deleteInventoryRecord(
            @Min(value = 1, message = "Inventory ID must be positive") @PathVariable Long inventoryId) {
        inventoryService.deleteInventoryRecord(inventoryId);
        AppApiResponse<Void> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Inventory record deleted successfully",
                null,
                null);
        return ResponseEntity.ok(response);
    }
}
