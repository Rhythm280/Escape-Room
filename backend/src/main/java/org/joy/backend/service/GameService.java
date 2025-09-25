package org.joy.backend.service;

import lombok.RequiredArgsConstructor;
import org.joy.backend.dto.AnswerResponse;
import org.joy.backend.dto.CompletionResponse;
import org.joy.backend.dto.PuzzleDTO;
import org.joy.backend.models.*;
import org.joy.backend.repository.*;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Optional;
import java.util.Set;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class GameService {

    private final RoomRepository roomRepository;
    private final PuzzleRepository puzzleRepository;
    private final PlayerProgressRepository progressRepository;
    private final LeaderboardRepository leaderboardRepository;
    private final GameStateRepository gameStateRepository;

    public Object getNextPuzzleForRoom(Long roomId, User user) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        Set<Long> solvedPuzzleIds = progressRepository.findSolvedPuzzleIdsByUserIdAndRoomId(user.getId(), roomId);

        Optional<Puzzle> nextPuzzle = room.getPuzzles().stream()
                .sorted(Comparator.comparing(Puzzle::getId))
                .filter(puzzle -> !solvedPuzzleIds.contains(puzzle.getId()))
                .findFirst();

        if (nextPuzzle.isPresent()) {
            Puzzle puzzle = nextPuzzle.get();
            saveOrUpdateGameState(user, puzzle.getRoom(), puzzle);
            return new PuzzleDTO(puzzle.getId(), puzzle.getQuestion());
        } else {
            return "Congratulations! You have solved all puzzles in this room.";
        }
    }

    public Object validateAnswer(Long puzzleId, String submittedAnswer, User user) {
        Puzzle puzzle = puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new RuntimeException("Puzzle not found with id: " + puzzleId));

        if (!puzzle.getAnswer().equalsIgnoreCase(submittedAnswer.trim())) {
            return new AnswerResponse(false, "Incorrect. Please try again.");
        }

        PlayerProgress progress = PlayerProgress.builder().user(user).puzzle(puzzle).build();
        progressRepository.save(progress);

        Room currentRoom = puzzle.getRoom();
        Set<Long> solvedPuzzleIds = progressRepository.findSolvedPuzzleIdsByUserIdAndRoomId(user.getId(), currentRoom.getId());

        if (solvedPuzzleIds.size() == currentRoom.getPuzzles().size()) {
            PlayerProgress firstPuzzleProgress = progressRepository.findFirstPuzzleSolvedInRoom(user.getId(), currentRoom.getId())
                    .orElse(progress);
            LocalDateTime startTime = firstPuzzleProgress.getSolvedAt();
            LocalDateTime endTime = LocalDateTime.now();
            long completionTimeInSeconds = Duration.between(startTime, endTime).toSeconds();

            LeaderboardEntry leaderboardEntry = LeaderboardEntry.builder()
                    .user(user)
                    .room(currentRoom)
                    .completionTimeSeconds(completionTimeInSeconds)
                    .build();
            leaderboardRepository.save(leaderboardEntry);

            Optional<Room> nextRoomOpt = roomRepository.findByOrderIndex(currentRoom.getOrderIndex() + 1);

            if (nextRoomOpt.isPresent()) {
                Room nextRoom = nextRoomOpt.get();
                Puzzle firstPuzzleOfNextRoom = nextRoom.getPuzzles().stream()
                        .min(Comparator.comparing(Puzzle::getId))
                        .orElse(null);
                saveOrUpdateGameState(user, nextRoom, firstPuzzleOfNextRoom);
                return CompletionResponse.builder()
                        .message("Congratulations! You've completed the room!")
                        .nextRoomId(nextRoom.getId())
                        .build();
            } else {
                gameStateRepository.deleteById(user.getId());
                return CompletionResponse.builder()
                        .message("You have completed the entire game! Well done!")
                        .build();
            }
        }

        return new AnswerResponse(true, "Correct! Well done.");
    }

    private void saveOrUpdateGameState(User user, Room room, Puzzle puzzle) {
        Supplier<GameState> newState = () -> GameState.builder()
                .user(user)
                .currentRoom(room)
                .currentPuzzle(puzzle)
                .build();

        GameState state = gameStateRepository.findById(user.getId()).orElseGet(newState);
        state.setCurrentRoom(room);
        state.setCurrentPuzzle(puzzle);
        gameStateRepository.save(state);
    }
}