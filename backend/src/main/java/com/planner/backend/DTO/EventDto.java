package com.planner.backend.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventDto {
    @NotBlank(message = "Event type is required")
    private String eventType;

    @Future(message = "Event date must be in the future")
    private LocalDateTime eventDate;

    @NotBlank(message = "Venue is required")
    private String venueAddress;

    @Min(value = 1, message = "Expected guests must be at least 1")
    private Integer expectedGuests;

    private String additionalNotes;

    // Constructors, getters, setters
}
