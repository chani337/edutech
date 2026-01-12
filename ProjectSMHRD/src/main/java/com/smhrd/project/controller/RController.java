package com.smhrd.project.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

//react 연동 테스트용 컨트롤러
@RestController
public class RController {
	
	//데이터 전송
	@RequestMapping(value="/call", method= {RequestMethod.GET})
	public String call(String id, HttpServletResponse response) {
		System.out.println("call!!!!!!!!!");
		System.out.println("id : "+ id);
		
		return "join";
	}
	
	//비동기 통신 : 데이터 전송
	@RequestMapping(value="/join1", method= {RequestMethod.GET})
	public String join(String id, HttpServletResponse response) {
		System.out.println("join!!!!!!!!!");
		System.out.println("id : "+ id);
		
		return "success";
	}
	
	//객체 데이터 전송
	@RequestMapping(value="/move", method= {RequestMethod.GET})
	public String move(String id, Model model) {
		System.out.println("move!!!!!!"+id);
        model.addAttribute("value", "movesuccess");
        System.out.println(model.toString());
        Gson gson = new Gson();
        String json = gson.toJson(model);
        return json;
	}
}

