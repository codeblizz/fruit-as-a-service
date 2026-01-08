package com.fruit.service.service.imageService;

// import java.io.InputStream;
import java.io.IOException;
import java.util.Optional;

public interface ImageStorageService {

    Optional<String> uploadImage(byte[] fileBytes, String originalFileName) throws IOException;

    // Optional<String> uploadImage(InputStream inputStream, String originalFileName) throws IOException;

    boolean deleteImage(String publicId);
}
