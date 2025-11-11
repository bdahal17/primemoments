package com.planner.backend.controller;

import com.planner.backend.DTO.LoginRequest;
import com.planner.backend.DTO.UserDto;
import com.planner.backend.DTO.UserResponse;
import com.planner.backend.config.JWTConfig;
import com.planner.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/user")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            UserResponse userResponse = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            if(userResponse == null) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserDto userDto) {
        try {
            if(userService.existsByEmail(userDto.getEmail())) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            UserResponse userResponse = userService.createUser(userDto);
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
