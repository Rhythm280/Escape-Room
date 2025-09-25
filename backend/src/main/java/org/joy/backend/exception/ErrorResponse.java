// File: src/main/java/org/joy/backend/dto/ErrorResponse.java
// --- NEW FILE ---
package org.joy.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private int errorCode;
    private String message;
    private String cause;
}