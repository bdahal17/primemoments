package com.planner.backend.DTO;

import lombok.Data;

import java.util.Set;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private boolean enabled;
    private boolean locked;
    private Set<String> roles;  // User's role names
    private String token;
}
