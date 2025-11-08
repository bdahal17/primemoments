FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy your Spring Boot JAR
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENV SERVER_PORT=8080
# Add logging configuration
ENV LOGGING_FILE_PATH=/var/log/spring-boot
ENV LOGGING_FILE_NAME=/var/log/spring-boot/application.log
ENV LOGGING_LEVEL_ROOT=INFO

ENTRYPOINT ["sh", "-c", "mkdir -p /var/log/spring-boot && java -Xms256m -Xmx512m -Dserver.port=${PORT:-$SERVER_PORT} -Dlogging.file.path=${LOGGING_FILE_PATH} -Dlogging.file.name=${LOGGING_FILE_NAME} -Dlogging.level.root=INFO -jar /app/app.jar"]
