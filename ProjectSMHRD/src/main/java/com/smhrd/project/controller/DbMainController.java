package com.smhrd.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.smhrd.project.domain.DBUser;
import com.smhrd.project.domain.User;
import com.smhrd.project.mapper.UserMapper;
import com.smhrd.project.service.DbMainService;
import com.smhrd.project.service.UserService;

@RequestMapping("dbmain")
@RestController
@Qualifier("mainDataSource")
public class DbMainController {
	Gson gson = new Gson();
	@Autowired
	DbMainService service;
	@Autowired
	UserService serviceUser;

	@RequestMapping(value = "/userCheck", method = { RequestMethod.POST })
	public String userCheck(@RequestBody HashMap<String, String> map) {

		System.out.println("[DBController : userCheck]");
		System.out.println(map);
		JsonElement jsonElement = gson.toJsonTree(map);
		JsonObject jsonObject = jsonElement.getAsJsonObject();
		String userid = jsonObject.get("db_user").getAsString();

		String result = service.dbUserCheck(userid);

		// System.out.println(result);

		return result;
	}

	@RequestMapping(value = "/dbSignup", method = { RequestMethod.POST })
	public String dbSignup(@RequestBody HashMap<String, String> map) {

		System.out.println("[DBController : dbSignup]");
		System.out.println(map);
		JsonElement jsonElement = gson.toJsonTree(map);
		JsonObject jsonObject = jsonElement.getAsJsonObject();

		String mem_email = jsonObject.get("mem_email").getAsString();
		String mem_name = jsonObject.get("mem_name").getAsString();
		String db_type = jsonObject.get("db_type").getAsString();
		String db_user = jsonObject.get("db_user").getAsString();
		String db_pw = jsonObject.get("db_pw").getAsString();
		String db_etc = jsonObject.get("db_etc").getAsString();
		int pro_ctg_num = Integer.parseInt(jsonObject.get("pro_ctg_num").getAsString());
		String db_location = jsonObject.get("db_location").getAsString();
		String class_code = jsonObject.has("class_code") ? jsonObject.get("class_code").getAsString() : "";


		String result = service.dbRequest(new DBUser(mem_email, db_type, 
				db_user, db_pw, db_etc, null, pro_ctg_num, db_location, class_code));

		return result;
	}

	@RequestMapping(value = "/requestList", method = { RequestMethod.POST })
	public String requestList(@RequestBody HashMap<String, String> map) {

		System.out.println("[DBController : requestList22]");

		JsonElement jsonClsss = gson.toJsonTree(map);
		JsonObject jsonObject = jsonClsss.getAsJsonObject();
		String class_code = jsonObject.has("class_code") && jsonObject.get("class_code") != null 
				? jsonObject.get("class_code").getAsString() : null;
		String mem_level = jsonObject.get("mem_level").getAsString();

		JsonArray requestArr = new JsonArray();
		
		List<DBUser> requestList = service.dbRequestList(mem_level,class_code);
		//1. 마스터 또는 관리자 -> DB요청 전체
		if(mem_level.equals("마스터") || mem_level.equals("관리자")) {
			
		
		for (int i = 0; i < requestList.size(); i++) {
			//담임명,과정명 가져오기
			DBUser requestUser = requestList.get(i);
			Map<String, Object> info = service.getDbRequestUser(requestUser.getMem_email());	

			JsonObject classJO = new JsonObject();
			if(info != null) {
				JsonElement jsonElement = gson.toJsonTree(info);
				classJO = jsonElement.getAsJsonObject();
			}
			// 과정명,담임명 ,프로젝트종류, DB종류,DB위치, DB계정, DB비번, (신청자)

			int pro_ctg_num = requestUser.getPro_ctg_num();
			String pro_type = "";
			// 0- 미니 , 1 -핵심, 2- 실전
			if (pro_ctg_num == 1) {
				pro_type = "미니";
			} else if (pro_ctg_num == 2) {
				pro_type = "핵심";
			} else if (pro_ctg_num == 3) {
				pro_type = "실전";
			}
			classJO.addProperty("pro_ctg", pro_type);
			classJO.addProperty("db_type", requestUser.getDb_type());
			classJO.addProperty("db_location", requestUser.getDb_location());
			classJO.addProperty("db_user", requestUser.getDb_user());
			classJO.addProperty("db_pw", requestUser.getDb_pw());

			// 신청자명 가져오기
			String req_user = service.getUserName(requestList.get(i).getMem_email());
			classJO.addProperty("req_user", req_user);
			requestArr.add(classJO);
		}
		}
		//2. 관리자 -> 해당하는 반 요청
		else {
			String curiName = service.getCuriName(class_code);
			
			for (int i = 0; i < requestList.size(); i++) {
				DBUser requestUser = requestList.get(i);
				JsonObject classJO = new JsonObject();
				
				int pro_ctg_num = requestUser.getPro_ctg_num();
				String pro_type = "";
				// 0- 미니 , 1 -핵심, 2- 실전
				if (pro_ctg_num == 1) {
					pro_type = "미니";
				} else if (pro_ctg_num == 2) {
					pro_type = "핵심";
				} else if (pro_ctg_num == 3) {
					pro_type = "실전";
				}
				classJO.addProperty("pro_ctg", pro_type);
				classJO.addProperty("db_type", requestUser.getDb_type());
				classJO.addProperty("db_location", requestUser.getDb_location());
				classJO.addProperty("db_user", requestUser.getDb_user());
				classJO.addProperty("db_pw", requestUser.getDb_pw());
				classJO.addProperty("curri_name", curiName);
				
				String req_user = service.getUserName(requestList.get(i).getMem_email());
				classJO.addProperty("req_user", req_user);
				requestArr.add(classJO);
				
			}
		}
		

		return requestArr.toString();
	}

	@RequestMapping(value = "/updateDbRequest", method = { RequestMethod.POST })
	public void updateDbRequest(@RequestBody HashMap<String, String> map) {

		System.out.println("[DBController : updateDbRequest]");
		JsonElement json = gson.toJsonTree(map);

		// map to Json
		JsonElement jsonElement = gson.toJsonTree(map);
		JsonObject jsonObject = jsonElement.getAsJsonObject();

		// JsonOject to String
		String reqId = jsonObject.get("reqId").getAsString();
		String reqPw = jsonObject.get("reqPw").getAsString();

		service.updateDBrequestUser(reqId, reqPw);

		// System.out.println(result);
	}

	@RequestMapping(value = "/list", method = { RequestMethod.GET })
	public String list() {

		System.out.println("[DBController : DbOkUser]");

		List<DBUser> dbOkList = service.dbOkList();

		JsonArray okArr = new JsonArray();

		for (int i = 0; i < dbOkList.size(); i++) {
			DBUser dbOkUser = dbOkList.get(i);
			Map<String, Object> info = service.getDbRequestUser(dbOkUser.getMem_email());
			JsonObject classJO = new JsonObject();
			if (info != null) {
				JsonElement jsonElement = gson.toJsonTree(info);
				classJO = jsonElement.getAsJsonObject();
			}
			int pro_ctg_num = dbOkUser.getPro_ctg_num();
			String pro_type = "";
			// 0- 미니 , 1 -핵심, 2- 실전
			if (pro_ctg_num == 1) {
				pro_type = "미니";
			} else if (pro_ctg_num == 2) {
				pro_type = "핵심";
			} else if (pro_ctg_num == 3) {
				pro_type = "실전";
			}
			classJO.addProperty("pro_ctg", pro_type);
			classJO.addProperty("db_type", dbOkUser.getDb_type());
			classJO.addProperty("db_user", dbOkUser.getDb_user());
			classJO.addProperty("db_pw", dbOkUser.getDb_pw());
			String req_user = service.getUserName(dbOkUser.getMem_email());
			classJO.addProperty("req_user", req_user);
			okArr.add(classJO);
		}
		// System.out.println(result);

		return okArr.toString();
	}
	

}
