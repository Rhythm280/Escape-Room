package org.joy.backend.exception;

public class RoomNotFoundException extends RuntimeException {
    public final String message;
    public RoomNotFoundException(String message) {
        this.message = message;
    }
    @Override
    public String getMessage() {
        return message;
    }
}
