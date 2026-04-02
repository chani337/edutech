package com.smhrd.project.domain; // DTO for inserting projects

import lombok.Data;

@Data
public class ProjectInsertDTO {
    private int pro_num; // AI auto-generated key will be mapped here
    private String pro_name;
    private String pro_theme;
    private String pro_team;
    private String pro_prize; // 최우수, 우수 등
    private String pro_type; // 기업, 자율, 챌린지 등
    private String pro_nutshell; // 프로젝트 요약 설명
    
    private Integer ctg_num;
    private Integer ctg_num2;
    private Integer dtype_num;
    private Integer dtype_num2;
    private Integer pro_ctg_num;
    private String course_type; // 과정명 (경로 생성용)
}
