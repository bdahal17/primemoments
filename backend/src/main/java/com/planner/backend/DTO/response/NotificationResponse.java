package com.planner.backend.DTO.response;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {
    private Long id;
    private Long userId;
    private String type;
    private String title;
    private String body;
    private boolean delivered;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
}

