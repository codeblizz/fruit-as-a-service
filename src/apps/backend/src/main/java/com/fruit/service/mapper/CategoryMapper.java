package com.fruit.service.mapper;

import java.util.List;

import com.fruit.service.dto.categories.CategoryResponse;
import com.fruit.service.entity.CategoryEntity;

public class CategoryMapper {

    public static CategoryResponse mapToResponseDto(CategoryEntity entity) {
        return new CategoryResponse(
                entity.getId(),
                entity.getName(),
                entity.getDescription());
    }

    public static List<CategoryResponse> mapToResponseDtoList(List<CategoryEntity> entities) {
        return entities.stream()
                .map(CategoryMapper::mapToResponseDto)
                .toList();
    }
}
