package com.fruit.service.dto.categories;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Create Category Request DTO")
public record CreateCategoryRequest(
    @NotBlank(message = "Category name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    String name,
    List<String> kinds,
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    String description
) {}
