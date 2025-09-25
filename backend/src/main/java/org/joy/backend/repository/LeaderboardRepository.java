package org.joy.backend.repository;

import org.joy.backend.models.LeaderboardEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaderboardRepository extends JpaRepository<LeaderboardEntry, Long> {

    // Find the top 10 entries for a room, ordered by the fastest times
    List<LeaderboardEntry> findTop10ByRoomIdOrderByCompletionTimeSecondsAsc(Long roomId);
}