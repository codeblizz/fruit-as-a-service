package com.fruit.service.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fruit.service.enums.InventoryStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Setter;
import lombok.ToString;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "fruits")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@ToString(exclude = { "category", "inventory", "images" })
@EqualsAndHashCode(exclude = { "category", "inventory", "images" })
public class FruitEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    @Column(name = "fruit_id", unique = true, nullable = false)
    private UUID fruitId = UUID.randomUUID();

    @Column(name = "botanical_name", unique = true, nullable = false)
    private String botanicalName;
    private String commonName;
    private String originCountry;
    private String description;

    @Column(nullable = false)
    @Builder.Default
    private Number rating = 0;

    @Column(nullable = false)
    @Builder.Default
    private Number reviews = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isOrganic = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isLocallyGrown = false;

    @Column(nullable = false)
    private List<String> benefits;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonBackReference(value = "category-fruit")
    private CategoryEntity category;

    @Builder.Default
    @OneToMany(mappedBy = "fruit", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "fruit-inventory")
    private List<InventoryEntity> inventory = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "fruit", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "fruit-images")
    private List<FruitImageEntity> images = new ArrayList<>();

    // Business Logic Helper
    public void addImage(FruitImageEntity image) {
        images.add(image);
        image.setFruit(this);
    }

    public Integer getTotalStock() {
        if (inventory == null || inventory.isEmpty())
            return 0;
        return inventory.stream()
                .filter(i -> i.getStatus() == InventoryStatus.IN_STOCK)
                .mapToInt(InventoryEntity::getQuantityAvailable)
                .sum();
    }

    public BigDecimal getCurrentPrice() {
        if (inventory == null || inventory.isEmpty())
            return BigDecimal.ZERO;
        // Return price of the most recent batch
        return inventory.get(inventory.size() - 1).getUnitPrice();
    }

    // Crucial for JPA consistency
    public void addInventory(InventoryEntity item) {
        inventory.add(item);
        item.setFruit(this);
    }
}