package com.planner.backend.entity;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserProfile {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
//
//    @Column(unique = true, nullable = false)
    private String email;
//
//    @Column(nullable = false)
    private String passwordHash;
//
//    private boolean enabled = true;
//    private boolean locked = false;
//
//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(
//            name = "user_roles",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id")
//    )
//    private Set<Role> roles = new HashSet<>();
}
