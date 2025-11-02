//package com.planner.backend.entity;
//
//public class Role {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;
//
//    @Column(unique = true, nullable = false)
//    private String name; // e.g. ROLE_USER, ROLE_ADMIN
//
//    private String description;
//
//    // Bi-directional (optional)
//    @ManyToMany(mappedBy = "roles")
//    private Set<User> users = new HashSet<>();
//}
