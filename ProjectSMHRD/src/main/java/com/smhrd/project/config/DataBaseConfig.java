package com.smhrd.project.config;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import com.smhrd.project.repo.ClassRepo;
import com.smhrd.project.repo.UserRepo;
//import com.smhrd.project.service.AIAcademyOracleService;
import com.smhrd.project.service.UserService;

@Configuration
//@EnableJpaRepositories(basePackages = "com.smhrd.project.repo")
@EnableJpaRepositories(basePackages = "com.smhrd.project.repo", entityManagerFactoryRef = "mainEntityManagerFactory", transactionManagerRef = "mainTransactionManager")
//@ComponentScan(basePackages = "com.smhrd.project.*")\
@MapperScan(basePackages = "com.smhrd.project.mapper", sqlSessionFactoryRef = "mainSqlSessionFactory")
public class DataBaseConfig {

	@Primary
	@Bean(name = "mainDataSource")
	@ConfigurationProperties(prefix = "spring.datasource.main")
	public DataSource mainDataSource() {
		return DataSourceBuilder.create().build();
	}

	@Primary
	@Bean(name = "mainEntityManagerFactory")
	public LocalContainerEntityManagerFactoryBean mainEntityManagerFactory(EntityManagerFactoryBuilder builder,
			@Qualifier("mainDataSource") DataSource dataSource) {
		return builder.dataSource(mainDataSource()).packages("com.smhrd.project.domain") // MySQL 엔티티 패키지 경로
				.persistenceUnit("main").build();
	}


	@Primary
	@Bean(name = "mainTransactionManager")
	public PlatformTransactionManager mainTransactionManager(
			@Qualifier("mainEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
		return new JpaTransactionManager(entityManagerFactory);
	}
	@Primary
	@Bean(name = "mainSqlSessionFactory")
    public SqlSessionFactory oracleSqlSessionFactory(@Qualifier("mainDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setDataSource(dataSource);
        Resource[] resources = new PathMatchingResourcePatternResolver().getResources("classpath*:com/smhrd/project/mapper/*.xml");
        sessionFactoryBean.setMapperLocations(resources);
        return sessionFactoryBean.getObject();
    }


	

}
