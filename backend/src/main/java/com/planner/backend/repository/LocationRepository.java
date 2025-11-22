package com.planner.backend.repository;

import com.planner.backend.entity.Event;
import com.planner.backend.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByEvent(Event event);

}
