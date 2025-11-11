package com.planner.backend.config;

import com.planner.backend.DTO.UserResponse;
import com.planner.backend.entity.Role;
import com.planner.backend.entity.UserProfile;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

@Configuration
public class JWTConfig {

    private final String jwtSecret;

    // Inject the secret retrieved from Secrets Manager
    public JWTConfig(@Qualifier("jwtSecret") String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    private final long jwtExpirationInMs = 3600000; // 1 hour

    /**
     * Generate token with default claims (username only)
     */
    public String generateToken(UserProfile user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("ROLES", user.getRoles());
        claims.put("FIRST_NAME", user.getFirstName());
        claims.put("LAST_NAME", user.getLastName());
        String username = user.getEmail();
        claims.put("EMAIL", username);
        return createToken(claims, username);
    }

    /**
     * Generate token with custom claims
     */
    public String generateToken(String username, Map<String, Object> extraClaims) {
        return createToken(extraClaims, username);
    }

    /**
     * Create JWT token
     */
    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuer("PlannerApp")
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extract username from token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extract expiration date from token
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extract specific claim from token
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extract all claims from token
     */
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Check if token is expired
     */
    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Validate token against user details
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Validate token (basic validation without UserDetails)
     */
    public Boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (SignatureException e) {
            // Invalid signature
            System.out.println("Token validation error: " + e.getMessage());
        } catch (MalformedJwtException e) {
            // Invalid token
            System.out.println("Token validation error: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            // Expired token
            System.out.println("Token validation error: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            // Unsupported token
            System.out.println("Token validation error: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            // Empty claims
            System.out.println("Token validation error: " + e.getMessage());
        }
        return false;
    }

    /**
     * Get signing key from secret
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Get token expiration time in milliseconds
     */
    public long getExpirationTime() {
        return jwtExpirationInMs;
    }
}
