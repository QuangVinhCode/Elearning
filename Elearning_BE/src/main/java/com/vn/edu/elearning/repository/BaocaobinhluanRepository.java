package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Baocaobinhluan;
import com.vn.edu.elearning.domain.Mabaocaobinhluan;
import com.vn.edu.elearning.dto.TheodoibaocaoDto;
import com.vn.edu.elearning.dto.ThongtinbaocaobinhluanDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BaocaobinhluanRepository extends JpaRepository<Baocaobinhluan, Mabaocaobinhluan> {

    List<Baocaobinhluan> findByTaikhoan_Mataikhoan(Long mataikhoan);

    @Query("SELECT new com.vn.edu.elearning.dto.ThongtinbaocaobinhluanDto(COUNT(b), bl.noidung, tk.tendangnhap) " +
            "FROM Baocaobinhluan b " +
            "JOIN b.binhluan bl " +
            "JOIN bl.taikhoan tk " +
            "GROUP BY bl.noidung, tk.tendangnhap " +
            "ORDER BY COUNT(b) DESC")
    List<ThongtinbaocaobinhluanDto> findReportedCommentsInfo();

    @Query("SELECT new com.vn.edu.elearning.dto.TheodoibaocaoDto(COUNT(b), tk.tendangnhap) " +
            "FROM Baocaobinhluan b " +
            "JOIN b.binhluan bl " +
            "JOIN bl.taikhoan tk " +
            "GROUP BY bl.noidung, tk.tendangnhap " +
            "ORDER BY COUNT(b) DESC")
    List<TheodoibaocaoDto> findReportMonitor();

    Baocaobinhluan findByTaikhoan_MataikhoanAndBinhluan_Mabinhluan(Long mataikhoan, Long mabinhluan);


}