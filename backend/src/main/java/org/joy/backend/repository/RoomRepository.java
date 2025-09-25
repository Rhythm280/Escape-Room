package org.joy.backend.repository;

import org.joy.backend.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByOrderIndex(int orderIndex);
}