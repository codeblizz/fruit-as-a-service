package com.fruit.service.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
// import org.springframework.transaction.annotation.Transactional;

import com.fruit.service.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    List<UserEntity> findAll();

    Optional<UserEntity> findByUserId(UUID userId);

    Optional<UserEntity> findByRoles(String role);

    boolean existsByEmail(String email);

    @Modifying
    void deleteByUserId(UUID userId);

    // @Modifying
    // @Transactional
    // @Query("UPDATE UserEntity u SET u.deleted = true WHERE u.id = :id")
    // void softDeleteById(@Param("id") Long id);

}
