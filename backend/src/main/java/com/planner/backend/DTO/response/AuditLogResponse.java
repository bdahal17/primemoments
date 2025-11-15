package com.planner.backend.DTO.response;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLogResponse {
    private Long id;
    private Long userId;
    private String entityType;
    private Long entityId;
    private String action;
    private String details;
    private LocalDateTime timestamp;
}
