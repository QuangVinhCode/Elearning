package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Binhluan;
import com.vn.edu.elearning.dto.TaikhoanBinhluanDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BinhluanRepository extends JpaRepository<Binhluan, Long> {
    @Query("SELECT new com.vn.edu.elearning.dto.TaikhoanBinhluanDto(b.mabinhluan, b.noidung, tk.tendangnhap,tkdbl.thoigianbinhluan) " +
            "FROM Binhluan b " +
            "JOIN b.dstaikhoandabinhluan tkdbl " +
            "JOIN tkdbl.taikhoan tk " +
            "WHERE tkdbl.tailieu.matailieu = :matailieu")
    List<TaikhoanBinhluanDto> findCommentsByTailieuId(@Param("matailieu") Long matailieu);

}