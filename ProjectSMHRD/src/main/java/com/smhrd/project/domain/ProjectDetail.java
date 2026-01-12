package com.smhrd.project.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProjectDetail {

	private ProBasic pro_basic;
	private String docu_plan; // 기획서 경로
	private ProClass pro_class; // 과정명
	private List<ProFunction> pro_funList; // 기능
	private List<ProDetail> pro_detailList;
	private List<ProIot> pro_iotList;
	private List<ProDanaly> pro_danalyList;
}
