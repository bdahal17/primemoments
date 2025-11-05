package com.planner.backend.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import liquibase.integration.spring.SpringLiquibase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

import javax.sql.DataSource;

/**
 * Secure Database Configuration
 * Retrieves all database credentials from AWS Secrets Manager
 */
@Configuration
public class DBConfig {

    private static final Logger logger = LoggerFactory.getLogger(DBConfig.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${DB_SECRET_ARN}")
    private String dbSecretArn;

    @Value("${AWS_REGION:us-east-2}")
    private String awsRegion;

    @Bean
    @Primary
    public DataSource dataSource() {
        DatabaseCredentials credentials = getDatabaseCredentials();

        HikariConfig config = new HikariConfig();

        // JDBC URL
        String jdbcUrl = String.format("jdbc:postgresql://%s:%s/%s",
                credentials.host, credentials.port, credentials.dbname);
        config.setJdbcUrl(jdbcUrl);

        logger.info("Connecting to database: {}:{}/{}", credentials.host, credentials.port, credentials.dbname);

        // Credentials
        config.setUsername(credentials.username);
        config.setPassword(credentials.password);

        // Driver
        config.setDriverClassName("org.postgresql.Driver");

        // Connection Pool Settings
        config.setMaximumPoolSize(5);
        config.setMinimumIdle(1);
        config.setConnectionTimeout(15000); // 30 seconds
        config.setIdleTimeout(300000); // 10 minutes
        config.setMaxLifetime(900000); // 30 minutes
        config.setLeakDetectionThreshold(30000); // 1 minute

        // Performance Settings
        config.setAutoCommit(true);
        config.setConnectionTestQuery("SELECT 1");

        // Connection Properties for PostgreSQL
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        config.addDataSourceProperty("useServerPrepStmts", "true");

        // SSL Configuration for RDS
        config.addDataSourceProperty("ssl", "true");
        config.addDataSourceProperty("sslmode", "require");

        // Pool name
        config.setPoolName("PrimeMomentsHikariPool");

        logger.info("✅ Database connection pool initialized successfully");

        return new HikariDataSource(config);
    }

    /**
     * Retrieves database credentials from Secrets Manager or falls back to env vars
     */
    private DatabaseCredentials getDatabaseCredentials() {
        // If DB_SECRET_ARN is provided, retrieve from Secrets Manager
        if (dbSecretArn != null && !dbSecretArn.isEmpty()) {
            logger.info("🔐 Retrieving database credentials from Secrets Manager");
            try {
                return getCredentialsFromSecretsManager();
            } catch (Exception e) {
                logger.error("❌ Failed to retrieve credentials from Secrets Manager", e);
                throw new RuntimeException("Failed to retrieve database credentials", e);
            }
        }
        return null;
    }

    /**
     * Retrieves credentials from AWS Secrets Manager
     */
    private DatabaseCredentials getCredentialsFromSecretsManager() {
        try (SecretsManagerClient client = SecretsManagerClient.builder()
                .region(Region.of(awsRegion))
                .build()) {

            GetSecretValueRequest request = GetSecretValueRequest.builder()
                    .secretId(dbSecretArn)
                    .build();

            GetSecretValueResponse response = client.getSecretValue(request);
            String secretString = response.secretString();

            // Parse JSON secret
            JsonNode jsonNode = objectMapper.readTree(secretString);

            DatabaseCredentials creds = new DatabaseCredentials();
            creds.host = jsonNode.get("host").asText();
            creds.port = jsonNode.has("port") ? jsonNode.get("port").asText() : "5432";
            creds.dbname = jsonNode.get("dbname").asText();
            creds.username = jsonNode.get("username").asText();
            creds.password = jsonNode.get("password").asText();

            logger.info("✅ Successfully retrieved database credentials from Secrets Manager");
            return creds;

        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve credentials from Secrets Manager: " + dbSecretArn, e);
        }
    }

    /**
     * Inner class to hold database credentials
     */
    private static class DatabaseCredentials {
        String host;
        String port;
        String dbname;
        String username;
        String password;
    }

    @Bean
    public SpringLiquibase liquibase(DataSource dataSource) {
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setDataSource(dataSource);
        liquibase.setChangeLog("classpath:db/changelog/changelog-master.yml");
        liquibase.setDropFirst(false);  // Set to true to drop all tables first (dangerous!)
        liquibase.setDefaultSchema("public");
        liquibase.setShouldRun(true);

        return liquibase;
    }
}
