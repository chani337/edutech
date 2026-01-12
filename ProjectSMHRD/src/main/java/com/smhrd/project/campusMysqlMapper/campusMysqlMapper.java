package com.smhrd.project.campusMysqlMapper;

import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface campusMysqlMapper {
	public void createUser(Map<String, Object> params);

	public void createSchemaForUser(Map<String, Object> params);

	public void grantPrivilegesToSchema(Map<String, Object> params);

}
