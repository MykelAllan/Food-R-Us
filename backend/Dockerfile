FROM maven:3.2.7-openjdk-17 AS build
COPY . .
RUN MVN clean package -DskipTests

FROM maven:3.8.1-openjdk-17-slim
COPY --from=build /target/backend-0.0.1-SNAPSHOT.jar backend.jar
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "backend.jar"]