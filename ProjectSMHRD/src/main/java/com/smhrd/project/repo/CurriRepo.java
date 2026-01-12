package com.smhrd.project.repo;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.project.domain.Curri;

@Repository
@Qualifier("mainDataSource")
public interface CurriRepo extends JpaRepository<Curri, String>{

}
