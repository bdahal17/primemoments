package com.planner.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_log", indexes = {
        @Index(columnList = "entityType, entityId", name = "idx_audit_entity")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // user who performed action (nullable for system)
    @ManyToOne(fetch = FetchType.LAZY)
    private UserProfile user;

    private String entityType; // e.g., "EventRequest"
    private Long entityId;

    @Enumerated(EnumType.STRING)
    private AuditAction action;

    @Column(length = 4000)
    private String details; // JSON or human-readable

    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }

    public enum AuditAction {
        CREATE, UPDATE, DELETE, APPROVE, REJECT, LOGIN, LOGOUT, SYSTEM
    }
}

