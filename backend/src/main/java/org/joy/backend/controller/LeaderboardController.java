package org.joy.backend.controller;

import lombok.RequiredArgsConstructor;
import org.joy.backend.dto.LeaderboardDto;
import org.joy.backend.payload.ApiResponse;
import org.joy.backend.service.LeaderboardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @GetMapping("/{roomId}")
    public ResponseEntity<ApiResponse<List<LeaderboardDto>>> getLeaderboardForRoom(@PathVariable Long roomId) {
        List<LeaderboardDto> leaderboard = leaderboardService.getLeaderboardForRoom(roomId);

        ApiResponse<List<LeaderboardDto>> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Leaderboard fetched successfully");
        response.setData(leaderboard);

        return ResponseEntity.ok(response);
    }
}