package org.joy.backend.service;

import lombok.RequiredArgsConstructor;
import org.joy.backend.dto.LeaderboardDto;
import org.joy.backend.repository.LeaderboardRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;

    public List<LeaderboardDto> getLeaderboardForRoom(Long roomId) {
        return leaderboardRepository.findTop10ByRoomIdOrderByCompletionTimeSecondsAsc(roomId)
                .stream()
                .map(entry -> new LeaderboardDto(
                        entry.getUser().getUsername(),
                        entry.getCompletionTimeSeconds()))
                .collect(Collectors.toList());
    }
}