package com.smhrd.project.repo;

import java.util.List;

import javax.persistence.EntityManagerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smhrd.project.domain.ClassKind;

@Repository
@Qualifier("mainDataSource")
public interface ClassRepo extends JpaRepository<ClassKind, String>{

//	@Qualifier("mainDataSource")
//	@Query(value="select c.class_code AS class_code, c.host_code AS host_code, c.curri.curri_name AS curri_name, c.curri_cnt AS curri_cnt from Class_ c where c.class_start between  '2022-12-20' and now()")
//	List<Object[]> findCourse();
	
}
