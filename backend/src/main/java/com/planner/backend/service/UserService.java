package com.planner.backend.service;

import com.planner.backend.DTO.UserDto;
import com.planner.backend.DTO.UserResponse;
import com.planner.backend.entity.UserProfile;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
public class UserService {
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public boolean isValidUsername(String username) {
        // Implement your logic to check if the username is valid
        return true; // Placeholder return value
    }

    public UserResponse saveUser(UserDto user) {
        // Implement your logic to save the user to the database

        String hashedPassword = passwordEncoder.encode(user.getPassword());

        UserDto userToSave = new UserDto();
        userToSave.setEmail(user.getEmail());
        userToSave.setFirstName(user.getFirstName());
        userToSave.setLastName(user.getLastName());
        userToSave.setPassword(hashedPassword);
        return new UserResponse();
    }

    public UserResponse authenticateUser(String email, String password) {
        // Implement your logic to authenticate the user
        return new UserResponse(); // Placeholder return value
    }

}
