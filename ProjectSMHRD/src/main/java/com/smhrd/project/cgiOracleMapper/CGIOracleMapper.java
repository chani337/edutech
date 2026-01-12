package com.smhrd.project.cgiOracleMapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CGIOracleMapper {
	public void createUser(Map<String, Object> params);

	public void grantPrivileges(Map<String, Object> params);
}

