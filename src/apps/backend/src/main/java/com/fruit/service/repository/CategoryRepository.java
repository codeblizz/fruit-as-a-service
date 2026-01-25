package com.fruit.service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.fruit.service.entity.CategoryEntity;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    boolean existsByName(String name);

    boolean existsById(Long id);

    @Query("SELECT DISTINCT c FROM CategoryEntity c LEFT JOIN FETCH c.kinds")
    List<CategoryEntity> findAllCategories();

    Optional<CategoryEntity> findByName(String name);
}
