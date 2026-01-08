package com.fruit.service.service;

// import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fruit.service.dto.fruits.AddFruitRequest;
import com.fruit.service.dto.fruits.FruitDetails;
import com.fruit.service.entity.CategoryEntity;
import com.fruit.service.entity.FruitEntity;
import com.fruit.service.entity.FruitImageEntity;
import com.fruit.service.entity.InventoryEntity;
import com.fruit.service.enums.InventoryStatus;
import com.fruit.service.exception.ApiException;
// import com.fruit.service.exception.ImageUploadException;
import com.fruit.service.mapper.FruitMapper;
import com.fruit.service.repository.CategoryRepository;
import com.fruit.service.repository.FruitRepository;
import com.fruit.service.service.imageService.ImageService;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FruitService {
        private final FruitRepository fruitRepository;
        private final CategoryRepository categoryRepository;
        private final CategoryService categoryService;
        private final FruitMapper fruitMapper;
        private final ImageService imageService;

        @Autowired
        public FruitService(FruitRepository fruitRepository, CategoryRepository categoryRepository,
                        CategoryService categoryService, FruitMapper fruitMapper,
                        ImageService imageService) {
                this.fruitRepository = fruitRepository;
                this.categoryRepository = categoryRepository;
                this.categoryService = categoryService;
                this.fruitMapper = fruitMapper;
                this.imageService = imageService;
        }

        @Cacheable(value = "fruits", key = "#page + '-' + #size")
        @Transactional(readOnly = true)
        public List<FruitDetails> findAllFruits(int page, int size) {
                // Create a Pageable object to specify pagination parameters
                Pageable pageable = PageRequest.of(page, size);
                Page<FruitEntity> fruitPage = fruitRepository.findAll(pageable);
                return fruitPage.getContent().stream()
                                .map(fruitMapper::mapToResponseDto)
                                .collect(Collectors.toList());
        }

        @Cacheable(value = "fruit", key = "#fruitId")
        @Transactional(readOnly = true)
        public FruitDetails findFruitById(UUID fruitId) {
                FruitEntity entity = fruitRepository.findByFruitId(fruitId)
                                .orElseThrow(() -> new ApiException("Fruit not found with ID: " + fruitId,
                                                HttpStatus.NOT_FOUND));
                return new FruitMapper().mapToResponseDto(entity);
        }

        @Cacheable(value = "fruit", key = "#fruitId")
        @Transactional(readOnly = true)
        public Optional<FruitEntity> findFruitEntityById(UUID fruitId) {
                FruitEntity entity = fruitRepository.findByFruitId(fruitId)
                                .orElseThrow(() -> new ApiException("Fruit not found with ID: " + fruitId,
                                                HttpStatus.NOT_FOUND));
                return Optional.of(entity);
        }

        @Transactional
        @Caching(put = { @CachePut(value = "fruit", key = "#result.fruitId") }, evict = {
                        @CacheEvict(value = "fruits", allEntries = true) })
        public FruitDetails addNewFruit(AddFruitRequest request, List<MultipartFile> imageFiles) {
                CategoryEntity category = categoryRepository.findByName(request.categoryName())
                                .orElseThrow(() -> new ApiException("Category not found", HttpStatus.NOT_FOUND));

                FruitEntity fruit = FruitEntity.builder()
                                .fruitId(UUID.randomUUID())
                                .botanicalName(request.botanicalName())
                                .commonName(request.commonName())
                                .description(request.description())
                                .originCountry(request.originCountry())
                                .category(category)
                                .build();

                if (imageFiles != null && !imageFiles.isEmpty()) {
                        List<FruitImageEntity> imageEntities = imageFiles.stream()
                                        .filter(file -> !file.isEmpty())
                                        .map(file -> {
                                                try {
                                                        String imageUrl = imageService.uploadImage(file);
                                                        return FruitImageEntity.builder()
                                                                        .imageUrl(imageUrl)
                                                                        .fruit(fruit)
                                                                        .build();
                                                } catch (Exception e) {
                                                        // Log the specific error but decide if you want to fail the
                                                        // whole transaction
                                                        System.err.println(
                                                                        "Failed to upload " + file.getOriginalFilename()
                                                                                        + ": " + e.getMessage());
                                                        throw new RuntimeException("Image upload failed", e);
                                                }
                                        })
                                        .collect(Collectors.toList());
                        fruit.setImages(imageEntities);
                }

                // List<FruitImageEntity> imageEntities = imageFiles.parallelStream()
                // .map(file -> {
                // if (file.isEmpty()) {
                // throw new IllegalArgumentException(
                // "One of the provided image files is empty.");
                // }
                // try {
                // String imageUrl = imageService.uploadImage(file);

                // FruitImageEntity imgEntity = new FruitImageEntity();
                // imgEntity.setImageUrl(imageUrl);
                // imgEntity.setFruit(fruit);
                // return imgEntity;
                // } catch (IOException e) {
                // throw new ImageUploadException(
                // "Could not upload image: " + file.getOriginalFilename(),
                // e);
                // }
                // })
                // .collect(Collectors.toList());
                // fruit.setImages(imageEntities);

                InventoryEntity initialBatch = InventoryEntity.builder()
                                .fruit(fruit)
                                .quantityAvailable(request.initialStock())
                                .unitPrice(request.unitPrice())
                                .harvestDate(request.harvestDate())
                                .expiryDate(request.expiryDate())
                                .batchNumber(request.batchNumber())
                                .status(InventoryStatus.IN_STOCK)
                                .build();

                fruit.setInventory(List.of(initialBatch));

                // 5. Save (CascadeType.ALL will save images and inventory)
                FruitEntity savedFruit = fruitRepository.save(fruit);
                return fruitMapper.mapToResponseDto(savedFruit);
        }

        @Transactional
        @Caching(put = { @CachePut(value = "fruit", key = "#result.id") }, evict = {
                        @CacheEvict(value = "fruits", allEntries = true) })
        public FruitDetails updateFruit(FruitDetails request, MultipartFile imageFile) {
                FruitEntity existingFruit = fruitRepository.findByFruitId(request.fruitId())
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Fruit not found with ID: " + request.fruitId()));

                CategoryEntity category = categoryService.findCategoryById(request.id());

                existingFruit.setBotanicalName(request.botanicalName());
                existingFruit.setCommonName(request.commonName());
                existingFruit.setDescription(request.description());
                existingFruit.setOriginCountry(request.originCountry());
                existingFruit.setCategory(category);

                // if (imageFile != null && !imageFile.isEmpty()) {
                // imageService.deleteImage(existingFruit.getImageUrl());

                // String newImageUrl;
                // try {
                // newImageUrl = imageService.uploadImage(imageFile);
                // } catch (IOException e) {
                // System.err.println("Failed to upload image during fruit creation: " +
                // e.getMessage());
                // throw new ImageUploadException("Could not process and upload the fruit
                // image.", e);
                // }
                // existingFruit.setImageUrl(newImageUrl);
                // }

                FruitEntity updatedFruit = fruitRepository.save(existingFruit);
                return new FruitMapper().mapToResponseDto(updatedFruit);
        }

        @Transactional
        @Caching(evict = {
                        @CacheEvict(value = "fruit", key = "#fruitId"),
                        @CacheEvict(value = "fruits", allEntries = true)
        })
        public String deleteFruit(UUID fruitId) {
                FruitEntity fruit = fruitRepository.findByFruitId(fruitId)
                                .orElseThrow(() -> new ApiException("Fruit not found with ID: " + fruitId,
                                                HttpStatus.NOT_FOUND));

                fruitRepository.delete(fruit);
                return "Successfully deleted fruit with id: " + fruit.getFruitId();
        }

}
