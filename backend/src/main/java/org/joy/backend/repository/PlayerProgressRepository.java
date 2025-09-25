// File: src/main/java/org/joy/backend/repository/PlayerProgressRepository.java
// --- NEW FILE ---
package org.joy.backend.repository;

import org.joy.backend.models.PlayerProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface PlayerProgressRepository extends JpaRepository<PlayerProgress, Long> {

    @Query("SELECT pp.puzzle.id FROM PlayerProgress pp WHERE pp.user.id = :userId AND pp.puzzle.room.id = :roomId")
    Set<Long> findSolvedPuzzleIdsByUserIdAndRoomId(Long userId, Long roomId);

    @Query("SELECT pp FROM PlayerProgress pp WHERE pp.user.id = :userId AND pp.puzzle.room.id = :roomId ORDER BY pp.solvedAt ASC LIMIT 1")
    Optional<PlayerProgress> findFirstPuzzleSolvedInRoom(Long userId, Long roomId);

}