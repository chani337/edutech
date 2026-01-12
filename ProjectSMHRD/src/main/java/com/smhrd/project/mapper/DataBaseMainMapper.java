package com.smhrd.project.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.project.domain.DBUser;

@Mapper
public interface DataBaseMainMapper {

	public int userCheck(Map<String, Object> params);

	public int reqeustUserInsert(DBUser user);

	public Map<String, Object> getClasTeacherCode(Map<String, Object> params);

	public String getUserName(Map<String, Object> params);

	public String getCuriName(Map<String, Object> params);

	public List<DBUser> requestDbList();

	public List<DBUser> requestDbListTeacher(Map<String, Object> params);

	public void updateDBrequest(Map<String, Object> params);

	public List<DBUser> getDbOkList();

}
