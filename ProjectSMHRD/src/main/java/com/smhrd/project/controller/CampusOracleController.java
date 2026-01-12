package com.smhrd.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.project.service.DBCampusOracleService;

@RequestMapping("dbcampus")
@RestController
@Qualifier("campusOracleDataSource")
public class CampusOracleController {
    
    @Autowired
    DBCampusOracleService service;

    // 230925 : 코드 수정(기존 : DB 발급 요청 기능 → 기능 추가 : DB 발급 기능)
    // 코드 간소화 및 새로운 클래스로 필드명 받아서 처리
    // requestBody의 내부 클래스
    public static class RequestBodyClass {
        private String reqId;
        private String reqPw;
        
        public String getReqId() {
            return reqId;
        }

        public void setReqId(String reqId) {
            this.reqId = reqId;
        }

        public String getReqPw() {
            return reqPw;
        }

        public void setReqPw(String reqPw) {
            this.reqPw = reqPw;
        }
    }

    // 230913_경로 겹침으로 인해 변경
    @RequestMapping(value="/createCampusOracleDb", method = {RequestMethod.POST})
    public String createDb(@RequestBody RequestBodyClass requestBody) {
        System.out.println("[DBController : signupNew]");
        service.createCampusOracleDb(requestBody.getReqId(), requestBody.getReqPw());
        return "success";
    }
}
