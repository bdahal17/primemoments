package com.planner.backend.config;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

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
        if (shouldSkipFilter(path)) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            String token = extractTokenFromRequest(request);
            if (token != null && jwtConfig.validateToken(token)) {
                String username = jwtConfig.extractUsername(token);
                List<String> roles = jwtConfig.extractRoles(token);
                List<SimpleGrantedAuthority> authorities = roles.stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, authorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or missing JWT token");
                return;
            }
            filterChain.doFilter(request, response);
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired");
        } catch (Exception e) {
            System.err.println("JWT Authentication failed: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT authentication failed");
        }

    }

    private boolean shouldSkipFilter(String path) {
        return path.equals("/") ||
                path.equals("/index.html") ||
                path.startsWith("/static/") ||
                path.startsWith("/assets/") ||
                path.startsWith("/h2-console") ||
                path.startsWith("img/") ||
                path.startsWith("/img") ||
                path.startsWith("images/") ||
                path.startsWith("/images") ||
                path.startsWith("image/") ||
                path.startsWith("/image") ||
                path.startsWith("image") ||
                path.startsWith("images") ||
                path.startsWith("img") ||
                path.matches(".*\\.(js|css|ico|png|jpg|jpeg|svg|woff|woff2|ttf|map)$") ||
                path.equals("/api/user/login") ||
                path.equals("/api/user/register") ||
                path.equals("/api/auth/me") ||
                path.equals("/login") ||
                path.equals("/register") ||
                path.equals("/account") ||
                path.equals("/admin") ||
                path.startsWith("/actuator/");
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
