package com.fruit.service.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import java.io.Serializable;
import java.math.BigDecimal;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fruit.service.enums.InventoryStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;

@Entity
@Table(name = "inventory")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class InventoryEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Default
    @Column(name = "inventory_uuid", unique = true, nullable = false, updatable = false)
    private UUID inventoryId = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(name = "fruit_id", nullable = false)
    private FruitEntity fruit;

    @Column(nullable = false)
    private Integer quantityAvailable;

    @Default
    @Column(nullable = false)
    private Integer quantityReserved = 0;

    @Column(nullable = false)
    private LocalDate harvestDate;

    @Column(nullable = false)
    private LocalDate expiryDate;

    @Column(unique = true, length = 50)
    private String batchNumber;
    
    private String supplier;

    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull
    private BigDecimal unitPrice;

    @Enumerated(EnumType.STRING)
    @Default
    @Column(nullable = false)
    private InventoryStatus status = InventoryStatus.IN_STOCK;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (quantityAvailable == null) {
            quantityAvailable = 0;
        }
    }
}
