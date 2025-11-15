package com.planner.backend.DTO;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLogDto {
    private Long userId;
    @NotBlank
    private String entityType;
    @NotNull
    private Long entityId;
    @NotBlank
    private String action;
    private String details;
}

