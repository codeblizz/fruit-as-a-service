package com.fruit.service.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.transaction.annotation.Transactional;

import com.fruit.service.entity.FruitEntity;

@Repository
public interface FruitRepository extends JpaRepository<FruitEntity, Long> {
    Page<FruitEntity> findAll(Pageable pageable);

    Optional<FruitEntity> findByFruitId(UUID fruitId);

    // @Modifying
    // @Transactional
    // @Query("UPDATE FruitEntity f SET f.deleted = true WHERE f.id = :id")
    // void softDeleteById(@Param("id") Long id);
}
