package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Giaodich;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GiaodichRepository extends JpaRepository<Giaodich, Long> {

    List<Giaodich> findByTaikhoan_Mataikhoan(Long mataikhoan);
}