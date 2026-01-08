package com.fruit.service.service.imageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fruit.service.util.ImageUtils;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

@Service
public class ImageService {

    private final ImageStorageService storageService;

    @Value("${app.image.max-size-bytes}")
    private long maxSizeBytes;

    @Value("${app.image.target-width-pixels}")
    private int targetWidth;

    @Autowired
    public ImageService(ImageStorageService storageService) {
        this.storageService = storageService;
    }

    public String uploadImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload an empty file.");
        }
        if (file.getSize() > maxSizeBytes) {
            System.out.println("File size exceeds limit. Starting optimization for: " + file.getOriginalFilename());
            return uploadOptimizedImage(file);
        } else {
            try (java.io.InputStream inputStream = file.getInputStream()) {
                return storageService.uploadImage(inputStream, file.getOriginalFilename())
                        .orElseThrow(() -> new IOException("CDN upload failed to return a valid URL."));
            } catch (IOException e) {
                throw new RuntimeException("Error processing file stream for upload.", e);
            }
        }
    }

    private String uploadOptimizedImage(MultipartFile file) throws IOException {
        BufferedImage originalImage = ImageIO.read(file.getInputStream());
        String formatName = ImageUtils.getFileExtension(file.getOriginalFilename());
        BufferedImage processedImage = ImageUtils.resizeImage(originalImage, targetWidth);
        try (ByteArrayOutputStream os = ImageUtils.writeImageToStream(processedImage, formatName);
                InputStream optimizedInputStream = new ByteArrayInputStream(os.toByteArray())) {
            return storageService.uploadImage(optimizedInputStream, file.getOriginalFilename())
                    .orElseThrow(() -> new IOException("CDN upload failed for optimized image."));
        }
    }

    public boolean deleteImage(String publicId) {
        // In a real application, you'd extract the publicId from the database entry
        // or the URL before calling the storage service.
        return storageService.deleteImage(publicId);
    }
}