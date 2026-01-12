package com.smhrd.project.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Getter
@AllArgsConstructor

public class ProBasic {
	@Id // PK
	// private int pro_num;
	private String pro_name;
	private String pro_theme;
	private String pro_team;
	private String pro_prize;
	private String pro_type;
	private String pro_nutshell;
	// private String co_email;
//	private int ctg_num;
//	private int ctg_num2;
//	private int dtype_num;
//	private int dtype_num2;
	private String mem1; // 팀장
//	private String mem2;
//	private String mem3;
//	private String mem4;
//	private String mem5;
//	private String mem6;
	private String db_num;
//	private int pro_ctg_num;

	
	


}
