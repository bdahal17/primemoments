package com.planner.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {
    @GetMapping(value = {
            "/account",
            "/account/**",
            "/dashboard",
            "/dashboard/**",
            "/profile",
            "/profile/**",
            "/login"
            // Add other React Router routes as needed
    })
    public String forward() {
        return "forward:/index.html";
    }
}

