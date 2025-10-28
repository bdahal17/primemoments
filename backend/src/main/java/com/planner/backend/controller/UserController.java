package com.planner.backend.controller;

import com.planner.backend.DTO.UserDto;
import com.planner.backend.DTO.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/user")
@RestController
public class UserController {

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(String email, String password) {
        try {
            UserResponse userResponse = new UserResponse();
            userResponse.setEmail(email);
            userResponse.setFirstName("John");
            userResponse.setLastName("Doe");
            userResponse.setToken("sample-token-123");
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserDto userDto) {
        try {
            UserResponse userResponse = new UserResponse();
            userResponse.setEmail(userDto.getEmail());
            userResponse.setFirstName(userDto.getFirstName());
            userResponse.setLastName(userDto.getLastName());
            userResponse.setToken("sample-token-123");
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
