package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Baocaotailieu;
import com.vn.edu.elearning.domain.Mabaocaotailieu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BaocaotailieuRepository extends JpaRepository<Baocaotailieu, Mabaocaotailieu> {

    List<Baocaotailieu> findByTaikhoan_Mataikhoan(Long mataikhoan);
}