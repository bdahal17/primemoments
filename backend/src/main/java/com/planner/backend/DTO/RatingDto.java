package com.planner.backend.DTO;

import lombok.Data;

@Data
public class RatingDto {
    private Long eventId;
    private int rating;
    private String comment;
    private boolean publicComment;
}
