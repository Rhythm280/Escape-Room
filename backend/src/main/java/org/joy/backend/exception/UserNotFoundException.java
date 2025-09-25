package org.joy.backend.exception;

public class UserNotFoundException extends RuntimeException {
    public final String message;
    public UserNotFoundException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
