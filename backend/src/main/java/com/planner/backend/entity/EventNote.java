package com.planner.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "event_note")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Example: attaching note to an Event
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY, optional = false) // optional: who wrote it
    @JoinColumn(name = "user_profile_id", nullable = false)
    private UserProfile userProfile;
}

