package com.smhrd.project.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smhrd.project.domain.DBUser;
import com.smhrd.project.domain.User;
import com.smhrd.project.mapper.DataBaseMainMapper;
import com.smhrd.project.repo.DBUserRepo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Qualifier("mainDataSource")
@MapperScan("com.smhrd.project.mapper")
public class DbMainService {

	@Autowired
	DataBaseMainMapper mapper;
	
	@Autowired
	DBUserRepo repo;

	@Transactional(transactionManager = "mainTransactionManager")
	public String dbUserCheck(String userId) {

		Map<String, Object> params = new HashMap<>();
		params.put("userId", userId);

		int cnt = mapper.userCheck(params);

		String result ="";
		if(cnt == 0) {
			result = "success";
		}
		else {
			result = "Fails";
		}

		return result;
	}
	
	@Transactional(transactionManager = "mainTransactionManager")
	public String dbRequest(DBUser requestUser) {

		Map<String, Object> params = new HashMap<>();
		params.put("requestUser", requestUser);

		int cnt =mapper.reqeustUserInsert(requestUser);

		//System.out.println("DB:SINGUP  "+cnt);
		
		String result ="";
		if(cnt == 0) {
			result = "Fails";
		}
		else {
			result = "success";
		}

		return result;
	}
	
	@Transactional(transactionManager = "mainTransactionManager")
	public List<DBUser> dbRequestList(String mem_level,String clas_code) {
		
		List<DBUser> requestList = null;
		
		if(mem_level.equals("마스터")) {
			requestList = mapper.requestDbList();
		}
		else if(clas_code != null && !clas_code.trim().isEmpty()) {
			Map<String, Object> params = new HashMap<>();
			params.put("class_code", clas_code);
			requestList= mapper.requestDbListTeacher(params);
		}
		else {
			// class_code가 없는 경우 빈 리스트 반환
			requestList = new ArrayList<>();
		}
		

		return requestList;
	}
	
	@Transactional(transactionManager = "mainTransactionManager")
	public List<DBUser> dbOkList() {

		List<DBUser> dbOkList = mapper.getDbOkList();

		return dbOkList;
	}
	
	
	@Transactional(transactionManager = "mainTransactionManager")
	public Map<String, Object> getDbRequestUser(String email) {

		Map<String, Object> params = new HashMap<>();
  		params.put("mem_email", email);
  		
  		Map<String, Object> info = mapper.getClasTeacherCode(params);
		
		
		return info;
	}
	
	@Transactional(transactionManager = "mainTransactionManager")
	public String getCuriName(String class_code) {


		Map<String, Object> params = new HashMap<>();
  		params.put("class_code", class_code);
  		
		String curiName =  mapper.getCuriName(params);
		
		return curiName;
	}
	
	@Transactional(transactionManager = "mainTransactionManager")
	public String getUserName(String email) {


		Map<String, Object> params = new HashMap<>();
  		params.put("mem_email", email);
		String userName =  mapper.getUserName(params);
		
		
		return userName;
	}
	
	
	@Transactional(transactionManager = "mainTransactionManager")
	public void updateDBrequestUser(String db_user, String db_pw) {


		Map<String, Object> params = new HashMap<>();
		System.out.println("Test ID : "+db_user);
		System.out.println("Test PW : "+db_pw);
		
  		params.put("db_user", db_user);
  		params.put("db_pw", db_pw);
		mapper.updateDBrequest(params);
		
	}
	
	
}

@Data
@AllArgsConstructor
class classTeacherCode{
	String class_name;
	String teacherName;
}

@Data
@AllArgsConstructor
class DbOkUser{
	String class_name;
	String teacherName;
	String pro_type;
	String db_type;
	String db_user;
	String db_pw;
	String requestName;
	
}
