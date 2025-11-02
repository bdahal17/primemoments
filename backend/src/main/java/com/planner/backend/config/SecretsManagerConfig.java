package com.planner.backend.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

@Configuration
public class SecretsManagerConfig {

    @Value("${jwt.secret-arn}")
    private String jwtSecretArn;

    @Value("${AWS_REGION:us-east-2}")
    private String awsRegion;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Creates AWS Secrets Manager client
     */
    @Bean
    public SecretsManagerClient secretsManagerClient() {
        return SecretsManagerClient.builder()
                .region(Region.of(awsRegion))
                .build();
    }

    /**
     * Retrieves JWT secret from AWS Secrets Manager
     */
    @Bean(name = "jwtSecret")
    public String jwtSecret(SecretsManagerClient secretsManagerClient) {
        try {
            if (jwtSecretArn == null || jwtSecretArn.isEmpty()) {
                throw new IllegalStateException("JWT_SECRET_ARN environment variable is not set");
            }

            // Get secret from Secrets Manager using ARN
            GetSecretValueRequest request = GetSecretValueRequest.builder()
                    .secretId(jwtSecretArn)
                    .build();

            GetSecretValueResponse response = secretsManagerClient.getSecretValue(request);
            String secretString = response.secretString();

            // Parse JSON if secret is stored as JSON
            // Example: {"jwt_secret": "your-secret-value"}
            if (secretString.startsWith("{")) {
                JsonNode jsonNode = objectMapper.readTree(secretString);

                // Try common field names
                if (jsonNode.has("jwt_secret")) {
                    return jsonNode.get("jwt_secret").asText();
                } else if (jsonNode.has("secret")) {
                    return jsonNode.get("secret").asText();
                } else if (jsonNode.has("value")) {
                    return jsonNode.get("value").asText();
                } else {
                    // Return first field value
                    return jsonNode.fields().next().getValue().asText();
                }
            }

            // If it's a plain string, return as-is
            return secretString;

        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve JWT secret from Secrets Manager", e);
        }
    }
}
