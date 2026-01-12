package com.smhrd.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.smhrd.project.domain.Tch;
import com.smhrd.project.mapper.TchMapper;
import com.smhrd.project.repo.TchRepo;
import com.smhrd.project.repo.UserRepo;

@Service
//@Qualifier("mainDataSource")
public class TchService {
	@Autowired
	TchMapper mapper;
	
	
//	@Qualifier("mainDataSource")
	@Autowired
	TchRepo tchrepo;
	

	public int tchInsert(Tch tch) {
		tchrepo.save(tch);
		return 1;
	}
	
	public String[] tchSelect(String tch_num ) {
		//tchrepo.findAll ();
		Map<String, Object> params = new HashMap<>();
  		params.put("tch_num", Integer.parseInt(tch_num));
		
		//List<Tch> tchList= tchrepo.findBy();
		Tch tch = mapper.firstTch(params);
		String markDown = tch.getTch_markdown();
		String tchZipUrl = tch.getTch_url();
		
		String result[] = {markDown,tchZipUrl};
		return result;
	}
	public List<Tch> tchName(){
		List<Tch>  tchNameList = mapper.tchNameList();
		
		return tchNameList;
	}
}
