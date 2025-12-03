package com.planner.backend.repository;

import com.planner.backend.entity.Event;
import com.planner.backend.entity.Location;
import com.planner.backend.entity.Rating;
import com.planner.backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByEvent(Event event);
    Optional<Rating> findByEventAndUserProfile(Event event, UserProfile userProfile);
}
