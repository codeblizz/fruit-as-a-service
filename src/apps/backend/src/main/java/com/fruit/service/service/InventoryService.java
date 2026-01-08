package com.fruit.service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.fruit.service.dto.AddStockRequest;
import com.fruit.service.entity.FruitEntity;
import com.fruit.service.entity.InventoryEntity;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import com.fruit.service.repository.InventoryRepository;

import jakarta.transaction.Transactional;

@Service
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final FruitService fruitService;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository, FruitService fruitService) {
        this.inventoryRepository = inventoryRepository;
        this.fruitService = fruitService;
    }

    @Cacheable(value = "inventoryCache", key = "'allInventory'")
    public List<InventoryEntity> findAllInventory() {
        return inventoryRepository.findAll();
    }

    @Cacheable(value = "inventoryCache", key = "#inventoryId")
    public InventoryEntity findInventoryEntityById(Long inventoryId) {
        return inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found with ID: " + inventoryId));
    }

    @Cacheable(value = "inventoryCache", key = "#fruitId")
    public List<InventoryEntity> findInventoryByFruitId(Long fruitId) {
        return inventoryRepository.findByFruitId(fruitId);
    }

    @Transactional
    @CacheEvict(value = "inventoryCache", key = "#inventory.inventoryId")
    @CachePut(value = "inventoryCache", key = "#inventory.inventoryId")
    public InventoryEntity saveInventory(InventoryEntity inventory) {
        return inventoryRepository.save(inventory);
    }

    @Transactional
    @CacheEvict(value = "inventoryCache", key = "#inventory.inventoryId")
    @CachePut(value = "inventoryCache", key = "#inventory.inventoryId")
    public InventoryEntity updateInventory(InventoryEntity inventory) {
        return inventoryRepository.save(inventory);
    }

    @Transactional
    @CacheEvict(value = "inventoryCache", allEntries = true)
    @Cacheable(value = "inventoryCache", key = "#request.fruitId()")
    public InventoryEntity addStock(AddStockRequest request) {
        FruitEntity fruit = fruitService.findFruitEntityById(request.fruitId())
                .orElseThrow(() -> new ResourceNotFoundException("Fruit not found with ID: " + request.fruitId()));

        InventoryEntity newStock = new InventoryEntity();
        newStock.setFruit(fruit);
        newStock.setQuantityAvailable(request.quantityAvailable());
        newStock.setQuantityReserved(request.quantityAvailable());
        newStock.setHarvestDate(request.harvestDate());
        newStock.setExpiryDate(request.expiryDate());
        newStock.setBatchNumber(request.batchNumber());
        newStock.setSupplier(request.supplier());

        return inventoryRepository.save(newStock);
    }
}
