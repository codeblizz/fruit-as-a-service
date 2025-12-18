package com.fruit.service.dto.email;

public record AttachmentDetails(
        String fileName,
        String base64Content) {
}
