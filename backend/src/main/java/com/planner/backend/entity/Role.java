package com.planner.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@ToString(exclude = "users")                     // IMPORTANT: exclude collections
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@Data
@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true, nullable = false, length = 50)
    private String name;

    @Column(name = "description", length = 255)
    private String description;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<UserProfile> users = new HashSet<>();
}
