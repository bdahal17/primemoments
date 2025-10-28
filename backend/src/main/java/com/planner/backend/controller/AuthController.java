package com.planner.backend.controller;

import com.planner.backend.DTO.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RestController
public class AuthController {

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe(@RequestHeader("Authorization") String token) {
        UserResponse userResponse = new UserResponse();
        userResponse.setEmail("email");
        userResponse.setFirstName("John");
        userResponse.setLastName("Doe");
        userResponse.setToken(token);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }
}
