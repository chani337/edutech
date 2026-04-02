package com.smhrd.project.controller;

import com.smhrd.project.service.DoorayMeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000") // 프론트엔드 URL 허용
@RequestMapping("/api/mentoring")
public class MentoringController {

    @Autowired
    private DoorayMeetingService doorayMeetingService;

    @PostMapping("/meeting")
    public Map<String, Object> createMeeting(@RequestBody Map<String, String> request) {
        String title = request.getOrDefault("title", "멘토링 화상미팅");
        // Dooray 화상회의 생성 서비스 호출
        return doorayMeetingService.createMeeting(title);
    }
}
