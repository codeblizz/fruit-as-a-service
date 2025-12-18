package com.fruit.service.util;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import javax.imageio.ImageIO;

public final class ImageUtils {

    private ImageUtils() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated.");
    }

    public static BufferedImage resizeImage(BufferedImage originalImage, int targetWidth) {
        if (originalImage.getWidth() <= targetWidth) {
            return originalImage;
        }

        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();

        // Calculate the new height maintaining aspect ratio
        int targetHeight = (originalHeight * targetWidth) / originalWidth;

        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, originalImage.getType());

        // Create a Graphics2D context and draw the scaled image
        Graphics2D g = resizedImage.createGraphics();
        g.drawImage(originalImage, 0, 0, targetWidth, targetHeight, null);
        g.dispose();

        return resizedImage;
    }

    public static String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return "jpg";
        }
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex == -1 || dotIndex == fileName.length() - 1) {
            return "jpg";
        }
        return fileName.substring(dotIndex + 1).toLowerCase();
    }

    public static ByteArrayOutputStream writeImageToStream(BufferedImage image, String formatName) throws IOException {
        ByteArrayOutputStream os = new ByteArrayOutputStream();

        // Note: For JPEG compression quality control, you need ImageWriteParam or a
        // specialized library.
        // This default method uses standard quality settings.
        ImageIO.write(image, formatName, os);

        return os;
    }
}
