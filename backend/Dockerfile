# backend/Dockerfile
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy your Spring Boot JAR
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

# Tell Docker what port your app listens on
EXPOSE 8080

# (Optional) allow platforms like Beanstalk or Cloud Run to override port
ENV SERVER_PORT=8080

ENTRYPOINT ["sh", "-c", "java -Xms256m -Xmx512m -Dserver.port=${PORT:-$SERVER_PORT} -jar /app/app.jar"]

