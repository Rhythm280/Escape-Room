package org.joy.backend.exception;

public class PuzzleNotFoundException extends RuntimeException {
    private final String message;
    public PuzzleNotFoundException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
