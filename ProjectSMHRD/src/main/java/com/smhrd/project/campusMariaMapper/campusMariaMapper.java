package com.smhrd.project.campusMariaMapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface campusMariaMapper {
	public void createUser(Map<String, Object> params);

	public void createSchemaForUser(Map<String, Object> params);

	public void grantPrivilegesToSchema(Map<String, Object> params);

}
