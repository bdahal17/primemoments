package com.planner.backend.DTO;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDto {
    @NotNull
    private Long userId;

    @NotBlank
    private String title;

    private String body;
    private String type; // string or enum name
}

