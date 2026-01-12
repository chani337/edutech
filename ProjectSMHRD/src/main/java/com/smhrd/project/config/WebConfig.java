package com.smhrd.project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 이미지 파일 경로 매핑
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:./images/", "classpath:/static/images/");
        
        // uploads 폴더 매핑
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:./uploads/", "classpath:/static/uploads/");
        
        // data 폴더는 ImageProxyController에서 SFTP를 통해 제공
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // CORS 설정 - 프론트엔드에서 접근 가능하도록
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://172.30.1.254:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
