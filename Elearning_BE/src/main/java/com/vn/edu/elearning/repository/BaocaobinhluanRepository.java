package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Baocaobinhluan;
import com.vn.edu.elearning.domain.Mabaocaobinhluan;
import com.vn.edu.elearning.dto.BaocaotailieuDto;
import com.vn.edu.elearning.dto.TheodoibaocaoDto;
import com.vn.edu.elearning.dto.ThongtinbaocaobinhluanDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BaocaobinhluanRepository extends JpaRepository<Baocaobinhluan, Mabaocaobinhluan> {

    List<Baocaobinhluan> findByTaikhoan_Mataikhoan(Long mataikhoan);


    @Query("SELECT new com.vn.edu.elearning.dto.ThongtinbaocaobinhluanDto(COUNT(b), bl.noidung, tk.tendangnhap,bl.mabinhluan) " +
            "FROM Baocaobinhluan b " +
            "JOIN b.binhluan bl " +
            "JOIN bl.taikhoan tk " +
            "GROUP BY bl.noidung, tk.tendangnhap,bl.mabinhluan " +
            "ORDER BY COUNT(b) DESC")
    List<ThongtinbaocaobinhluanDto> findReportedCommentsInfo();

    @Query("SELECT new com.vn.edu.elearning.dto.TheodoibaocaoDto(COUNT(b), tk.tendangnhap,tk.mataikhoan) " +
            "FROM Baocaobinhluan b " +
            "JOIN b.binhluan bl " +
            "JOIN bl.taikhoan tk " +
            "GROUP BY tk.tendangnhap,tk.mataikhoan " +
            "ORDER BY COUNT(b) DESC")
    List<TheodoibaocaoDto> findReportMonitor();

    Baocaobinhluan findByTaikhoan_MataikhoanAndBinhluan_Mabinhluan(Long mataikhoan, Long mabinhluan);

    List<Baocaobinhluan> findByBinhluan_Mabinhluan(Long mabinhluan);

    List<Baocaobinhluan> findByBinhluan_Taikhoan_Mataikhoan(Long mataikhoan);

}