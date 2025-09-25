package org.joy.backend.service;

import lombok.RequiredArgsConstructor;
import org.joy.backend.dto.AuthResponse;
import org.joy.backend.dto.GameStateDto;
import org.joy.backend.dto.LoginRequest;
import org.joy.backend.dto.RegisterRequest;
import org.joy.backend.models.*;
import org.joy.backend.repository.*;
import org.joy.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final GameStateRepository gameStateRepository;
    private final RoomRepository roomRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepo.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }
        Role playerRole = roleRepo.findByName("PLAYER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(playerRole))
                .build();
        userRepo.save(user);

        // Create an initial game state for the new user, pointing to the first puzzle
        Room firstRoom = roomRepository.findByOrderIndex(1).orElse(null);
        if (firstRoom != null) {
            Puzzle firstPuzzle = firstRoom.getPuzzles().stream()
                    .min(Comparator.comparing(Puzzle::getId))
                    .orElse(null);

            GameState initialGameState = GameState.builder()
                    .user(user)
                    .currentRoom(firstRoom)
                    .currentPuzzle(firstPuzzle)
                    .build();
            gameStateRepository.save(initialGameState);
        }

        return AuthResponse.builder()
                .token(jwtService.generateToken(user))
                .refreshToken(jwtService.generateRefreshToken(user))
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Find the user's saved game state
        Optional<GameState> gameStateOpt = gameStateRepository.findById(user.getId());
        GameStateDto gameStateDto = null;
        if (gameStateOpt.isPresent()) {
            GameState state = gameStateOpt.get();
            gameStateDto = GameStateDto.builder()
                    .currentRoomId(state.getCurrentRoom() != null ? state.getCurrentRoom().getId() : null)
                    .currentPuzzleId(state.getCurrentPuzzle() != null ? state.getCurrentPuzzle().getId() : null)
                    .build();
        }

        // Build the final response, now correctly including the game state
        return AuthResponse.builder()
                .token(jwtService.generateToken(user))
                .refreshToken(jwtService.generateRefreshToken(user))
                .gameState(gameStateDto)
                .build();
    }
}