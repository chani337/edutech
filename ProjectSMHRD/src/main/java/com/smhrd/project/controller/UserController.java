package com.smhrd.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.smhrd.project.domain.ProjectList;
import com.smhrd.project.domain.User;
import com.smhrd.project.service.UserService;

@RequestMapping("user")
@RestController
@Qualifier("mainDataSource")
public class UserController {

	 @Autowired
	private  UserService service;
	
//	@Autowired
//	public UserController(UserService service) {
//		this.service=service;
//	}

	Gson gson = new Gson();
	
	
	
	//회원 삭제
	@RequestMapping(value = "/delete", method = { RequestMethod.POST })
	public String delete(@RequestBody HashMap<String, Object> map) {
		System.out.println("[permission-update : permission-update]");

		
		// map to Json
		JsonElement jsonElement = gson.toJsonTree(map);
		JsonObject jsonObject = jsonElement.getAsJsonObject();
		System.out.println(jsonObject);
		
		
		JsonArray emailList = jsonObject.get("email").getAsJsonArray();
		
		System.out.println(emailList);
		
		int result = 0;
		
		for(int i=0;i<emailList.size();i++) {
			result+=service.delete(emailList.get(i).getAsString());
		}
	
		return result+"";
	}
	
	//회원정보 업데이트
	@RequestMapping(value = "/permission-update", method = { RequestMethod.POST })
	public String permissionUpdate(@RequestBody HashMap<String, Object> map) {
		System.out.println("[permission-update : permission-update]");

		
		// map to Json
		JsonElement jsonElement = gson.toJsonTree(map);
		JsonObject jsonObject = jsonElement.getAsJsonObject();
		System.out.println(jsonObject);
		
		String newPermission = jsonObject.get("newPermission").getAsString();
		JsonArray emailList = jsonObject.get("email").getAsJsonArray();
		
		System.out.println(emailList);
		
		int result = 0;
		
		for(int i=0;i<emailList.size();i++) {
			result+=service.permissionUpdate(emailList.get(i).getAsString(),newPermission);
		}
		//System.out.println(emailList);
		
		// class코드, 과정이름, 과정회차 가지고 오기
		//List<User> usersList = service.users();		
		//String proJson = gson.toJson(usersList);

		return result+"";
	}


	// 과정정보불러오기(회원가입 select 용도)
	@RequestMapping(value = "/userList", method = { RequestMethod.GET })
	public String userList() {
		System.out.println("[users : AllUser]");

		// class코드, 과정이름, 과정회차 가지고 오기
		List<User> usersList = service.userList();
		System.out.println("[userList: "+usersList);
		
		String proJson = gson.toJson(usersList);

		return proJson;
	}

//	// 과정정보불러오기(회원가입 select 용도)
	@RequestMapping(value = "/classes", method = { RequestMethod.GET })
	public String classes() {
		System.out.println("[UserController : classes]");

		// class코드, 과정이름, 과정회차 가지고 오기
		String classListArr = service.classes();

		return classListArr.toString();
	}

	// 회원가입
	@RequestMapping(value = "/signup", method = { RequestMethod.POST })
	public String join(@RequestBody HashMap<String, Object> map) {
		System.out.println("[UserController : join]");

		// map to Json
		JsonElement jsonElement = gson.toJsonTree(map);
		JsonObject jsonObject = jsonElement.getAsJsonObject();

		// JsonOject to String
		String mem_email = jsonObject.get("mem_email").getAsString();
		String mem_name = jsonObject.get("mem_name").getAsString();
		String class_code = jsonObject.get("class_code").getAsString();

		int joinCheck = service.join(new User(mem_email, mem_name, "일반", class_code));

		if (joinCheck == 1) {
			return "joinSuccess";
		} else {
			return "joinFail";
		}

	}

	// 로그인
	@RequestMapping(value = "/login", method = { RequestMethod.POST })
	public String login(@RequestBody HashMap<String, Object> map) {
		System.out.println("[UserController : login]");

		// map to Json
		JsonElement jsonElement = gson.toJsonTree(map);
		JsonObject jsonObject = jsonElement.getAsJsonObject();

		// JsonOject to String
		String mem_email = jsonObject.get("mem_email").getAsString();
		System.out.println(mem_email);
		String userJson = "";
		try {
			Optional<User> loginUser = service.login(mem_email);

			System.out.println("test : " + loginUser);

			User user = new User(loginUser.get().getMem_email(), loginUser.get().getMem_name(),
					loginUser.get().getMem_level(), loginUser.get().getClass_code());

			userJson = gson.toJson(user);
		} catch (Exception e) {
			System.out.println("이리왔구만");
			userJson = "{\"mem_name\":\"NoUser\"}";
		}

		return userJson;
	}

}
