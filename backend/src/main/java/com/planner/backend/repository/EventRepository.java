package com.planner.backend.repository;

import com.planner.backend.entity.Event;
import com.planner.backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findAllByUserProfileOrderByEventDateDesc(UserProfile user);


}
