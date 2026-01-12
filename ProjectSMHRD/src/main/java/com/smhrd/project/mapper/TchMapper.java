package com.smhrd.project.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.project.domain.Tch;

@Mapper
public interface TchMapper {
	 public List<Tch> tchNameList();
	 public Tch firstTch( Map<String, Object> params);
}
