package com.smhrd.project.controller;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.smhrd.project.domain.Tch;
import com.smhrd.project.service.TchService;
import com.smhrd.project.service.UserService;

import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;


@RequestMapping("tech")
@RestController
@Qualifier("mainDataSource")
public class TchController {
	
	@Autowired
	TchService service;
	
	@Value("${file.upload.local-mode:true}")
	private boolean localMode;
	
	@Value("${file.upload.local-path:./data}")
	private String localPath;

	Gson gson = new Gson();
            
	
	public byte[] convertMultipartFileToByteArray(MultipartFile multipartFile) throws IOException {
	    return IOUtils.toByteArray(multipartFile.getInputStream());
	}
	
	// 로컬에 파일 저장
	public void saveFileLocally(MultipartFile file, String inputPath, String name) throws Exception {
		String fullPath = localPath + "/tech/" + inputPath;
		File directory = new File(fullPath);
		if (!directory.exists()) {
			directory.mkdirs();
		}
		
		File destFile = new File(directory, name);
		file.transferTo(destFile);
		System.out.println("File saved locally: " + destFile.getAbsolutePath());
	}

public void sendFile(MultipartFile file, String inputPath,String name) throws Exception {
        //String username, String password, String host, int port, String path, byte[] data, String filename
        String username = "root";
        String password = "smhrd2021";
        String host = "edusmhrd.ddns.net";
        int port =26;
        String path = "/usr/local/data/tech/"+inputPath;
        //byte[] data = (byte[]) param.get("data");
      
        byte[] imageBytes = convertMultipartFileToByteArray(file);
      
        String filename = name;
        
        
        //JSch 객체 생성
        JSch jsch = new JSch();
        
        //Session 생성, 원격서버에 대한 접속정보
        Session session = jsch.getSession(username, host, port);
        session.setPassword(password);
		
        // properties 객체생성, StrictHostKeyChecking 이라는 설정값을 no 로 설정
        Properties config = new Properties();
        config.put("StrictHostKeyChecking", "no");
        session.setConfig(config);
		
        //서버에 접속 
        session.connect(3000);
        
        //sftp 채널열기
        Channel channel = session.openChannel("sftp");
		
        //원격지에 명령어 호출, 채널을 ssh용 채널 객체로 캐스팅한다.
        channel.connect();
        
        ChannelSftp channelSftp = (ChannelSftp) channel;
		
        ByteArrayInputStream in = new ByteArrayInputStream(imageBytes);
		
        //파일업로드
        try {
        	 channelSftp.cd(path);
             channelSftp.put(in, filename);
        }
        catch (Exception e) {
        	channelSftp.mkdir(path);
        	
        	 channelSftp.cd(path);
             channelSftp.put(in, filename);
		}
       
        
        //채널, 세션 연결해제
        channel.disconnect();
        session.disconnect();
     }

	//public String postUpload(@RequestBody HashMap<String, Object> map,@RequestParam("file") MultipartFile file) {
	@RequestMapping(value="/postUpload", method = {RequestMethod.POST}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	//public String postUpload(@RequestBody HashMap<String, Object> map) {
	public String postUpload(@RequestParam("images") List<MultipartFile> images,@RequestParam("content") String content,
			@RequestParam("techname") String techname,@RequestParam("techtype") String techtype, @RequestParam("techcode") MultipartFile techcode) {
		
		String url  = "http://project-data.ddns.net/data/tech/";
		System.out.println("[TchController : postUpload]");
		System.out.println(techname);
		System.out.println(techtype);
		System.out.println(content); 
		
		System.out.println(images.get(0).getOriginalFilename());
		System.out.println(techcode.getOriginalFilename());		
		String[] imgUrl = new String[images.size()];
		
		String techcodeUrl = null;
	
		if(!(images.get(0).getOriginalFilename().equals("hello.txt"))) {
			
			for(int i =0; i <imgUrl.length;i++) {
				imgUrl[i] =  url+techtype+"/"+techname+"/"+images.get(i).getOriginalFilename();
			}
			
			for(int i =0; i <imgUrl.length;i++) {
				content= content.replace("(img"+i+")", "![image]("+imgUrl[i]+")");
			}			
			
			try {
				for(int i=0;i<images.size();i++) {
					if(localMode) {
						// 로컬 모드: 로컬에 저장
						saveFileLocally(images.get(i),techtype+"/"+techname,images.get(i).getOriginalFilename());
					} else {
						// 원격 모드: 원격 서버에 저장
						sendFile(images.get(i),techtype+"/"+techname,images.get(i).getOriginalFilename());
					}
				}
				
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
		if(!(techcode.getOriginalFilename().equals("hello.txt"))) {
			
			techcodeUrl = url+techtype+"/"+techname+"/"+techcode.getOriginalFilename();
			try {
				if(localMode) {
					// 로컬 모드: 로컬에 저장
					saveFileLocally(techcode,techtype+"/"+techname,techcode.getOriginalFilename());
				} else {
					// 원격 모드: 원격 서버에 저장
					sendFile(techcode,techtype+"/"+techname,techcode.getOriginalFilename());
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	
		
		
//		
		int tchInsertChech = service.tchInsert(new Tch(techtype,techname,content,techcodeUrl));
		System.out.println(tchInsertChech);
		
		
		return "success";
	}
	
	@RequestMapping(value="/postMenu", method = {RequestMethod.GET})
	public String postMenu() {
		
		System.out.println("[TchController : postMenu]");

		List<Tch> tchNameList =service.tchName();
		JsonArray tchList = new JsonArray();
			
			for(int i=0;i<tchNameList.size();i++) {
				System.out.println(tchNameList.get(i));
				
				JsonElement jsonElement = gson.toJsonTree(tchNameList.get(i));
				JsonObject tchJo = jsonElement.getAsJsonObject();
				tchList.add(tchJo);
			}
			
		

		return tchList.toString();
	}
	
	@RequestMapping(value="/postView", method = {RequestMethod.GET})
	public String postView(@RequestParam("tchNum") String tchNum) {
		
		System.out.println("[TchController : postView]");
		
		String result[] = service.tchSelect(tchNum);
		
		JsonObject jsonObject  = new JsonObject();
		jsonObject.addProperty("markDown", result[0]);
		jsonObject.addProperty("zipUrl", result[1]);

		


		return jsonObject.toString();
	}
	
}
