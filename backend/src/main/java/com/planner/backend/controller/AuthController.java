package com.planner.backend.controller;

import com.planner.backend.DTO.UserResponse;
import com.planner.backend.config.JWTConfig;
import com.planner.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RestController
public class AuthController {

    private final JWTConfig jwtConfig;
    private final UserService userService;

    public AuthController(JWTConfig jwtConfig, UserService userService) {
        this.jwtConfig = jwtConfig;
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe(@RequestHeader("Authorization") String token) {
        try {
            String cleanedToken = token.startsWith("Bearer ") ? token.substring(7).trim() : token.trim();
            boolean jwtValid = jwtConfig.validateToken(cleanedToken);
            if (jwtValid) {
                String email = jwtConfig.extractUsername(cleanedToken);
                UserResponse user =  userService.getUserByEmail(email);
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            System.out.println("Token validation error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
