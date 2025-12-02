package com.planner.backend.DTO;

import com.planner.backend.DTO.response.UserResponse;
import com.planner.backend.entity.UserProfile;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventNoteDto {
    private Long id;
    private String title;
    private String content;
    private Long eventId; // which event this note belongs to
    private LocalDateTime createdAt;
    private String user; // who wrote the note
}
