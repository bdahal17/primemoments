package com.planner.backend.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.planner.backend.entity.EventStatus;
import com.planner.backend.entity.Location;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {

    @NotBlank(message = "Event type is required")
    private String eventType;

    private String contactNumber;
    private String contactName;

    @Future(message = "Event date must be in the future")
    private LocalDateTime eventDateTime;

    @Min(value = 1, message = "Expected guests must be at least 1")
    private Integer expectedGuests;
    private LocationDto location; // if you still want to keep it
    private String additionalNotes; // optional extra info
}
