package com.planner.backend.repository;

import com.planner.backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findUserProfileByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM UserProfile u JOIN FETCH u.roles WHERE u.email = :email")
    Optional<UserProfile> findByEmailWithRoles(String email);
}
