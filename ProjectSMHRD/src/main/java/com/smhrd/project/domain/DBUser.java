package com.smhrd.project.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Builder
@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="db")
@Table(name="db")
public class DBUser {
	@Id
	private String mem_email;
	private String db_type;
	private String db_user;
	private String db_pw;
	private String db_etc;
	private String db_makedate;
	private int pro_ctg_num; 
	private String db_location;
	private String class_code;
	
}
