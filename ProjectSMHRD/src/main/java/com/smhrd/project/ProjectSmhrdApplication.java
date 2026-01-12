package com.smhrd.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.smhrd.project")
//@ComponentScan(basePackages = "com.smhrd.project.config")
public class ProjectSmhrdApplication {

	public static void main(String[] args) {
		//SpringApplication 실행
		SpringApplication.run(ProjectSmhrdApplication.class, args);
	}

}
