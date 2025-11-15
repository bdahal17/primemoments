package com.planner.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_message")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // optional: client user who sent message (null for guest)
    @ManyToOne(fetch = FetchType.LAZY)
    private UserProfile fromUser;

    private String name; // sender name (for guest or display)
    private String email;
    private String subject;

    @Column(length = 8000)
    private String message;

    @Enumerated(EnumType.STRING)
    private MessageStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void prePersist() {
        createdAt = LocalDateTime.now();
        if (status == null) status = MessageStatus.NEW;
    }

    public enum MessageStatus {
        NEW, READ, RESPONDED, CLOSED
    }
}

