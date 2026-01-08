package com.fruit.service.entity;

import java.util.List;
import java.util.Set;
import java.util.UUID;

// import org.hibernate.annotations.Filter;
// import org.hibernate.annotations.FilterDef;
// import org.hibernate.annotations.ParamDef;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
// @FilterDef(
//     name = "notDeleted", 
//     parameters = @ParamDef(name = "isDeleted", type = Boolean.class)
// )
// @Filter(name = "notDeleted", condition = "is_deleted = :isDeleted")
public class UserEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Default
    @Column(name = "user_id", unique = true, nullable = false, updatable = false)
    private UUID userId = UUID.randomUUID();

    private String passwordHash;
    private boolean termsAccepted;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Default
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_uuid", referencedColumnName = "user_id"))
    @Column(name = "role")
    private Set<String> roles = new java.util.HashSet<>();

    private String businessName;
    private String apiKey;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    private Instant lastLogin;
    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Default
    @Column(name = "is_deleted", nullable = false)
    private boolean deleted = false;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private PasswordResetTokenEntity resetToken;

    private boolean isActive;
    private boolean isVerified;
    private boolean isLocked;
    private boolean isTwoFactorEnabled;

    @Default
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> permissions = new java.util.HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderEntity> orders;
}
