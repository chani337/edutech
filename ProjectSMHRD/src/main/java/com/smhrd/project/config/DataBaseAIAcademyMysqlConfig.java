//package com.smhrd.project.config;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import javax.persistence.EntityManagerFactory;
//import javax.sql.DataSource;
//
//import org.apache.ibatis.session.SqlSessionFactory;
//import org.mybatis.spring.SqlSessionFactoryBean;
//import org.mybatis.spring.annotation.MapperScan;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.Resource;
//import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
//import org.springframework.orm.jpa.JpaTransactionManager;
//import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
//import org.springframework.transaction.PlatformTransactionManager;
//
//@Configuration
//@MapperScan(basePackages = "com.smhrd.project.aiAcademyMysqlMapper", sqlSessionFactoryRef = "aiAcademyMysqlSessionFactory")
//public class DataBaseAIAcademyMysqlConfig {
//	private Map<String, Object> getVendorProperties() {
//		Map<String, Object> properties = new HashMap<>();
//		properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
//		return properties;
//	}
//
//	@Bean(name = "aiAcademyMysqlDataSource")
//	@ConfigurationProperties(prefix = "spring.datasource.aiacademy-mysql")
//	public DataSource aiAcademyMysqlDataSource() {
//		return DataSourceBuilder.create().build();
//	}
//
//	@Bean(name = "aiAcademyMysqlEntityManagerFactory")
//	public LocalContainerEntityManagerFactoryBean aiAcademyMysqlEntityManagerFactory(EntityManagerFactoryBuilder builder,
//			@Qualifier("aiAcademyMysqlDataSource") DataSource dataSource) {
//		return builder.dataSource(aiAcademyMysqlDataSource()).packages("com.smhrd.project.aiAcademyMysqlDomain")
//				.persistenceUnit("aiAcademyMysql").properties(getVendorProperties()).build();
//	}
//
//	@Bean(name = "aiAcademyMysqlTransactionManager")
//	public PlatformTransactionManager aiAcademyMysqlTransactionManager(
//			@Qualifier("aiAcademyMysqlEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
//		return new JpaTransactionManager(entityManagerFactory);
//	}
//
//	@Bean(name = "aiAcademyMysqlSessionFactory")
//	public SqlSessionFactory MysqlSqlSessionFactory(@Qualifier("aiAcademyMysqlDataSource") DataSource dataSource)
//			throws Exception {
//		SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
//		sessionFactoryBean.setDataSource(dataSource);
//		Resource[] resources = new PathMatchingResourcePatternResolver()
//				.getResources("classpath*:com/smhrd/project/mapper/AIAcademyMysqlMapper.xml");
//		sessionFactoryBean.setMapperLocations(resources);
//		return sessionFactoryBean.getObject();
//	}
//}
