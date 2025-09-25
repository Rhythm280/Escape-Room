package org.joy.backend.exception;

public class UnauthorizedAccessException extends RuntimeException {
    public final String  message;
    public UnauthorizedAccessException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
