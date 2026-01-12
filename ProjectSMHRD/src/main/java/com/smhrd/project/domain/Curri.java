package com.smhrd.project.domain;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;

import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name="curriculum")
public class Curri {
	
	@Id
	private String curri_code;
	private String curri_name;
	
}
