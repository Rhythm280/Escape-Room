package org.joy.backend.controller;

import lombok.RequiredArgsConstructor;
import org.joy.backend.dto.AnswerRequest;
import org.joy.backend.models.User;
import org.joy.backend.payload.ApiResponse;
import org.joy.backend.service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping("/rooms/{roomId}/puzzle")
    public ResponseEntity<ApiResponse<Object>> getPuzzle(
            @PathVariable Long roomId,
            @AuthenticationPrincipal User user
    ) {
        Object puzzle = gameService.getNextPuzzleForRoom(roomId, user);
        ApiResponse<Object> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Next puzzle fetched successfully");
        response.setData(puzzle);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/puzzles/{puzzleId}/submit")
    public ResponseEntity<ApiResponse<Object>> submitAnswer(
            @PathVariable Long puzzleId,
            @RequestBody AnswerRequest request,
            @AuthenticationPrincipal User user
    ) {
        Object answerResponse = gameService.validateAnswer(puzzleId, request.getAnswer(), user);
        ApiResponse<Object> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Answer submitted successfully");
        response.setData(answerResponse);
        return ResponseEntity.ok(response);
    }
}