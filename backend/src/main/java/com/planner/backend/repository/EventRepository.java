package com.planner.backend.repository;

import com.planner.backend.entity.Event;
import com.planner.backend.entity.EventStatus;
import com.planner.backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<List<Event>> findAllByUserProfileOrderByEventDateDesc(UserProfile user);

    Optional<List<Event>> findAllByOrderByEventDateDesc();

    Optional<List<Event>> findByStatusAndEventDateBefore(EventStatus status, LocalDateTime date);


}
