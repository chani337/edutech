package com.smhrd.project.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProjectList {
	
	private int pro_num;
	private String pro_name;
	private String pro_theme;
	private String pro_team;
	private String pro_prize;
	private String pro_type;
	private int pro_ctg_num;
	
	// 필터링
	private String ctg_num;
	private String ctg_num2;
	private String dtype_num;
	private String dtype_num2;
	
	
	private String pro_img;
	private String curri_name;



//	private String ctg_name;
//	private String ctg_name2;
//	private String dtype_name;
//	private String dtype_name2;
//	
	
	
	
}
