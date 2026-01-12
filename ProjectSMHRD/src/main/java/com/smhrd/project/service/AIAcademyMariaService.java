//package com.smhrd.project.service;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.mybatis.spring.annotation.MapperScan;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.stereotype.Service;
//
//import com.smhrd.project.aiAcademyMariaMapper.AIAcademyMariaMapper;
//
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@Service
//@Qualifier("aiAcademyMariaDataSource")
//@MapperScan("com.smhrd.project.aiAcademyMariaMapper")
//public class AIAcademyMariaService {
//	@Autowired
//	AIAcademyMariaMapper mapper;
//
//	public boolean createAIAcademyMariaDb(String getReqId, String getReqPw) {
//
//		Map<String, Object> params = new HashMap<>();
//		params.put("username", getReqId);
//		params.put("password", getReqPw);
//
//		try {
//			mapper.createUser(params);
//			mapper.createSchemaForUser(params);
//			mapper.grantPrivilegesToSchema(params);
//			return true;
//		} catch (Exception e) {
//			System.out.println("Error creating Mysql DB : " + e.getMessage());
//			return false;
//		}
//	}
//}
