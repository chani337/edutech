package com.smhrd.project.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProDanaly {
	private int pro_danaly_num;
	private int pro_num;
	private String pro_danaly_name;
	private String pro_danaly_data;
	private String pro_danaly_datasource;
	private String pro_danaly_getdata;
	private String pro_danaly_data_url;
	private String pro_danaly_data_proccess;
	private String pro_danaly_model_goal;
	private String pro_danaly_model_algo;
	private String pro_danaly_modeling;
	private String pro_danaly_verifi;
	private String pro_danaly_evalu;
	private String pro_danaly_con1;
	private String pro_danaly_con2;
}
