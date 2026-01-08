package com.fruit.service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fruit.service.dto.categories.CreateCategoryRequest;
import com.fruit.service.entity.CategoryEntity;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import com.fruit.service.repository.CategoryRepository;

import jakarta.transaction.Transactional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryEntity findCategoryById(Long categoryId) {
        CategoryEntity category = categoryRepository.findById(categoryId).orElse(null);
        return category;
    }
       
    public Optional<CategoryEntity> findCategoryEntityById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    public CategoryEntity getCategoryEntityById(Long categoryId) {
        return categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + categoryId));
    }
    
    public List<CategoryEntity> findAllCategories() {
        return categoryRepository.findAll();
    }
    
    @Transactional
    public CategoryEntity createCategory(CreateCategoryRequest request) {
        CategoryEntity newCategory = new CategoryEntity();
        newCategory.setName(request.name());
        newCategory.setDescription(request.description());
        
        return categoryRepository.save(newCategory);
    }

    @Transactional
    public CategoryEntity updateCategory(Long categoryId, CreateCategoryRequest request) {
        CategoryEntity category = getCategoryEntityById(categoryId);
        
        category.setName(request.name());
        category.setDescription(request.description());
        
        return categoryRepository.save(category); 
    }
    
    @Transactional
    public void deleteCategory(Long categoryId) {
        CategoryEntity category = getCategoryEntityById(categoryId);
        categoryRepository.delete(category);
    }
}
