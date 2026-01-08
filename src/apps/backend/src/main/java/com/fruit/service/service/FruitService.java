package com.fruit.service.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fruit.service.dto.fruits.CreateFruitRequest;
import com.fruit.service.dto.fruits.FruitDetails;
import com.fruit.service.entity.CategoryEntity;
import com.fruit.service.entity.FruitEntity;
import com.fruit.service.exception.ApiException;
import com.fruit.service.exception.ImageUploadException;
import com.fruit.service.mapper.FruitMapper;
import com.fruit.service.repository.FruitRepository;
import com.fruit.service.service.imageService.ImageService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class FruitService {
    private final FruitRepository fruitRepository;
    private final CategoryService categoryService;
    private final FruitMapper fruitMapper;
    private final ImageService imageService;

    @Autowired
    public FruitService(FruitRepository fruitRepository, CategoryService categoryService, FruitMapper fruitMapper,
            ImageService imageService) {
        this.fruitRepository = fruitRepository;
        this.categoryService = categoryService;
        this.fruitMapper = fruitMapper;
        this.imageService = imageService;
    }

    @Cacheable(value = "fruitCache", key = "#page + '-' + #size")
    public List<FruitDetails> findAllFruits(int page, int size) {
        // Create a Pageable object to specify pagination parameters
        Pageable pageable = PageRequest.of(page, size);
        // Use the repository method with pagination
        Page<FruitEntity> fruitPage = fruitRepository.findAll(pageable);
        // Map the entities from the page to DTOs
        return fruitPage.getContent().stream()
            .map(fruitMapper::mapToResponseDto)
            .collect(Collectors.toList());
    }

    @Cacheable(value = "fruitCache", key = "#fruitId")
    public FruitDetails findFruitById(UUID fruitId) {
        FruitEntity entity = fruitRepository.findByFruitId(fruitId)
                .orElseThrow(() -> new ApiException("Fruit not found with ID: " + fruitId, HttpStatus.NOT_FOUND));
        return new FruitMapper().mapToResponseDto(entity);
    }

    @Cacheable(value = "fruitCache", key = "#fruitId")
    public Optional<FruitEntity> findFruitEntityById(UUID fruitId) {
        FruitEntity entity = fruitRepository.findByFruitId(fruitId)
                .orElseThrow(() -> new ApiException("Fruit not found with ID: " + fruitId, HttpStatus.NOT_FOUND));
        return Optional.of(entity);
    }

    @Transactional
    @CacheEvict(value = "fruitCache", allEntries = true)
    @CachePut(value = "fruitCache", key = "#result.fruitId")
    public FruitDetails createNewFruit(CreateFruitRequest request, MultipartFile imageFile) {
        CategoryEntity category = categoryService.findCategoryById(request.categoryId());
        if (category.equals(null))
            throw new ApiException("Category not found", HttpStatus.NOT_FOUND);
        String imageUrl;
        try {
            imageUrl = imageService.uploadImage(imageFile);
        } catch (IOException e) {
            System.err.println("Failed to upload image during fruit creation: " + e.getMessage());
            throw new ImageUploadException("Could not process and upload the fruit image.", e);
        }

        FruitEntity newFruit = new FruitEntity();
        newFruit.setFruitId(UUID.randomUUID());
        newFruit.setBotanicalName(request.botanicalName());
        newFruit.setCommonName(request.commonName());
        newFruit.setDescription(request.description());
        newFruit.setOriginCountry(request.originCountry());
        newFruit.setImageUrl(imageUrl);
        newFruit.setCategory(category);

        FruitEntity savedFruit = fruitRepository.save(newFruit);
        return new FruitMapper().mapToResponseDto(savedFruit);
    }

    @Transactional
    @CacheEvict(value = "fruitCache", allEntries = true)
    @CachePut(value = "fruitCache", key = "#result.fruitId")
    public FruitDetails updateFruit(FruitDetails request, MultipartFile imageFile) {
        FruitEntity existingFruit = fruitRepository.findByFruitId(request.fruitId())
                .orElseThrow(() -> new EntityNotFoundException("Fruit not found with ID: " + request.fruitId()));

        CategoryEntity category = categoryService.findCategoryById(request.categoryId());

        existingFruit.setBotanicalName(request.botanicalName());
        existingFruit.setCommonName(request.commonName());
        existingFruit.setDescription(request.description());
        existingFruit.setOriginCountry(request.originCountry());
        existingFruit.setCategory(category);

        if (imageFile != null && !imageFile.isEmpty()) {
            imageService.deleteImage(existingFruit.getImageUrl());

            String newImageUrl;
            try {
                newImageUrl = imageService.uploadImage(imageFile);
            } catch (IOException e) {
                System.err.println("Failed to upload image during fruit creation: " + e.getMessage());
                throw new ImageUploadException("Could not process and upload the fruit image.", e);
            }
            existingFruit.setImageUrl(newImageUrl);
        }

        FruitEntity updatedFruit = fruitRepository.save(existingFruit);
        return new FruitMapper().mapToResponseDto(updatedFruit);
    }

    @Transactional
    @CacheEvict(value = "fruitCache", key = "#fruitId", allEntries = true)
    public String deleteFruit(UUID fruitId) {
        FruitEntity fruit = fruitRepository.findByFruitId(fruitId)
                .orElseThrow(() -> new ApiException("Fruit not found with ID: " + fruitId, HttpStatus.NOT_FOUND));

        fruitRepository.delete(fruit);
        return "Successfully deleted fruit with id: " + fruit.getFruitId();
    }

    @Cacheable(value = "fruitHistoryCache", key = "#page + '-' + #size")
    public List<FruitEntity> getFruitHistory(int page, int size) {
        // Implementation here
        return fruitRepository.findAll();
    }

}
