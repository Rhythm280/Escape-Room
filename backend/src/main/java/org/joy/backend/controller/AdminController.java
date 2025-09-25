package org.joy.backend.controller;

import lombok.RequiredArgsConstructor;
import org.joy.backend.dto.UserDTO;
import org.joy.backend.models.Puzzle;
import org.joy.backend.models.Room;
import org.joy.backend.payload.ApiResponse;
import org.joy.backend.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/rooms")
    public ResponseEntity<ApiResponse<Room>> createRoom(@RequestBody Room room) {
        Room savedRoom = adminService.createRoom(room);

        ApiResponse<Room> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.CREATED.value());
        response.setMessage("Room created successfully");
        response.setData(savedRoom);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/rooms")
    public ResponseEntity<ApiResponse<List<Room>>> getAllRooms() {
        List<Room> rooms = adminService.getAllRooms();

        ApiResponse<List<Room>> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Rooms fetched successfully");
        response.setData(rooms);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/rooms/{id}")
    public ResponseEntity<ApiResponse<Room>> getRoomById(@PathVariable Long id) {
        Room room = adminService.getRoomById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        ApiResponse<Room> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Room fetched successfully");
        response.setData(room);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/rooms/{id}")
    public ResponseEntity<ApiResponse<Room>> updateRoom(@PathVariable Long id, @RequestBody Room room) {
        Room updatedRoom = adminService.updateRoom(id, room);

        ApiResponse<Room> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Room updated successfully");
        response.setData(updatedRoom);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/rooms/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRoom(@PathVariable Long id) {
        adminService.deleteRoom(id);

        ApiResponse<Void> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Room deleted successfully");

        return ResponseEntity.ok(response);
    }

    // ----------------- PUZZLES -----------------
    @PostMapping("/rooms/{roomId}/puzzles")
    public ResponseEntity<ApiResponse<Puzzle>> createPuzzle(@PathVariable Long roomId, @RequestBody Puzzle puzzle) {
        Puzzle savedPuzzle = adminService.createPuzzle(puzzle, roomId);

        ApiResponse<Puzzle> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.CREATED.value());
        response.setMessage("Puzzle created successfully");
        response.setData(savedPuzzle);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/puzzles")
    public ResponseEntity<ApiResponse<List<Puzzle>>> getAllPuzzles() {
        List<Puzzle> puzzles = adminService.getAllPuzzles();

        ApiResponse<List<Puzzle>> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Puzzles fetched successfully");
        response.setData(puzzles);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/puzzles/{id}")
    public ResponseEntity<ApiResponse<Puzzle>> getPuzzleById(@PathVariable Long id) {
        Puzzle puzzle = adminService.getPuzzleById(id)
                .orElseThrow(() -> new RuntimeException("Puzzle not found"));

        ApiResponse<Puzzle> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Puzzle fetched successfully");
        response.setData(puzzle);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/puzzles/{id}")
    public ResponseEntity<ApiResponse<Puzzle>> updatePuzzle(@PathVariable Long id, @RequestBody Puzzle puzzle) {
        Puzzle updatedPuzzle = adminService.updatePuzzle(id, puzzle);

        ApiResponse<Puzzle> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Puzzle updated successfully");
        response.setData(updatedPuzzle);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/puzzles/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePuzzle(@PathVariable Long id) {
        adminService.deletePuzzle(id);

        ApiResponse<Void> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Puzzle deleted successfully");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/rooms/{roomId}/puzzles")
    public ResponseEntity<ApiResponse<List<Puzzle>>> getPuzzlesByRoom(@PathVariable Long roomId) {
        List<Puzzle> puzzles = adminService.getPuzzlesByRoom(roomId);

        ApiResponse<List<Puzzle>> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Puzzles fetched successfully");
        response.setData(puzzles);

        return ResponseEntity.ok(response);
    }

    // ----------------- PLAYERS -----------------
    @GetMapping("/players")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllPlayers() {
        List<UserDTO> players = adminService.getAllPlayers();

        ApiResponse<List<UserDTO>> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Players fetched successfully");
        response.setData(players);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/players/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePlayer(@PathVariable Long id) {
        adminService.deletePlayer(id);

        ApiResponse<Void> response = new ApiResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Player deleted successfully");

        return ResponseEntity.ok(response);
    }
}
