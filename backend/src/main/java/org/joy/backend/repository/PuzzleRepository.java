package org.joy.backend.repository;

import org.joy.backend.models.Puzzle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PuzzleRepository extends JpaRepository<Puzzle, Long> {
    List<Puzzle> findByRoomId(Long roomId);
}
