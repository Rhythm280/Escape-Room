// File: src/main/java/org/joy/backend/dto/PuzzleDto.java
package org.joy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PuzzleDTO {
    private Long id;
    private String question;
}