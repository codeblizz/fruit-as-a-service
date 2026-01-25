package com.fruit.service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fruit.service.dto.categories.CategoryResponse;
import com.fruit.service.dto.categories.CreateCategoryRequest;
import com.fruit.service.entity.CategoryEntity;
import com.fruit.service.exception.ApiException;
import com.fruit.service.mapper.CategoryMapper;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;

import com.fruit.service.repository.CategoryRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.cache.annotation.Caching;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CachePut;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Cacheable(value = "category", key = "#categoryId")
    @Transactional(readOnly = true)
    public CategoryEntity findCategoryById(Long categoryId) {
        CategoryEntity category = categoryRepository.findById(categoryId).orElse(null);
        return category;
    }

    @Cacheable(value = "category", key = "#categoryId")
    @Transactional(readOnly = true)
    public CategoryEntity findCategoryByName(String categoryName) {
        return categoryRepository.findByName(categoryName)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + categoryName));
    }

    @Cacheable(value = "categories", key = "'allCategories'")
    @Transactional(readOnly = true)
    public List<CategoryResponse> findAllCategories() {
        List<CategoryEntity> entities = categoryRepository.findAllCategories();
        return CategoryMapper.mapToResponseDtoList(entities);
    }

    @Transactional
    @Caching(put = { @CachePut(value = "category", key = "#result.id") }, evict = {
            @CacheEvict(value = "categories", key = "'allCategories'") })
    public CategoryEntity createCategory(CreateCategoryRequest request) {
        if (categoryRepository.existsByName(request.name())) {
            throw new ApiException("Category with name " + request.name() +
                    " already exists.", HttpStatus.CONFLICT);
        }
        CategoryEntity newCategory = new CategoryEntity();
        newCategory.setName(request.name());
        newCategory.setKinds(request.kinds());
        newCategory.setDescription(request.description());

        return categoryRepository.save(newCategory);
    }

    @Transactional
    @Caching(put = { @CachePut(value = "category", key = "#result.id") }, evict = {
            @CacheEvict(value = "categories", key = "'allCategories'") })
    public CategoryEntity updateCategory(String categoryName, CreateCategoryRequest request) {
        CategoryEntity category = categoryRepository.findByName(categoryName)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + categoryName));

        category.setName(request.name());
        category.setDescription(request.description());

        if (request.kinds() != null) {
            category.setKinds(request.kinds());
        }

        return categoryRepository.save(category);
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "category", key = "#categoryId"),
            @CacheEvict(value = "categories", key = "'allCategories'")
    })
    public String deleteCategoryById(Long categoryId) {
        categoryRepository.deleteById(categoryId);
        return "Category with ID " + categoryId + " has been deleted.";
    }
}
