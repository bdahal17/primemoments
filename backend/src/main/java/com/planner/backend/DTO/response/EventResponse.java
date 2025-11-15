package com.planner.backend.DTO.response;

import com.planner.backend.entity.EventStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventResponse {
    private Long id;
    private String eventType;
    private LocalDateTime eventDate;
    private String venueAddress;
    private Integer expectedGuests;
    private EventStatus status;
    private String additionalNotes;

    // Constructors, getters, setters
}
