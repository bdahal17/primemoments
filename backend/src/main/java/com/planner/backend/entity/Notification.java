package com.planner.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // who should receive
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private UserProfile user;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    private String title;

    @Column(length = 4000)
    private String body;

    private boolean delivered; // in-app delivered flag

    private LocalDateTime createdAt;
    private LocalDateTime readAt;

    @PrePersist
    protected void prePersist() {
        createdAt = LocalDateTime.now();
    }

    public enum NotificationType {
        EVENT_REQUEST_CREATED,
        EVENT_REQUEST_UPDATED,
        EVENT_REQUEST_APPROVED,
        CONTACT_MESSAGE_RECEIVED,
        SYSTEM
    }
}

