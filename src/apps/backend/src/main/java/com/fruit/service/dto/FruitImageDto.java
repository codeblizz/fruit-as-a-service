package com.fruit.service.dto;

public record FruitImageDto(
        Long id,
        String imageUrl,
        String createdAt
) implements java.io.Serializable {
    private static final long serialVersionUID = 1L;
    
}
