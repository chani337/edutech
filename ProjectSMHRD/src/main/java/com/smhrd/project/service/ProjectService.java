package com.smhrd.project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smhrd.project.mapper.ProjectMapper;
import com.smhrd.project.mapper.UserMapper;
import com.smhrd.project.domain.ProBasic;
import com.smhrd.project.domain.ProClass;
import com.smhrd.project.domain.ProDanaly;
import com.smhrd.project.domain.ProDetail;
import com.smhrd.project.domain.ProFunction;
import com.smhrd.project.domain.ProIot;
import com.smhrd.project.domain.ProjectList;
import com.smhrd.project.domain.User;

@Service
@MapperScan("com.smhrd.project.mapper")
@Qualifier("mainDataSource")
public class ProjectService {
	
	@Autowired
	ProjectMapper mapper;
	
	@Transactional(transactionManager = "mainTransactionManager")
	public int getProjectCnt() {
		
		int result =Integer.parseInt(mapper.getProjectCnt());
		
		return result;
	}
	
    @Transactional(transactionManager = "mainTransactionManager")
	public List<ProjectList> projectList() {
		return mapper.projectList();
	}
	
	// 정형 필터링용 추가
    @Transactional(transactionManager = "mainTransactionManager")
	public List<ProjectList> projectListType(Map<String, Object> map) {
		System.out.println("넘어온데이터"+map.get("col"));
		System.out.println("넘어온데이터"+map.get("pro_val"));
		return mapper.projectListType(map);
	}
	
	// 정형 키워드용 추가
    @Transactional(transactionManager = "mainTransactionManager")
	public List<ProjectList> projectListKeyword(String keyword) {
		return mapper.projectListKeyword(keyword);
	}
	
    @Transactional(transactionManager = "mainTransactionManager")
	public String projectImg(int pro_num){
		return mapper.projectImg(pro_num);
	}
    @Transactional(transactionManager = "mainTransactionManager")
	public ProBasic pro_basic(int pro_num) {
		return mapper.pro_basic(pro_num);
	}
    @Transactional(transactionManager = "mainTransactionManager")
	public List<ProFunction> pro_fun(int pro_num) {
		return mapper.pro_fun(pro_num);
	}
    @Transactional(transactionManager = "mainTransactionManager")
	public List<ProDetail> pro_detail(int pro_num){
		return mapper.pro_detail(pro_num);
	}
    @Transactional(transactionManager = "mainTransactionManager")
	public List<ProIot> pro_iot(int pro_num){
		return mapper.pro_iot(pro_num);
	}
    @Transactional(transactionManager = "mainTransactionManager")
	public List<ProDanaly> pro_danaly(int pro_num){
		return mapper.pro_danaly(pro_num);
	}
    @Transactional(transactionManager = "mainTransactionManager")
	public ProClass pro_class(int pro_num) {
		return mapper.pro_class(pro_num);
	}
    @Transactional(transactionManager = "mainTransactionManager")
	public String docu_plan(int pro_num) {
		return mapper.docu_plan(pro_num);
	}

	
}
