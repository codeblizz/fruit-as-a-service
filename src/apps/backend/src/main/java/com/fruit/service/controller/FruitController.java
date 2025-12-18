package com.fruit.service.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;

import com.fruit.service.dto.AppApiResponse;
import com.fruit.service.dto.fruits.CreateFruitRequest;
import com.fruit.service.dto.fruits.FruitDetails;
import com.fruit.service.entity.FruitEntity;
import com.fruit.service.mapper.AppApiResponseMapper;
import com.fruit.service.service.FruitService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/fruits")
@Validated
@Tag(name = "Fruit Management API", description = "Endpoints for managing available fruits")
public class FruitController {
    private final FruitService fruitService;

    @Autowired
    public FruitController(FruitService fruitService) {
        this.fruitService = fruitService;
    }

    @GetMapping("/all")
    @Operation(summary = "Retrieve all available fruits", description = "Provides a list of all fruits in inventory.")
    @ApiResponse(responseCode = "200", description = "Fruits retrieved successfully")
    public ResponseEntity<AppApiResponse<List<FruitDetails>>> findAllFruits(@Valid @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<FruitDetails> fruits = fruitService.findAllFruits(page, size);
        AppApiResponse<List<FruitDetails>> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Fruits retrieved successfully",
                fruits,
                null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    @Operation(summary = "Retrieve fruit history", description = "Provides the history of fruits in inventory.")
    @ApiResponse(responseCode = "200", description = "Fruit history retrieved successfully")
    @ApiResponse(responseCode = "404", description = "No fruit history found")
    public ResponseEntity<AppApiResponse<List<FruitEntity>>> getFruitHistory(@Valid @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<FruitEntity> fruitHistory = fruitService.getFruitHistory(page, size);
        AppApiResponse<List<FruitEntity>> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Fruit history retrieved successfully",
                fruitHistory,
                null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{fruitId}")
    @Operation(summary = "Retrieve a fruit by its ID", description = "Provides details about a specific fruit in inventory.")
    @ApiResponse(responseCode = "200", description = "Fruit found successfully")
    @ApiResponse(responseCode = "404", description = "Fruit not found for the given ID")
    public ResponseEntity<AppApiResponse<FruitDetails>> findFruitById(@Valid @PathVariable UUID fruitId) {
        FruitDetails fruit = fruitService.findFruitById(fruitId);
        AppApiResponse<FruitDetails> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Fruit found successfully",
                fruit,
                null);
        return ResponseEntity.ok(response);
    }

    @PostMapping(consumes = { "multipart/form-data" })
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Create a new fruit entry")
    @ApiResponse(responseCode = "201", description = "Fruit created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    public ResponseEntity<AppApiResponse<FruitDetails>> createFruit(@RequestPart("request") @Valid CreateFruitRequest request,
            @RequestPart("imageFile") MultipartFile imageFile) {
        if (imageFile.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        FruitDetails createdFruit = fruitService.createNewFruit(request, imageFile);
        AppApiResponse<FruitDetails> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.CREATED,
                "Fruit created successfully",
                createdFruit,
                null);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Update an existing fruit entry")
    @ApiResponse(responseCode = "200", description = "Fruit updated successfully")
    @ApiResponse(responseCode = "404", description = "Invalid input data or fruit not found")
    public ResponseEntity<AppApiResponse<FruitDetails>> updateFruit(@RequestPart("request") @Valid FruitDetails request,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        FruitDetails updatedFruit = fruitService.updateFruit(request, imageFile);
        AppApiResponse<FruitDetails> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Fruit updated successfully",
                updatedFruit,
                null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{fruitId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Delete a fruit entry")
    @ApiResponse(responseCode = "204", description = "Fruit deleted successfully")
    @ApiResponse(responseCode = "404", description = "Fruit not found for the given ID")
    public ResponseEntity<AppApiResponse<Void>> deleteFruit(@Valid @PathVariable UUID fruitId) {
        String message = fruitService.deleteFruit(fruitId);
        AppApiResponse<Void> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.NO_CONTENT,
                message,
                null,
                null);
        return ResponseEntity.ok(response);
    }

}
