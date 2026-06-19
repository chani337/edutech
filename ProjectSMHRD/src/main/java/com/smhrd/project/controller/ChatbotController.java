package com.smhrd.project.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChatbotController {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/chatbot")
    public ResponseEntity<Map<String, String>> askChatbot(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        Map<String, String> responseMap = new HashMap<>();

        if (question == null || question.trim().isEmpty()) {
            responseMap.put("answer", "질문을 입력해 주세요!");
            return ResponseEntity.badRequest().body(responseMap);
        }

        try {
            // 1. Gemini API Endpoint 구성
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

            // 2. 학습용 멘토 프롬프트 결합
            String systemPrompt = "너는 IT 국비교육 과정의 '최우수 프로젝트 기획 및 설계 멘토'야.\n" +
                    "후배 교육생들이 최종 프로젝트 주제, 구현 범위(Scope), 외부 API 연동 등에 대해 고민할 때 친절하고 아주 유능하게 가이드해 줘야 해.\n" +
                    "기본적으로 우리 교육원의 수료생 우수 프로젝트들인 다음 레퍼런스들을 아주 잘 알고 있어야 해:\n\n" +
                    "1. 'mypro3' 프로젝트:\n" +
                    "   - 스택: React(v18), Redux 전역 상태관리, CoreUI Admin Template 기반의 LMS 대시보드\n" +
                    "   - 기능: PDF 교재 뷰어 (react-pdf-viewer 및 react-pdf 패키지 사용), TOAST UI 마크다운 에디터(@toast-ui/react-editor) 탑재, 소셜 로그인 3대장(네이버 react-naver-login, 카카오 react-kakao-login, 구글 react-google-login) 완벽 연동, Chart.js 활용한 학습 성취도 시각화 대시보드.\n" +
                    "   - 특징: 깔끔한 어드민 대시보드 형태로, 프론트엔드 기능의 완성도가 매우 높은 선례임.\n\n" +
                    "2. 'ProjectSMHRD' 프로젝트:\n" +
                    "   - 스택: Java Spring Boot(v2.7), MyBatis 및 JPA 멀티 연동, MySQL/MariaDB/Oracle 데이터베이스 통합.\n" +
                    "   - 기능: 안정적인 RESTful API 서버, 파일 업로드/다운로드 기능 및 톰캣 포트 8070 최적화.\n\n" +
                    "학생이 질문을 하면 아래의 규칙을 철저하게 지키며 대답해줘:\n" +
                    "- 반갑고 다정한 말투(예: '~하셨군요!', '~해 보세요!', '화이팅입니다!')로 응답해줘.\n" +
                    "- 선배 프로젝트들의 구체적인 기술 스택과 패키지 이름(예: react-kakao-login, react-pdf-viewer 등)을 콕 집어 언급하면서 현실감 있게 코칭해줘.\n" +
                    "- 프로젝트 범위가 너무 거창하면(예: 인스타그램 완벽 구현 등), 4~5주 기간 안에 끝낼 수 있게 '1단계 핵심 기능', '2단계 부가 기능'으로 구체적으로 범위를 쪼개어(Scope 조절) 조언해줘.\n" +
                    "- 코딩 교육이나 개발 지식에 관련된 에러나 문제 해결법에 대해서도 친절한 코드 템플릿과 함께 가이드해줘.\n\n" +
                    "학생의 질문: " + question;

            // 3. Jackson 호환 Map/List 기반 Gemini JSON 바디 구조화 (Gson 종속성 완전 제거)
            Map<String, Object> requestBody = new HashMap<>();
            List<Map<String, Object>> contentsList = new ArrayList<>();
            Map<String, Object> contentMap = new HashMap<>();
            List<Map<String, Object>> partsList = new ArrayList<>();
            Map<String, Object> partMap = new HashMap<>();

            partMap.put("text", systemPrompt);
            partsList.add(partMap);
            contentMap.put("parts", partsList);
            contentsList.add(contentMap);
            requestBody.put("contents", contentsList);

            // 4. HTTP Headers 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // 5. REST 호출 실행
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                // 6. Jackson ObjectMapper로 JSON 파싱
                JsonNode root = objectMapper.readTree(response.getBody());
                JsonNode candidates = root.path("candidates");
                if (candidates.isArray() && candidates.size() > 0) {
                    JsonNode content = candidates.get(0).path("content");
                    JsonNode parts = content.path("parts");
                    if (parts.isArray() && parts.size() > 0) {
                        String answer = parts.get(0).path("text").asText();
                        responseMap.put("answer", answer);
                        return ResponseEntity.ok(responseMap);
                    }
                }
            }

            responseMap.put("answer", "죄송합니다. 챗봇이 일시적으로 답변을 준비하지 못했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMap);

        } catch (Exception e) {
            e.printStackTrace();
            responseMap.put("answer", "에러 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMap);
        }
    }
}
