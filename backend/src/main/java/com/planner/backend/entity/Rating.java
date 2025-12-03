package com.planner.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "rating")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Rating value from 1 to 5
     */
    @Column(nullable = false)
    private int ratingValue;

    /**
     * Optional comment about the event experience
     */
    @Column(length = 500)
    private String comment;

    private boolean active;
    private boolean publicComment;

    /**
     * The event being rated
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "event_id")
    private Event event;

    /**
     * The user who left the rating
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;

    /**
     * When the rating was created
     */
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * When the rating was last updated
     */
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
