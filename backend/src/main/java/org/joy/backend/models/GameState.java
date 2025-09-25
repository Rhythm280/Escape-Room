package org.joy.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "game_states")
public class GameState {

    @Id
    private Long id; // Same ID as the User

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // This links the GameState ID to the User ID
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_room_id")
    private Room currentRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_puzzle_id")
    private Puzzle currentPuzzle;
}