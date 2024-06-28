package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Mataikhoandabinhluan;
import com.vn.edu.elearning.domain.Taikhoandabinhluan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaikhoandabinhluanRepository extends JpaRepository<Taikhoandabinhluan, Mataikhoandabinhluan> {
    long deleteByMataikhoandabinhluan_MataikhoanAndMataikhoandabinhluan_MatailieuAndMataikhoandabinhluan_Mabinhluan(Long mataikhoan, Long matailieu, Long mabinhluan);
}