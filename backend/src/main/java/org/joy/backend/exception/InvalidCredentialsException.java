package org.joy.backend.exception;

public class InvalidCredentialsException extends RuntimeException {
    private final String message;
    public InvalidCredentialsException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
