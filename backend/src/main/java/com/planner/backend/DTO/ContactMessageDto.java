package com.planner.backend.DTO;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactMessageDto {
    // if logged-in, backend may attach fromUserId; clients may omit
    private Long fromUserId;

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    private String subject;

    @NotBlank
    private String message;
}
