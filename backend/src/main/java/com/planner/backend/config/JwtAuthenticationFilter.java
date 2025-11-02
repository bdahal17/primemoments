package com.planner.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTConfig jwtConfig;

    public JwtAuthenticationFilter(JWTConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();

        // Skip filter for static resources and public endpoints
        if (shouldSkipFilter(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("JwtAuthenticationFilter processing: " + path);

        try {
            String token = extractTokenFromRequest(request);

//            if (token != null && jwtService.validateToken(token)) {
//                String username = jwtService.extractUsername(token);
//                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//                if (jwtService.validateToken(token, userDetails)) {
//                    UsernamePasswordAuthenticationToken authentication =
//                            new UsernamePasswordAuthenticationToken(
//                                    userDetails,
//                                    null,
//                                    userDetails.getAuthorities()
//                            );
//                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                }
//            }
        } catch (Exception e) {
            System.err.println("JWT Authentication failed: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private boolean shouldSkipFilter(String path) {
        return path.equals("/") ||
                path.equals("/index.html") ||
                path.startsWith("/static/") ||
                path.startsWith("/assets/") ||
                path.startsWith("/h2-console") ||
                path.matches(".*\\.(js|css|ico|png|jpg|jpeg|svg|woff|woff2|ttf|map)$") ||
                path.equals("/api/user/login") ||
                path.equals("/api/user/register") ||
                path.equals("/api/auth/me") || path.equals("/login");
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
