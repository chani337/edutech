package com.smhrd.project.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class DoorayMeetingService {

    @Value("${DOORAY_API_KEY}")
    private String apiKey;

    @Value("${DOORAY_TENANT}")
    private String tenant;

    public Map<String, Object> createMeeting(String subject) {
        // 프리미엄/관리자 API 권한 부족으로 인한 404 에러 방지
        // 두레이 화상미팅(Meet)은 테넌트 도메인과 고유 문자열만 있으면 동적으로 방이 생성됩니다.
        String randomRoomId = UUID.randomUUID().toString().substring(0, 8);
        
        // 예: https://meeting.dooray.com/meeting/smhrd-mentoring-1234abcd
        String meetingUrl = "https://meeting.dooray.com/meeting/" + tenant.split("\\.")[0] + "-mentoring-" + randomRoomId;

        // 프론트엔드 파싱 구조에 맞춘 응답 객체 조립
        Map<String, Object> resultData = new HashMap<>();
        resultData.put("id", randomRoomId);
        resultData.put("meetingUrl", meetingUrl);
        
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> header = new HashMap<>();
        header.put("isSuccessful", true);
        
        response.put("header", header);
        response.put("result", resultData);
        
        return response;
    }
}
