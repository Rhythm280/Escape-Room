package org.joy.backend.service;

import lombok.RequiredArgsConstructor;
import org.joy.backend.dto.UserDTO;
import org.joy.backend.exception.UserNotFoundException;
import org.joy.backend.models.Puzzle;
import org.joy.backend.models.Room;
import org.joy.backend.repository.PuzzleRepository;
import org.joy.backend.repository.RoomRepository;
import org.joy.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final RoomRepository roomRepo;
    private final PuzzleRepository puzzleRepo;
    private final UserRepository userRepo;

    // Room methods
    public Room createRoom(Room room) {
        return roomRepo.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepo.findById(id);
    }

    public Room updateRoom(Long id, Room updatedRoom) {
        return roomRepo.findById(id).map(room -> {
            room.setName(updatedRoom.getName());
            room.setDescription(updatedRoom.getDescription());
            return roomRepo.save(room);
        }).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public void deleteRoom(Long id) {
        roomRepo.deleteById(id);
    }

    // Puzzle methods
    public Puzzle createPuzzle(Puzzle puzzle, Long roomId) {
        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        puzzle.setRoom(room);
        return puzzleRepo.save(puzzle);
    }

    public List<Puzzle> getAllPuzzles() {
        return puzzleRepo.findAll();
    }

    public Optional<Puzzle> getPuzzleById(Long id) {
        return puzzleRepo.findById(id);
    }

    public Puzzle updatePuzzle(Long id, Puzzle updatedPuzzle) {
        return puzzleRepo.findById(id).map(puzzle -> {
            puzzle.setQuestion(updatedPuzzle.getQuestion());
            puzzle.setAnswer(updatedPuzzle.getAnswer());
            return puzzleRepo.save(puzzle);
        }).orElseThrow(() -> new RuntimeException("Puzzle not found"));
    }

    public void deletePuzzle(Long id) {
        puzzleRepo.deleteById(id);
    }

    public List<Puzzle> getPuzzlesByRoom(Long roomId) {
        return puzzleRepo.findByRoomId(roomId);
    }

    public List<UserDTO> getAllPlayers() {
        return userRepo.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getEmail()))
                .collect(Collectors.toList());
    }

    public void deletePlayer(Long userId) {
        if (!userRepo.existsById(userId)) {
            throw new UserNotFoundException("User not found with id: " + userId);
        }
        userRepo.deleteById(userId);
    }
}
