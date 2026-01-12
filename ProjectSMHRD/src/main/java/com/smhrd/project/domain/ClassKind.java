package com.smhrd.project.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



import lombok.Data;

@Data
@Entity
@Table(name="class_")
public class ClassKind {
	@Id
	private String class_code;
	private String host_code;
	@Column(name="curri_code", insertable=false, updatable=false)
	private String curri_code;
	private int curri_cnt;
	private String class_start;
	private String class_end;
	
	@ManyToOne
	@JoinColumn(name="curri_code")
	private Curri curri;
}
