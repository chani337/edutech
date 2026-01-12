package com.smhrd.project.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Builder
@Data
@Getter
@AllArgsConstructor
@RequiredArgsConstructor 
@Entity(name="member")
@Table(name="member")
public class User {

	@Id 
	private String mem_email;
	
	@NotNull
	private String mem_name;
	
	private String mem_level;	
	
	@NotNull
	private String class_code;
	
	public User(String mem_email, String mem_level ) {
		this.mem_email = mem_email;
		this.mem_level = mem_level;
	}
	
	
}
