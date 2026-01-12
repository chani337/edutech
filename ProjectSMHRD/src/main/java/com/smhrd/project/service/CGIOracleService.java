package com.smhrd.project.service;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smhrd.project.cgiOracleMapper.CGIOracleMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Qualifier("cgiOracleDataSource")
@MapperScan("com.smhrd.project.cgiOracleMapper")
public class CGIOracleService {
	@Autowired
	CGIOracleMapper mapper;

	@Transactional(transactionManager = "cgiOracleTransactionManager")
	public boolean createCgiOracleDb(String getReqId, String getReqPw) {
		Map<String, Object> params = new HashMap<>();
		params.put("username", getReqId);
		params.put("password", getReqPw);

		// 230925 try문 간소화
		try {
			mapper.createUser(params);
			mapper.grantPrivileges(params);
			return true;
		} catch (Exception e) {
			System.out.println("Error creating Oracle DB: " + e.getMessage());
			return false;
		}
	}
}
