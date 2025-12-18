package com.fruit.service.mapper;

import java.time.Instant;
import java.util.Map;
import org.springframework.http.HttpStatus;
import com.fruit.service.dto.AppApiResponse;

public class AppApiResponseMapper {

    public static <T> AppApiResponse<T> mapToApiResponse(
            HttpStatus status,
            String message,
            T data,
            Map<String, Object> metadata) {

        return new AppApiResponse<>(
                Instant.now(),
                status.value(),
                message,
                data,
                metadata
        );
    }

    // 200 OK responses for convenience
    public static <T> AppApiResponse<T> mapOkResponse(String message, T data) {
        return mapToApiResponse(HttpStatus.OK, message, data, null);
    }
}
