package com.humber.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class backendApplication {

	public static void main(String[] args) {
		SpringApplication.run(backendApplication.class, args);
	}

}
