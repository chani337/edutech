package com.smhrd.project.domain;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProFunction {
	private int pro_fun_num;
	private int pro_num;
	private String pro_fun;
}
