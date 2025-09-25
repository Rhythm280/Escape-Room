// File: src/main/java/org/joy/backend/dto/AnswerResponse.java
package org.joy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnswerResponse {
    private boolean correct;
    private String message;
}