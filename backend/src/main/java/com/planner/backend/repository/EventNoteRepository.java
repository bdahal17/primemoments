package com.planner.backend.repository;

import com.planner.backend.entity.EventNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventNoteRepository extends JpaRepository<EventNote, Long> {
}
