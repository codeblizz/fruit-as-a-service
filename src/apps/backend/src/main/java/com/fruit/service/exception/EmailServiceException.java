package com.fruit.service.exception;

import org.springframework.http.HttpStatus;

public class EmailServiceException extends RuntimeException {
    private final HttpStatus status;

    public EmailServiceException(String message, Throwable cause, HttpStatus status) {
        super(message, cause);
        this.status = status;
    }

    public EmailServiceException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
