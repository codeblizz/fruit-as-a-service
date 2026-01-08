package com.fruit.service.exception;

public class InvalidFruitDataException extends RuntimeException {
    public InvalidFruitDataException(String message) {
        super(message);
    }
}