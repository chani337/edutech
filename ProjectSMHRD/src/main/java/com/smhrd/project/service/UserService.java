package com.smhrd.project.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManagerFactory;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.smhrd.project.domain.DBUser;
import com.smhrd.project.domain.User;
import com.smhrd.project.mapper.UserMapper;
import com.smhrd.project.repo.ClassRepo;
import com.smhrd.project.repo.UserRepo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service

@Qualifier("mainDataSource")
public class UserService {
	
	@Autowired
	UserMapper mapper;
	
	@Autowired
	ClassRepo classrepo;
	
	@Autowired
	UserRepo urepo;

	Gson gson = new Gson();
	
	
    @Transactional(transactionManager = "mainTransactionManager")
	public int delete(String mem_email) {
		
		Optional<User> loginUser = urepo.findById(mem_email);
		loginUser.ifPresent(selctUser ->{
			urepo.delete(selctUser);
		});
		
		return 1;
	}
    @Transactional(transactionManager = "mainTransactionManager")
	public int permissionUpdate(String mem_email, String mem_level) {		
	
		mapper.permissionUpdate(new User(mem_email, mem_level));
		return 1;
	}
	
    @Transactional(transactionManager = "mainTransactionManager")
	public List<User> userList(){
		
		List<User> allUser = urepo.findAll();
		
		return allUser;
	}
	
    @Transactional(transactionManager = "mainTransactionManager")
	public String classes(){
		
		List<Map<String, Object>> classList = mapper.getClasses();
		
		JsonArray classJOArr = new JsonArray();
		
		System.out.println("size : "+classJOArr.size());
		
		for(int i=0;i<classList.size();i++){
			
			JsonElement jsonElement = gson.toJsonTree(classList.get(i));
			JsonObject classJO = jsonElement.getAsJsonObject();
			classJOArr.add(classJO);
			
		}
		
		
		return classJOArr.toString();
	}
	
    @Transactional(transactionManager = "mainTransactionManager")
	public int join(User user) {
	
		if(user.getMem_level().equals("마스터")) {
			user.setMem_level("마스터");
			//user.setClass_code(null);
		}else if(user.getMem_level().equals("일반")) {
			user.setMem_level("일반");
			//user.setClass_code(null);
		}else {
			user.setMem_level("학생");
		}
		
		System.out.println("Test  : "+user.getMem_email());
		System.out.println(urepo.findById(user.getMem_email()));
		System.out.println("!");
		
		if(urepo.findById(user.getMem_email()).isPresent()) {
			return 0;
		}else {
			User joinUser = User.builder().mem_email(user.getMem_email()).mem_name(user.getMem_name()).mem_level(user.getMem_level()).class_code(user.getClass_code()).build();
			urepo.save(joinUser);

			return 1;
		}

	}
	
    @Transactional(transactionManager = "mainTransactionManager")
	public Optional<User> login(String mem_email) {

		Optional<User> loginUser = urepo.findById(mem_email);
		
		return loginUser;
	}
    
    //학생이 신청했을때 학생의 과정, 담임명 가져오는 부분
  	@Transactional(transactionManager = "mainTransactionManager")
  	public User dbGetUserInfo(String mem_email) {

  		Map<String, Object> params = new HashMap<>();
  		params.put("mem_email", mem_email);

  		User getInfo =mapper.getUserInfo(params);


  		return getInfo;
  	}
	
	
}