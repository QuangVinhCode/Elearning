package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Binhluan;
import com.vn.edu.elearning.dto.BinhluanTheoTailieuDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BinhluanRepository extends JpaRepository<Binhluan, Long> {
    @Query("SELECT new com.vn.edu.elearning.dto.BinhluanTheoTailieuDto(b.mabinhluan, b.taikhoan.mataikhoan, b.taikhoan.tendangnhap, b.noidung, b.trangthai, b.matbinhluandatraloi, b.thoigianbinhluan) " +
            "FROM Binhluan b WHERE b.tailieu.matailieu = :matailieu")
    List<BinhluanTheoTailieuDto> findBinhluansByMatailieu(@Param("matailieu") Long matailieu);

    List<Binhluan> findByTaikhoan_Mataikhoan(Long mataikhoan);

}