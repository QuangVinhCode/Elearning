package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Taikhoan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaikhoanRepository extends JpaRepository<Taikhoan, Long> {


    Optional<Taikhoan> findByTendangnhapContains(String tendangnhap);
}