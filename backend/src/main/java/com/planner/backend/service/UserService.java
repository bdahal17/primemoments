package com.planner.backend.service;

import com.planner.backend.DTO.UserDto;
import com.planner.backend.DTO.response.UserResponse;
import com.planner.backend.config.JWTConfig;
import com.planner.backend.entity.Role;
import com.planner.backend.entity.UserProfile;
import com.planner.backend.repository.RoleRepository;
import com.planner.backend.repository.UserProfileRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserProfileRepository userRepository;
    private final RoleRepository roleRepository;
    private final JWTConfig jwtConfig;

    public UserService(BCryptPasswordEncoder passwordEncoder,
                       UserProfileRepository userRepository,
                       RoleRepository roleRepository,
                       JWTConfig jwtConfig) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtConfig = jwtConfig;
    }

    public boolean existsByEmail(String username) {
        return userRepository.existsByEmail(username);
    }

    @Transactional
    public UserResponse createUser(UserDto userDto) {
        // Check if user already exists
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("Email already exists: " + userDto.getEmail());
        }

        UserProfile user = new UserProfile();
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPasswordHash(passwordEncoder.encode(userDto.getPassword()));

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Default role not found"));

        user.addRole(userRole);

        UserProfile savedUser = userRepository.save(user);

        return mapToUserResponse(savedUser);
    }

    /**
     * Authenticates a user with email and password
     *
     * @param email User's email
     * @param password Plain text password
     * @return UserResponse if authentication successful
     * @throws RuntimeException if authentication fails
     */
    @Transactional(readOnly = true)
    public UserResponse authenticateUser(String email, String password) {
        // Find user by email
        UserProfile user = userRepository.findUserProfileByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Check if account is enabled
        if (!user.isEnabled()) {
            throw new RuntimeException("Account is disabled. Please verify your email.");
        }

        // Check if account is locked
        if (user.isLocked()) {
            throw new RuntimeException("Account is locked. Please contact support.");
        }

        // Verify password
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }
        return mapToUserResponse(user);
    }

    @Transactional(readOnly = true)
    public UserResponse getUserByEmail(String email) {
        UserProfile user = userRepository.findUserProfileByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return mapToUserResponse(user);
    }

    /**
     * Helper method to map UserProfile entity to UserResponse DTO
     */
    private UserResponse mapToUserResponse(UserProfile user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEnabled(user.isEnabled());
        response.setLocked(user.isLocked());
        response.setToken(jwtConfig.generateToken(user));

        return response;
    }
}
