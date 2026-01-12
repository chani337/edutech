package com.smhrd.project.domain;



import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="technology")
@Table(name="technology")
public class Tch {
	
	private int tch_num;
	private String tch_type;
	
	@Id
	private String tch_name;
	
	private String tch_markdown;
	private String tch_url;
	
	public Tch(String tch_type, String tch_name, String tch_markdown, String tch_url) {
		super();
		this.tch_type = tch_type;
		this.tch_name = tch_name;
		this.tch_markdown = tch_markdown;
		this.tch_url = tch_url;
	}
	
	
	
}


