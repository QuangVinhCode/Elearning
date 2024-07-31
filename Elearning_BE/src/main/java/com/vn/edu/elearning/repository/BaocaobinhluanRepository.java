package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Baocaobinhluan;
import com.vn.edu.elearning.domain.Mabaocaobinhluan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BaocaobinhluanRepository extends JpaRepository<Baocaobinhluan, Mabaocaobinhluan> {

    List<Baocaobinhluan> findByTaikhoan_Mataikhoan(Long mataikhoan);
}