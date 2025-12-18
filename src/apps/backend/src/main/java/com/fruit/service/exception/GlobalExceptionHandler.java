package com.fruit.service.exception;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import java.lang.IllegalArgumentException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.fruit.service.dto.AppApiResponse;
import com.fruit.service.dto.ErrorResponse;
import com.fruit.service.mapper.AppApiResponseMapper;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

import java.io.FileNotFoundException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

        // Private helper method to construct the ErrorResponse
        private ErrorResponse buildErrorResponse(HttpStatus status, String message, WebRequest request,
                        Map<String, String> details) {
                return new ErrorResponse(
                                Instant.now(),
                                status.value(),
                                status.getReasonPhrase(),
                                message,
                                request.getDescription(false).replace("uri=", ""),
                                details);
        }

        @ExceptionHandler(ConstraintViolationException.class)
        public ResponseEntity<AppApiResponse<String>> handleConstraintViolationException(
                        ConstraintViolationException ex) {

                // Extract the specific message from the violation set
                String defaultMessage = "Validation failed.";

                if (!ex.getConstraintViolations().isEmpty()) {
                        ConstraintViolation<?> violation = ex.getConstraintViolations().iterator().next();
                        defaultMessage = violation.getMessage(); // This retrieves your custom "Token must not be null
                                                                 // or empty" message
                }

                // Map the error into your custom response structure
                AppApiResponse<String> response = AppApiResponseMapper.mapToApiResponse(
                                HttpStatus.BAD_REQUEST,
                                defaultMessage,
                                null,
                                null); // Optionally, you could pass error details here

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // Handling specific custom exceptions
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex,
                        WebRequest request) {
                HttpStatus status = HttpStatus.NOT_FOUND;
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                ex.getMessage(),
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }

        // Handling standard built-in validation errors
        // This catches errors when @Valid or @Validated fails on a @RequestBody DTO
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex,
                        WebRequest request) {
                HttpStatus status = HttpStatus.BAD_REQUEST;

                // 1. Extract Field Errors into a Map
                Map<String, String> fieldErrors = new HashMap<>();
                ex.getBindingResult().getFieldErrors().forEach(error -> {
                        fieldErrors.put(error.getField(), error.getDefaultMessage());
                });

                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                "Validation failed for one or more fields.",
                                request,
                                fieldErrors);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(EmailServiceException.class)
        public ResponseEntity<ErrorResponse> handleEmailServiceException(EmailServiceException ex, WebRequest request) {
                HttpStatus status = ex.getStatus();
                ErrorResponse errorResponse = buildErrorResponse(
                                status, null, request, null);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(InvalidFruitDataException.class)
        public ResponseEntity<ErrorResponse> handleInvalidFruitDataException(InvalidFruitDataException ex,
                        WebRequest request) {
                HttpStatus status = HttpStatus.BAD_REQUEST;
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                ex.getMessage(),
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(UserNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {
                HttpStatus status = HttpStatus.NOT_FOUND;
                ErrorResponse errorResponse = buildErrorResponse(
                                status, ex.getMessage(), request, null);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(AuthenticationException.class)
        public ResponseEntity<ErrorResponse> handleUnauthorizedException(AuthenticationException ex,
                        WebRequest request) {
                HttpStatus status = HttpStatus.UNAUTHORIZED;
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                "Authentication Required: " + ex.getMessage(),
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(ImageUploadException.class)
        public ResponseEntity<ErrorResponse> handleImageUploadException(ImageUploadException ex, WebRequest request) {
                HttpStatus status = HttpStatus.FAILED_DEPENDENCY;
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                ex.getMessage(),
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(AccessDeniedException.class)
        public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
                HttpStatus status = HttpStatus.FORBIDDEN;
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                "Access Denied: You do not have the required permissions for this action."
                                                + ex.getMessage(),
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(FileNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleFileNotFoundException(FileNotFoundException ex, WebRequest request) {
                HttpStatus status = HttpStatus.NOT_FOUND;
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                ex.getMessage(),
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(NullPointerException.class)
        public ResponseEntity<ErrorResponse> handleNullPointerException(NullPointerException ex, WebRequest request) {
                HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                "A null value was encountered where it is not allowed: "
                                                + ex.getMessage(),
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex,
                        WebRequest request) {
                HttpStatus status = HttpStatus.BAD_REQUEST;
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                "Invalid argument provided: "
                                                + ex.getMessage(),
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(ApiException.class)
        public ResponseEntity<ErrorResponse> handleApiException(ApiException ex, WebRequest request) {
                HttpStatus status = ex.getStatus();
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                ex.getMessage(),
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }

        @ExceptionHandler(RoleAssignmentException.class)
        public ResponseEntity<ErrorResponse> handleRoleAssignmentException(RoleAssignmentException ex,
                        WebRequest request) {
                HttpStatus status = HttpStatus.BAD_REQUEST;
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                ex.getMessage(),
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }

        // Unhandled exceptions as a fallback
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, WebRequest request) {
                ex.printStackTrace();
                HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
                ErrorResponse errorResponse = buildErrorResponse(
                                status,
                                "An unexpected error occurred. Please contact support.",
                                request,
                                null);
                return new ResponseEntity<>(errorResponse, status);
        }
}
