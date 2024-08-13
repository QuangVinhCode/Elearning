package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Thanhtoan;
import com.vn.edu.elearning.dto.ThongkethanhtoanDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ThanhtoanRepository extends JpaRepository<Thanhtoan, Long> {

    @Transactional
    @Modifying
    @Query("update Thanhtoan t set t.trangthai = ?1 where t.mathanhtoan = ?2")
    void updateTrangthaiByMathanhtoan(String trangthai, Long mathanhtoan);

    Thanhtoan findByTaikhoan_MataikhoanAndTailieu_Matailieu(Long mataikhoan, Long matailieu);

    Thanhtoan findByTaikhoan_MataikhoanAndTailieu_MatailieuAndTrangthai(Long mataikhoan, Long matailieu, String trangthai);

    List<Thanhtoan> findByTailieu_Matailieu(Long matailieu);

    @Query("SELECT new com.vn.edu.elearning.dto.ThongkethanhtoanDto(" +
            "tt.mathanhtoan, " +
            "t.tentailieu, " +
            "tt.taikhoan.tendangnhap, " +
            "dt.taikhoan.tendangnhap, " +
            "t.giaban, " +
            "(t.giaban * t.tylethunhaptacgia / 100), " +
            "(t.giaban * t.tylephiquantri / 100), " +
            "tt.thoigianthanhtoan" +
            ") " +
            "FROM Thanhtoan tt " +
            "JOIN tt.tailieu t " +
            "JOIN t.dsdangtai dt")
    List<ThongkethanhtoanDto> findThongkethanhtoanDto();
}