package com.smhrd.project.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class ProDetail {
	private int pro_detail_num;
	private int pro_num;
	private String pro_detail_type;
	private String pro_detail_url;
	private int pro_detail_contnum;
}
