package com.planner.backend.controller;

import com.planner.backend.DTO.EventDto;
import com.planner.backend.DTO.RatingDto;
import com.planner.backend.DTO.response.EventResponse;
import com.planner.backend.DTO.response.RatingResponse;
import com.planner.backend.entity.EventNote;
import com.planner.backend.service.EmailService;
import com.planner.backend.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/event")
@RestController
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/create")
    public ResponseEntity<EventResponse> createEvent(Authentication authentication, @RequestBody EventDto eventDto) {
        try {
            EventResponse eventResponse = eventService.createEvent(authentication.getName(), eventDto);
            return ResponseEntity.ok(eventResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<EventResponse>> getEvents(Authentication authentication) {
        try {
            if(authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ADMIN"))) {
                return ResponseEntity.ok(eventService.getAllEvents());
            }
            return ResponseEntity.ok(eventService.getEventsForUser(authentication.getName()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }

    }

    @PostMapping("/approve/{eventId}")
    public ResponseEntity<?> approveEvent(Authentication authentication, @PathVariable Long eventId) {
        try {
            if(authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ADMIN"))) {
                EventResponse eventResponse = eventService.approveEvent(eventId);
                return ResponseEntity.ok(eventResponse);
            }
            return ResponseEntity.status(403).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PatchMapping("/update/{eventId}")
    public ResponseEntity<EventResponse> updateEvent(Authentication authentication, @PathVariable Long eventId, @RequestBody String content) {
        try {
            EventResponse eventResponse = eventService.updateEvent(authentication.getName(), eventId, content);
            return ResponseEntity.ok(eventResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/rate")
    public ResponseEntity<RatingResponse> addRating(Authentication authentication, @RequestBody RatingDto rating) {
        try {
            RatingResponse ratingResponse = eventService.addRating(authentication.getName(), rating);
            return ResponseEntity.ok(ratingResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
