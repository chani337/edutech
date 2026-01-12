package com.smhrd.project.cgiMysqlMapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CGIMysqlMapper {
	public void createUser(Map<String, Object> params);

	public void createSchemaForUser(Map<String, Object> params);

	public void grantPrivilegesToSchema(Map<String, Object> params);

}
