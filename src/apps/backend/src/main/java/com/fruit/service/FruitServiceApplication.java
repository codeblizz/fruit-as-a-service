package com.fruit.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableCaching
@EnableJpaAuditing
@ComponentScan(basePackages = {"com.fruit.service", "com.fruit.service.gateway.emailServiceGateway"})
public class FruitServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FruitServiceApplication.class, args);
	}

}
