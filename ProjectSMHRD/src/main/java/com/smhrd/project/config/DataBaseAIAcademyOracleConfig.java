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
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.orm.jpa.JpaTransactionManager;
//import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
//import org.springframework.transaction.PlatformTransactionManager;
//
//@Configuration
//@EnableJpaRepositories(basePackages = "com.smhrd.project.aiAcademyOracleRepo", entityManagerFactoryRef = "aiAcademyOracleEntityManagerFactory", transactionManagerRef = "aiAcademyOracleTransactionManager")
//@MapperScan(basePackages = "com.smhrd.project.aiAcademyOracleMapper", sqlSessionFactoryRef = "aiAcademyOracleSessionFactory")
//public class DataBaseAIAcademyOracleConfig {
//
//	private Map<String, Object> getVendorProperties() {
//		Map<String, Object> properties = new HashMap<>();
//		properties.put("hibernate.dialect", "org.hibernate.dialect.Oracle12cDialect");
//		return properties;
//	}
//
//	@Bean(name = "aiAcademyOracleDataSource")
//	@ConfigurationProperties(prefix = "spring.datasource.aiacademy-oracle")
//	public DataSource aiAcademyOracleDataSource() {
//		return DataSourceBuilder.create().build();
//	}
//
//	@Bean(name = "aiAcademyOracleEntityManagerFactory")
//	public LocalContainerEntityManagerFactoryBean aiAcademyOracleEntityManagerFactory(EntityManagerFactoryBuilder builder,
//			@Qualifier("aiAcademyOracleDataSource") DataSource dataSource) {
//		return builder.dataSource(aiAcademyOracleDataSource()).packages("com.smhrd.project.aiAcademyOracleDomain") // CGI Oracle 엔티티
//																										// 패키지 경로
//				.persistenceUnit("aiAcademyoracle").properties(getVendorProperties()).build();
//	}
//
//	@Bean(name = "aiAcademyOracleTransactionManager")
//	public PlatformTransactionManager aiAcademyOracleTransactionManager(
//			@Qualifier("aiAcademyOracleEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
//		return new JpaTransactionManager(entityManagerFactory);
//	}
//
//	@Bean(name = "aiAcademyOracleSessionFactory")
//	public SqlSessionFactory aiAcademyOracleSqlSessionFactory(@Qualifier("aiAcademyOracleDataSource") DataSource dataSource)
//			throws Exception {
//		SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
//		sessionFactoryBean.setDataSource(dataSource);
//		Resource[] resources = new PathMatchingResourcePatternResolver()
//				.getResources("classpath*:com/smhrd/project/mapper/AIAcademyOracleMapper.xml");
//		sessionFactoryBean.setMapperLocations(resources);
//		return sessionFactoryBean.getObject();
//	}
//}
