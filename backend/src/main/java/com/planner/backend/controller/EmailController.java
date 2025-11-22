package com.planner.backend.controller;

import com.planner.backend.DTO.Mail;
import com.planner.backend.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(Authentication authentication, @RequestBody Mail mail) {
        try {
            emailService.sendEmail(authentication, mail);
            return ResponseEntity.ok("email sent /sendEmail ! " + mail.getEmail() + " and " + mail.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}

