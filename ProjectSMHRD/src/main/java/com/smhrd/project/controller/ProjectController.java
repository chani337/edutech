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
import com.smhrd.project.domain.ProjectInsertDTO;
import com.smhrd.project.domain.User;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import java.io.File;
import java.io.IOException;

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
	@Value("${file.upload.local-path:./data}")
	private String uploadPath;

	// SFTP 원격 전송 (파일질라 연동 및 다중 하위 폴더 자동 생성)
	public void sendFileRemote(MultipartFile file, String path, String name) throws Exception {
		String username = "root";
		String password = "smhrd2021";
		String host = "edusmhrd.ddns.net";
		int port = 26;
		
		byte[] bytes = org.apache.commons.io.IOUtils.toByteArray(file.getInputStream());
		
		com.jcraft.jsch.JSch jsch = new com.jcraft.jsch.JSch();
		com.jcraft.jsch.Session session = jsch.getSession(username, host, port);
		session.setPassword(password);
		
		java.util.Properties config = new java.util.Properties();
		config.put("StrictHostKeyChecking", "no");
		session.setConfig(config);
		
		session.connect(5000);
		com.jcraft.jsch.Channel channel = session.openChannel("sftp");
		channel.connect();
		com.jcraft.jsch.ChannelSftp channelSftp = (com.jcraft.jsch.ChannelSftp) channel;
		
		java.io.ByteArrayInputStream in = new java.io.ByteArrayInputStream(bytes);
		
		// 경로를 하위 폴더별로 쪼개서 하나씩 진입 및 생성 (예: /usr/local/data/project/2026/123/PPT)
		String[] folders = path.split("/");
		String currentPath = "";
		for (String dir : folders) {
			if (dir.isEmpty()) continue;
			currentPath += "/" + dir;
			try {
				channelSftp.cd(currentPath);
			} catch (Exception e) {
				channelSftp.mkdir(currentPath);
				channelSftp.cd(currentPath);
			}
		}

		try {
			channelSftp.put(in, name);
			System.out.println("FTP 업로드 완료: " + currentPath + "/" + name);
		} catch (Exception ex) {
			System.out.println("SFTP 파일 업로드 최종 실패: " + ex.getMessage());
			throw new Exception("파일질라 원격 업로드 실패 - " + ex.getMessage());
		}
		
		channel.disconnect();
		session.disconnect();
	}

	@PostMapping("/insert")
	public String insertProject(
			@RequestPart(value = "projectDto", required = false) MultipartFile projectDtoBlob,
			@RequestPart(value = "thumbnail", required = false) MultipartFile thumbnailFile,
			@RequestPart(value = "docs", required = false) List<MultipartFile> docFiles,
			@RequestParam(value = "docTypes", required = false) List<String> docTypes,
			@RequestPart(value = "presentation", required = false) MultipartFile presentationFile,
			@RequestPart(value = "video", required = false) MultipartFile videoFile,
			HttpServletRequest request) {
		
		System.out.println("[ProjectController : insertProject]");
		try {
			// 바이트 배열 -> 문자열 분리 -> 파싱
			String jsonStr = new String(projectDtoBlob.getBytes(), "UTF-8");
			ProjectInsertDTO dto = gson.fromJson(jsonStr, ProjectInsertDTO.class);
			
			// 1. Basic 테이블 등록 및 생성된 PK 반환 (dto.pro_num)
			service.insertProjectFullInfo(dto, new ArrayList<>());
			int pro_num = dto.getPro_num();
			String courseType = dto.getCourse_type() != null && !dto.getCourse_type().isEmpty() ? dto.getCourse_type() : "KDT";
			System.out.println("생성된 프로젝트 번호: " + pro_num + ", 과정명: " + courseType);
			
			System.out.println("---- 수신된 파일 정보 ----");
			System.out.println("썸네일 파일: " + (thumbnailFile != null && !thumbnailFile.isEmpty() ? thumbnailFile.getOriginalFilename() : "없음(null)"));
			System.out.println("발표 파일: " + (presentationFile != null && !presentationFile.isEmpty() ? presentationFile.getOriginalFilename() : "없음(null)"));
			System.out.println("문서 파일 수: " + (docFiles != null ? docFiles.size() : "0개"));
			System.out.println("영상 파일: " + (videoFile != null && !videoFile.isEmpty() ? videoFile.getOriginalFilename() : "없음(null)"));
			System.out.println("--------------------------");

			// 2. 로컬 백업 폴더 경로 (상대경로 에러 방지를 위해 절대경로로 변환)
			File folder = new File(uploadPath).getAbsoluteFile();
			if(!folder.exists()) folder.mkdirs();

			// 2-1. 썸네일 저장
			if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
				String remotePath = "/usr/local/data/project/2026/" + courseType + "/" + pro_num + "/PPT";
				// 기존 파일시스템 호환성을 위해 0.JPG 나 0.jpg 처럼 단일 이름 사용
				String fileName = "0.JPG";

				// 1. FTP 원격 연동 (스트림이 사라지기 전에 먼저 업로드)
				sendFileRemote(thumbnailFile, remotePath, fileName);
				
				// 2. 로컬 저장 (이후 MultipartFile 임시파일 증발)
				File pptFolder = new File(folder, courseType + "/" + pro_num + "/PPT");
				if(!pptFolder.exists()) pptFolder.mkdirs();
				File destFile = new File(pptFolder.getAbsolutePath(), fileName);
				thumbnailFile.transferTo(destFile);
				
				ProDetail detail = new ProDetail();
				detail.setPro_num(pro_num);
				detail.setPro_detail_type("PPT"); // 기존 코드가 썸네일을 PPT 타입으로 사용중
				// DB 뷰(View)에서 문자열 끝에 '0.JPG'를 자동 합성하므로 파일이름(0.JPG)은 빼고 폴더명까지만 저장해야 함!!
				detail.setPro_detail_url("http://project-data.ddns.net/data/project/2026/" + courseType + "/" + pro_num + "/PPT");
				service.insertProDetailOnly(detail);
			}

			// 2-2. 발표자료 (PDF, PPT 등)
			if (presentationFile != null && !presentationFile.isEmpty()) {
				String remotePath = "/usr/local/data/project/2026/" + courseType + "/" + pro_num + "/PPT";
				File pptFolder = new File(folder, courseType + "/" + pro_num + "/PPT");
				if(!pptFolder.exists()) pptFolder.mkdirs();

				String ext = getExtension(presentationFile.getOriginalFilename());
				String fileName = "presentation" + ext;

				sendFileRemote(presentationFile, remotePath, fileName);

				File destFile = new File(pptFolder.getAbsolutePath(), fileName);
				presentationFile.transferTo(destFile);

				ProDetail detail = new ProDetail();
				detail.setPro_num(pro_num);
				// 발표자료는 문서형태지만 썸네일과 동일한 PPT 폴더에 주로 보관
				detail.setPro_detail_type("DOC"); 
				detail.setPro_detail_url("http://project-data.ddns.net/data/project/2026/" + courseType + "/" + pro_num + "/PPT/" + fileName);
				service.insertProDetailOnly(detail);
			}

			// 2-2. 문서(PDF, HWP 등) 복수 파일 저장
			if (docFiles != null && !docFiles.isEmpty()) {
				String remotePath = "/usr/local/data/project/2026/" + courseType + "/" + pro_num + "/DOC";
				File docFolder = new File(folder, courseType + "/" + pro_num + "/DOC");
				if(!docFolder.exists()) docFolder.mkdirs();

				for (int i = 0; i < docFiles.size(); i++) {
					MultipartFile docFile = docFiles.get(i);
					if(docFile.isEmpty()) continue;
					
					String ext = getExtension(docFile.getOriginalFilename());
					String fileName = "doc_" + (i + 1) + ext; // 예: doc_1.pdf
					
					// FTP 원격전송
					sendFileRemote(docFile, remotePath, fileName);

					File destFile = new File(docFolder.getAbsolutePath(), fileName);
					docFile.transferTo(destFile);

					ProDetail detail = new ProDetail();
					detail.setPro_num(pro_num);
					detail.setPro_detail_type((docTypes != null && i < docTypes.size()) ? docTypes.get(i) : "DOC");
					detail.setPro_detail_url("http://project-data.ddns.net/data/project/2026/" + courseType + "/" + pro_num + "/DOC/" + fileName);
					service.insertProDetailOnly(detail);
				}
			}

			// 2-3. 영상 파일 저장
			if (videoFile != null && !videoFile.isEmpty()) {
				String remotePath = "/usr/local/data/project/2026/" + courseType + "/" + pro_num + "/VIDEO";
				String ext = getExtension(videoFile.getOriginalFilename());
				String fileName = "video" + ext;

				// FTP 원격전송
				sendFileRemote(videoFile, remotePath, fileName);

				File videoFolder = new File(folder, courseType + "/" + pro_num + "/VIDEO");
				if(!videoFolder.exists()) videoFolder.mkdirs();
				File destFile = new File(videoFolder.getAbsolutePath(), fileName);
				videoFile.transferTo(destFile);

				ProDetail detail = new ProDetail();
				detail.setPro_num(pro_num);
				detail.setPro_detail_type("VIDEO");
				detail.setPro_detail_url("http://project-data.ddns.net/data/project/2026/" + courseType + "/" + pro_num + "/VIDEO/" + fileName);
				service.insertProDetailOnly(detail);
			}

			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "fail : " + e.getMessage();
		}
	}
	
	// 확장자 추출 유틸리티
	private String getExtension(String fileName) {
		if(fileName == null || !fileName.contains(".")) return "";
		return fileName.substring(fileName.lastIndexOf("."));
	}
	
}
