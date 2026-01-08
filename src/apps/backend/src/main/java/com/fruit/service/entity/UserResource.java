package com.fruit.service.entity;

import org.springframework.hateoas.RepresentationModel;
// import java.util.UUID;
// import java.time.Instant;

// UserResource must extend RepresentationModel to carry HATEOAS links
public class UserResource extends RepresentationModel<UserResource> {

    // private final UUID userId;
    // private final String email;
    // private final String firstName;
    // private final Instant createdAt;

    // Constructor and getters (omitted for brevity)

    // Note: The parent RepresentationModel class provides the List<Link> field
    // and methods like add(Link link).
}
