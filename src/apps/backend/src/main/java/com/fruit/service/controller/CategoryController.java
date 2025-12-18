package com.fruit.service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.fruit.service.dto.AppApiResponse;
import com.fruit.service.dto.categories.CategoryResponse;
import com.fruit.service.dto.categories.CreateCategoryRequest;
import com.fruit.service.entity.CategoryEntity;
import com.fruit.service.mapper.AppApiResponseMapper;
import com.fruit.service.mapper.CategoryMapper;
import com.fruit.service.service.CategoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@Validated
@RequestMapping("/categories")
@Tag(name = "Category Management API", description = "Endpoints for managing fruit categories.")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    @Operation(summary = "Get a list of all categories")
    @ApiResponse(responseCode = "201", description = "Category successfully created.")
    @ApiResponse(responseCode = "400", description = "Invalid category data (Validation failure).")
    @ApiResponse(responseCode = "403", description = "Access denied (Insufficient permissions).")
    @ApiResponse(responseCode = "409", description = "Category already exists (Conflict).")
    public ResponseEntity<AppApiResponse<List<CategoryResponse>>> getAllCategories() {
        List<CategoryEntity> entities = categoryService.findAllCategories();
        AppApiResponse<List<CategoryResponse>> response = AppApiResponseMapper.mapToApiResponse(
            HttpStatus.OK,
            "Category list successful",
            CategoryMapper.mapToResponseDtoList(entities),
        null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a category by its ID")
    @ApiResponse(responseCode = "201", description = "Category successfully created.")
    @ApiResponse(responseCode = "400", description = "Invalid category data (Validation failure).")
    @ApiResponse(responseCode = "403", description = "Access denied (Insufficient permissions).")
    @ApiResponse(responseCode = "409", description = "Category already exists (Conflict).")
    public ResponseEntity<AppApiResponse<CategoryResponse>> getCategoryById(@Valid @PathVariable Long id) {
        CategoryEntity entity = categoryService.getCategoryEntityById(id);
        AppApiResponse<CategoryResponse> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.OK,
                "Category fetched successfully",
                CategoryMapper.mapToResponseDto(entity),
                null);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
    @Operation(summary = "Create a new category")
    @ApiResponse(responseCode = "201", description = "Category successfully created.")
    @ApiResponse(responseCode = "400", description = "Invalid category data (Validation failure).")
    @ApiResponse(responseCode = "403", description = "Access denied (Insufficient permissions).")
    @ApiResponse(responseCode = "409", description = "Category already exists (Conflict).")
    public ResponseEntity<AppApiResponse<CategoryResponse>> createCategory(@Valid @RequestBody CreateCategoryRequest request) {
        CategoryEntity newEntity = categoryService.createCategory(request);
        AppApiResponse<CategoryResponse> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.CREATED,
                "Category fetched successfully",
                CategoryMapper.mapToResponseDto(newEntity),
                null);
        return ResponseEntity.ok(response);

    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Update an existing category")
    @ApiResponse(responseCode = "201", description = "Category successfully created.")
    @ApiResponse(responseCode = "400", description = "Invalid category data (Validation failure).")
    @ApiResponse(responseCode = "403", description = "Access denied (Insufficient permissions).")
    @ApiResponse(responseCode = "409", description = "Category already exists (Conflict).")
    public ResponseEntity<AppApiResponse<CategoryResponse>> updateCategory(@Valid @PathVariable Long id,
            @Valid @RequestBody CreateCategoryRequest request) {
        CategoryEntity updatedEntity = categoryService.updateCategory(id, request);
        AppApiResponse<CategoryResponse> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.CREATED,
                "Category fetched successfully",
                CategoryMapper.mapToResponseDto(updatedEntity),
                null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Delete a category by its ID")
    @ApiResponse(responseCode = "204", description = "Category deleted successfully")
    @ApiResponse(responseCode = "400", description = "Invalid category data (Validation failure).")
    @ApiResponse(responseCode = "403", description = "Access denied (Insufficient permissions).")
    @ApiResponse(responseCode = "409", description = "Category already exists (Conflict).")
    public ResponseEntity<AppApiResponse<Void>> deleteCategory(@Valid @PathVariable Long id) {
        categoryService.deleteCategory(id);
        AppApiResponse<Void> response = AppApiResponseMapper.mapToApiResponse(
                HttpStatus.NO_CONTENT,
                "Category deleted successfully",
                null,
                null);
        return ResponseEntity.ok(response);
    }
}
