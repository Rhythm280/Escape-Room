package org.joy.backend.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // This ensures null fields are not included in the JSON response
public class ApiResponse<T> {
    private int statusCode;
    private String message;
    private T data;
}