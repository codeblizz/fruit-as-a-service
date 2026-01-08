package com.fruit.service.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import com.fruit.service.dto.UpdateInventoryRequest;
import com.fruit.service.entity.FruitEntity;
import com.fruit.service.entity.InventoryEntity;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import com.fruit.service.repository.InventoryRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final FruitService fruitService;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository, FruitService fruitService) {
        this.inventoryRepository = inventoryRepository;
        this.fruitService = fruitService;
    }

    @Cacheable(value = "inventories", key = "'allInventory'")
    @Transactional(readOnly = true)
    public List<InventoryEntity> findAllInventory() {
        return inventoryRepository.findAll();
    }

    @Cacheable(value = "inventory", key = "#inventoryId")
    @Transactional(readOnly = true)
    public InventoryEntity findInventoryEntityById(Long inventoryId) {
        return inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found with ID: " + inventoryId));
    }

    @Cacheable(value = "inventory", key = "#fruitId")
    @Transactional(readOnly = true)
    public List<InventoryEntity> findInventoryByFruitId(Long fruitId) {
        return inventoryRepository.findByFruitId(fruitId);
    }

    @Transactional
    @CacheEvict(value = "inventory", key = "#inventory.inventoryId")
    @CachePut(value = "inventory", key = "#inventory.inventoryId")
    public InventoryEntity saveInventory(InventoryEntity inventory) {
        return inventoryRepository.save(inventory);
    }

    @Transactional
    @Caching(put = { @CachePut(value = "inventory", key = "#result.id") }, evict = {
            @CacheEvict(value = "inventories", allEntries = true) })
    public InventoryEntity updateInventory(UUID fruitId, UpdateInventoryRequest request) {
        FruitEntity fruit = fruitService.findFruitEntityById(fruitId)
                .orElseThrow(() -> new ResourceNotFoundException("Fruit not found with ID: " + fruitId));

        InventoryEntity newInventory = new InventoryEntity();
        newInventory.setFruit(fruit);
        newInventory.setQuantityAvailable(request.quantityAvailable());
        newInventory.setQuantityReserved(request.quantityAvailable());
        newInventory.setHarvestDate(request.harvestDate());
        newInventory.setExpiryDate(request.expiryDate());
        newInventory.setSupplier(request.supplier());

        return inventoryRepository.save(newInventory);
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "inventory", key = "#inventoryId"),
            @CacheEvict(value = "inventories", key = "'allInventories'")
    })
    public void deleteInventoryRecord(Long inventoryId) {
        InventoryEntity inventory = findInventoryEntityById(inventoryId);
        inventoryRepository.delete(inventory);
    }
}
