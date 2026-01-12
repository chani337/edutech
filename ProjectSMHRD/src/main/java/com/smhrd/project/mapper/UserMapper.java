package com.smhrd.project.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


import com.smhrd.project.domain.User;

@Mapper
public interface UserMapper {

	public int join(Map<String, Object> params);
	
	public User login(String mem_email);
	
	public User users();
	
	public void permissionUpdate(User user);
	
	public User getUserInfo(Map<String, Object> params);
	
	public List<Map<String, Object>> getClasses();

}
