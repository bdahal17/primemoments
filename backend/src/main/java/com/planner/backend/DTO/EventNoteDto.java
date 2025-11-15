package com.planner.backend.DTO;

import lombok.Data;

@Data
public class EventNoteDto {
    private String title;
    private String content;
    private Long eventId; // which event this note belongs to
}
