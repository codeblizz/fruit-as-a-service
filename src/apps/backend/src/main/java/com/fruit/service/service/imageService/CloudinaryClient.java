package com.fruit.service.service.imageService;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
// import java.io.InputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class CloudinaryClient implements ImageStorageService {

    private static final String UPLOAD_FOLDER = "app-uploads";

    private final Cloudinary cloudinary;

    // Inject the Cloudinary configuration bean
    public CloudinaryClient(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    @SuppressWarnings("unchecked")
    public Optional<String> uploadImage(byte[] fileBytes, String originalFileName) throws IOException {
        String uniqueId = UPLOAD_FOLDER + "/" + UUID.randomUUID().toString();

        Map<String, Object> options = ObjectUtils.asMap(
                "public_id", uniqueId,
                "resource_type", "auto");

        try {
            // Cloudinary's uploader accepts byte[] directly
            Map<String, Object> uploadResult = cloudinary.uploader().upload(fileBytes, options);
            String secureUrl = (String) uploadResult.get("secure_url");
            return Optional.ofNullable(secureUrl);
        } catch (IOException e) {
            System.err.println("Cloudinary upload failed for file: " + originalFileName + ". Error: " + e.getMessage());
            throw e;
        }
    }

    // @Override
    // @SuppressWarnings("unchecked")
    // public Optional<String> uploadImage(InputStream inputStream, String originalFileName) throws IOException {
    //     String uniqueId = UPLOAD_FOLDER + "/" + UUID.randomUUID().toString();

    //     // 1. Build the options Map with correct generics to avoid raw type warnings
    //     Map<String, Object> options = ObjectUtils.asMap(
    //             "public_id", uniqueId,
    //             "resource_type", "auto");

    //     try {
    //         // 2. Upload the stream. Use Map<String, Object> to hold the result.
    //         Map<String, Object> uploadResult = cloudinary.uploader().upload(
    //                 inputStream,
    //                 options);

    //         // 3. Retrieve the secure URL safely
    //         String secureUrl = (String) uploadResult.get("secure_url");

    //         return Optional.ofNullable(secureUrl);

    //     } catch (IOException e) {
    //         System.err.println("Cloudinary upload failed for file: " + originalFileName + ". Error: " + e.getMessage());
    //         throw e;
    //     }
    // }

    @Override
    @SuppressWarnings("unchecked")
    public boolean deleteImage(String publicId) {
        try {
            // Check if the publicId includes the folder name (standard practice)

            // Delete operation also returns a Map<String, Object>
            Map<String, Object> deletionResult = cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.emptyMap() // Use emptyMap() safely with generics
            );

            // Check the "result" key from the API response
            return "ok".equalsIgnoreCase((String) deletionResult.get("result"));

        } catch (Exception e) {
            System.err.println("Cloudinary deletion failed for ID: " + publicId + ". Error: " + e.getMessage());
            return false;
        }
    }
}
