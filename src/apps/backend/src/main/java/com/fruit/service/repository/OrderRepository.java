package com.fruit.service.repository;

import java.util.Optional;
import java.util.UUID;

// import org.springframework.data.jdbc.repository.query.Modifying;
// import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.fruit.service.entity.OrderEntity;

// import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findOrderById(UUID orderId);

    // @Modifying
    // @Transactional
    // @Query("UPDATE OrderEntity u SET u.deleted = true WHERE u.id = :id")
    // void softDeleteById(@Param("id") Long id);
}
