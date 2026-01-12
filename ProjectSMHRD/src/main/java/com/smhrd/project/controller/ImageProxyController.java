package com.smhrd.project.controller;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/data")
public class ImageProxyController {
    
    @Value("${file.upload.remote-host}")
    private String sftpHost;
    
    @Value("${file.upload.remote-port}")
    private int sftpPort;
    
    @Value("${file.upload.remote-username}")
    private String sftpUsername;
    
    @Value("${file.upload.remote-password}")
    private String sftpPassword;
    
    @Value("${file.upload.remote-path}")
    private String remotePath;
    
    @GetMapping("/**")
    public ResponseEntity<byte[]> proxyImage(HttpServletRequest request) {
        Session session = null;
        ChannelSftp channelSftp = null;
        String fullPath = "";  // catch 블록에서도 사용할 수 있도록 선언
        
        try {
            // 원본 URI 로깅
            String originalURI = request.getRequestURI();
            System.out.println("[ImageProxyController] Original URI: " + originalURI);
            
            // 요청 경로 추출 (context path 제거)
            String path = originalURI.replace("/project-smhrd", "");
            System.out.println("[ImageProxyController] After context removal: " + path);
            
            // URL 디코딩하여 한글 경로 처리
            path = URLDecoder.decode(path, StandardCharsets.UTF_8.name());
            System.out.println("[ImageProxyController] After URL decode: " + path);
            
            // /data/ 제거하고 실제 파일 경로만 추출
            String filePath = path.replace("/data/", "");
            fullPath = remotePath + "/" + filePath;
            
            System.out.println("[ImageProxyController] Fetching file from SFTP: " + fullPath);
            
            // SFTP 연결
            JSch jsch = new JSch();
            session = jsch.getSession(sftpUsername, sftpHost, sftpPort);
            session.setPassword(sftpPassword);
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect();
            
            channelSftp = (ChannelSftp) session.openChannel("sftp");
            channelSftp.connect();
            
            // 파일 다운로드
            InputStream inputStream = channelSftp.get(fullPath);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            byte[] fileData = outputStream.toByteArray();
            inputStream.close();
            
            // Content-Type 설정
            HttpHeaders headers = new HttpHeaders();
            String lowerPath = path.toLowerCase();
            if (lowerPath.endsWith(".jpg") || lowerPath.endsWith(".jpeg")) {
                headers.setContentType(MediaType.IMAGE_JPEG);
            } else if (lowerPath.endsWith(".png")) {
                headers.setContentType(MediaType.IMAGE_PNG);
            } else if (lowerPath.endsWith(".pdf")) {
                headers.setContentType(MediaType.APPLICATION_PDF);
            } else if (lowerPath.endsWith(".mp4")) {
                headers.set("Content-Type", "video/mp4");
            } else {
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            }
            
            System.out.println("[ImageProxyController] File fetched successfully: " + fileData.length + " bytes");
            
            return ResponseEntity.ok()
                .headers(headers)
                .body(fileData);
            
        } catch (Exception e) {
            System.err.println("[ImageProxyController] Error fetching file from path: " + fullPath);
            System.err.println("[ImageProxyController] Error message: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        } finally {
            if (channelSftp != null && channelSftp.isConnected()) {
                channelSftp.disconnect();
            }
            if (session != null && session.isConnected()) {
                session.disconnect();
            }
        }
    }
}
