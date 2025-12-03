package com.planner.backend.DTO.response;

import lombok.Data;

@Data
public class RatingResponse {
    private Long id;
    private int score;
    private String comment;
    private boolean active;
    private boolean publicComment;
}
