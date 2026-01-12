package com.smhrd.project.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.lang.Nullable;
import org.springframework.validation.annotation.Validated;

import com.google.gson.Gson;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import com.google.gson.reflect.TypeToken;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smhrd.project.service.ProjectService;
import com.smhrd.project.service.UserService;
import com.smhrd.project.domain.Keyword;
import com.smhrd.project.domain.ProBasic;
import com.smhrd.project.domain.ProClass;
import com.smhrd.project.domain.ProDanaly;
import com.smhrd.project.domain.ProDetail;
import com.smhrd.project.domain.ProFunction;
import com.smhrd.project.domain.ProIot;
import com.smhrd.project.domain.ProjectDetail;
import com.smhrd.project.domain.ProjectList;
import com.smhrd.project.domain.User;

@RequestMapping("project")
@RestController
@ComponentScan(basePackages = "com.smhrd.project.service")
@Qualifier("mainDataSource")
public class ProjectController {
	@Autowired
	ProjectService service;

	Gson gson = new Gson();

	@RequestMapping("/projectCnt")
	public String projectCnt(@RequestBody @Nullable Keyword keyword) {
		String result = "0";
//		System.out.println(keyword.getKeyword().length);
		
		if(keyword == null) {
			int proCnt = service.getProjectCnt();
			result = String.valueOf(proCnt);
		}
		System.out.println("ProCnt : "+result);
		
		return result;
	}
	
	// 프로젝트 Main 화면
	// @RequestMapping(value="/projectList", method= {RequestMethod.POST})
	@RequestMapping("/projectList")
	public String projectList(@RequestBody @Nullable Keyword keyword ) {
		String proJson = null;
//		System.out.println("넘어온 키워드"+keyword.getKeyword());
		if( keyword == null ) {
			System.out.println("[ProjectController1 : projectList]");
			List<ProjectList> projectList = service.projectList();
			System.out.println("proList Size : "+projectList.size());
			
			for(int i=0;i<projectList.size();i++) {
				projectList.get(i).setPro_img(projectList.get(i).getPro_img()+"0.JPG");
			}
//			System.out.println(projectList.size());
//			for(int i = 0; i<projectList.size(); i++) {
//				String pro_img = service.projectImg(projectList.get(i).getPro_num());
//				String curri_name = service.pro_class(projectList.get(i).getPro_num()).getCurri_name().split(" ")[0];
//				if(pro_img != null) {
//					pro_img = pro_img+"0.JPG";
//				}
//				
//				else {
//					pro_img = "null";
//				}
//				projectList.get(i).setPro_img(pro_img);
//				projectList.get(i).setCurri_name(curri_name);
//			}
			 proJson = gson.toJson(projectList);
			
			
		}else if(keyword.getKeyword() == null){
			System.out.println("[ProjectController2 : projectList]");
			List<ProjectList> projectList = service.projectList();
			System.out.println(projectList.size());
			for(int i=0;i<projectList.size();i++) {
				projectList.get(i).setPro_img(projectList.get(i).getPro_img()+"0.JPG");
			}
//			for(int i = 0; i<projectList.size(); i++) {
//				String pro_img = service.projectImg(projectList.get(i).getPro_num());
//				String curri_name = service.pro_class(projectList.get(i).getPro_num()).getCurri_name().split(" ")[0];
//				if(pro_img != null) {
//					pro_img = pro_img+"1.JPG";
//				}else {
//					pro_img = "null";
//				}
//				projectList.get(i).setPro_img(pro_img);
//				projectList.get(i).setCurri_name(curri_name);
//			}
			 proJson = gson.toJson(projectList);
		}else {
			System.out.println("[키워드 관련 로직]");
			List<ProjectList> projectList = new ArrayList<ProjectList>();
			for(int i=0;i<keyword.getKeyword().length;i++) {
				projectList.addAll(service.projectListKeyword(keyword.getKeyword()[i]));
			}
			
			for(int i=0;i<projectList.size();i++) {
				projectList.get(i).setPro_img(projectList.get(i).getPro_img()+"0.JPG");
			}
			
//			System.out.println(projectList.size());
//			for(int i = 0; i<projectList.size(); i++) {
//				String pro_img = service.projectImg(projectList.get(i).getPro_num());
//				String curri_name = service.pro_class(projectList.get(i).getPro_num()).getCurri_name().split(" ")[0];
//				if(pro_img != null) {
//					pro_img = pro_img+"1.JPG";
//				}else {
//					pro_img = "null";
//				}
//				projectList.get(i).setPro_img(pro_img);
//				projectList.get(i).setCurri_name(curri_name);
//			}
			 proJson = gson.toJson(projectList);
		}
		
		return proJson;
		
	}
	
	//프로젝트 필터링 테스트
	@RequestMapping("/projectList/{col}/{pro_val}")
	public String projectList(@PathVariable("col") String col, @PathVariable("pro_val") String pro_val ) {
		System.out.println("필터링 : [ProjectController : projectList]");
		System.out.println("pro_val : " + pro_val);
		System.out.println("col : " + col);
		// 컬럼과 벨류를 동적으로 변경하기 위하여 map형태로 전송
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("col", col);
		map.put("pro_val", pro_val);
		
		List<ProjectList> projectList = service.projectListType(map);
		
		for(int i=0;i<projectList.size();i++) {
			projectList.get(i).setPro_img(projectList.get(i).getPro_img()+"0.JPG");
		}
//		System.out.println(projectList.size());
//		for(int i = 0; i<projectList.size(); i++) {
//			String pro_img = service.projectImg(projectList.get(i).getPro_num());
//			String curri_name = service.pro_class(projectList.get(i).getPro_num()).getCurri_name().split(" ")[0];
//			if(pro_img != null) {
//				pro_img = pro_img+"1.JPG";
//			}else {
//				pro_img = "null";
//			}
//			projectList.get(i).setPro_img(pro_img);
//			projectList.get(i).setCurri_name(curri_name);
//		}
//		
		String proJson = gson.toJson(projectList);
		
		
		return proJson;
	}
	
	@RequestMapping("/projectDetail/{pro_num}")
	public String projectDetail(@PathVariable("pro_num") int pro_num, HttpServletRequest request) {
		System.out.println("[ProjectController : projectDetail]");
		System.out.println("getNum : "+pro_num);
		
		ProBasic pro_basic = service.pro_basic(pro_num);
		String docu_plan = service.docu_plan(pro_num);
		ProClass pro_class = service.pro_class(pro_num);
		List<ProFunction> pro_funList = service.pro_fun(pro_num);
		List<ProDetail> pro_detail = service.pro_detail(pro_num);
		List<ProIot> pro_iot = service.pro_iot(pro_num);
		List<ProDanaly> pro_danaly = service.pro_danaly(pro_num);
		
		// URL을 현재 서버 주소로 변경
		String serverUrl = request.getScheme() + "://" + request.getServerName();
		if ((request.getScheme().equals("http") && request.getServerPort() != 80) ||
		    (request.getScheme().equals("https") && request.getServerPort() != 443)) {
			serverUrl += ":" + request.getServerPort();
		}
		serverUrl += "/project-smhrd";
		
		// pro_detail URL 변경
		if (pro_detail != null) {
			for (ProDetail detail : pro_detail) {
				if (detail.getPro_detail_url() != null) {
					// http://project-data.ddns.net -> 현재 서버 URL로 변경
					detail.setPro_detail_url(detail.getPro_detail_url()
						.replace("http://project-data.ddns.net", serverUrl));
				}
			}
		}
		
		ProjectDetail pro = new ProjectDetail(pro_basic, docu_plan, pro_class, pro_funList, pro_detail, pro_iot, pro_danaly);
		String proJson = gson.toJson(pro);
		System.out.println(proJson);
		
				
		return proJson;
	}
	
	
}
