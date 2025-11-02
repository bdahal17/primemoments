package com.planner.backend.controller;

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

    private final JWTConfig jwtConfig;
    private final UserService userService;

    public UserController(JWTConfig jwtConfig, UserService userService) {
        this.jwtConfig = jwtConfig;
        this.userService = userService;

    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(String email, String password) {
        try {
            UserResponse userResponse = userService.authenticateUser(email, password);
            if(userResponse == null) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
            userResponse.setToken(jwtConfig.generateToken(email));
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserDto userDto) {
        try {
            if(!userService.isValidUsername(userDto.getEmail())) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            UserResponse userResponse = userService.saveUser(userDto);
            userResponse.setToken(jwtConfig.generateToken(userDto.getEmail()));
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
