package com.planner.backend.controller;

import com.planner.backend.DTO.EventDto;
import com.planner.backend.DTO.response.EventResponse;
import com.planner.backend.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
