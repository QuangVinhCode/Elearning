package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Baocaotailieu;
import com.vn.edu.elearning.domain.Mabaocaotailieu;
import com.vn.edu.elearning.dto.TheodoibaocaoDto;
import com.vn.edu.elearning.dto.ThongtinbaocaotailieuDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BaocaotailieuRepository extends JpaRepository<Baocaotailieu, Mabaocaotailieu> {

    List<Baocaotailieu> findByTaikhoan_Mataikhoan(Long mataikhoan);

    @Query("SELECT new com.vn.edu.elearning.dto.ThongtinbaocaotailieuDto(" +
            "COUNT(b), " +
            "t.tentailieu, " +
            "tk.taikhoan.tendangnhap, " +
            "SUM(CASE WHEN b.trangthai = 'Chờ xem xét' THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN b.trangthai = 'Đã xem xét' THEN 1 ELSE 0 END)) " +
            "FROM Baocaotailieu b " +
            "JOIN b.tailieu t " +
            "JOIN t.dsdangtai tk " +
            "GROUP BY t.tentailieu, tk.taikhoan.tendangnhap " +
            "ORDER BY COUNT(b) DESC")
    List<ThongtinbaocaotailieuDto> findReportedDocumentInfo();

    @Query("SELECT new com.vn.edu.elearning.dto.TheodoibaocaoDto(" +
            "COUNT(b), tk.taikhoan.tendangnhap) " +
            "FROM Baocaotailieu b " +
            "JOIN b.tailieu t " +
            "JOIN t.dsdangtai tk " +
            "GROUP BY tk.taikhoan.tendangnhap " +
            "ORDER BY COUNT(b) DESC")
    List<TheodoibaocaoDto> findReportMonitor();

    Baocaotailieu findByTaikhoan_MataikhoanAndTailieu_Matailieu(Long mataikhoan, Long matailieu);

    @Modifying
    @Transactional
    @Query("UPDATE Baocaotailieu b SET b.trangthai = :trangthai WHERE b.tailieu.matailieu = :matailieu")
    void updateTrangthaiByMatailieu(String trangthai, Long matailieu);


}