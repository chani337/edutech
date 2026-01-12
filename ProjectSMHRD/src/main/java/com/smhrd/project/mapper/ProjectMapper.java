package com.smhrd.project.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Qualifier;

import com.smhrd.project.domain.ProBasic;
import com.smhrd.project.domain.ProClass;
import com.smhrd.project.domain.ProDanaly;
import com.smhrd.project.domain.ProDetail;
import com.smhrd.project.domain.ProFunction;
import com.smhrd.project.domain.ProIot;
import com.smhrd.project.domain.ProjectList;

@Mapper
@Qualifier("mainDataSource")
public interface ProjectMapper {

	public List<ProjectList> projectList();
	// 정형 필터링용 추가
	public List<ProjectList> projectListType(Map<String, Object> map);
	// 정형 키워드용 추가
	public List<ProjectList> projectListKeyword(String keyword);
	
	public String projectImg(int pro_num);
	public ProClass pro_class(int pro_num);
	public ProBasic pro_basic(int pro_num);
	public List<ProFunction> pro_fun(int pro_num);
	public List<ProDetail> pro_detail(int pro_num);
	public List<ProIot> pro_iot(int pro_num);
	public List<ProDanaly> pro_danaly(int pro_num);
	public String docu_plan(int pro_num);
	
	public String getProjectCnt();
	
	
}
