package com.smhrd.project.campusOracleMapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface campusOracleMapper {

	
	public void createUser(Map<String, Object> params);

	public void grantPrivileges(Map<String, Object> params);

	
	
}
