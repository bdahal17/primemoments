package com.planner.backend.DTO.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class EventNoteResponse {
    private Long id;
    private String title;
    private String content;
    private Long eventId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
