package com.planner.backend.DTO.response;

import com.planner.backend.DTO.EventNoteDto;
import com.planner.backend.entity.EventStatus;
import com.planner.backend.entity.Location;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventResponse {
    private Long id;
    private String eventType;
    private LocalDateTime eventDate;
    private String venueAddress;
    private Integer expectedGuests;
    private EventStatus status;
    private String createdBy;
    private String contactPhone;
    private String contactName;
    private List<EventNoteDto> noteDto;
    private LocationResponse location;

    // Constructors, getters, setters
}
