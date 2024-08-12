package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Giaodich;
import com.vn.edu.elearning.dto.LichsuthuchiDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GiaodichRepository extends JpaRepository<Giaodich, Long> {

    List<Giaodich> findByTaikhoan_Mataikhoan(Long mataikhoan);

    @Query("SELECT new com.vn.edu.elearning.dto.LichsuthuchiDto(" +
            "SUM(CASE WHEN g.lydo LIKE 'Nạp tiền%' THEN g.sotien ELSE 0 END), " +
            "SUM(CASE WHEN g.lydo LIKE 'Thanh toán%' THEN g.sotien ELSE 0 END), " +
            "SUM(CASE WHEN g.lydo LIKE 'Thu nhập%' THEN g.sotien ELSE 0 END), " +
            "SUBSTRING(g.thoigiangiaodich, 7, 11) " + // Lấy phần tháng năm từ chuỗi
            ") " +
            "FROM Giaodich g " +
            "WHERE g.taikhoan.mataikhoan = :mataikhoan AND g.trangthai='Thành công'" +
            "GROUP BY SUBSTRING(g.thoigiangiaodich, 7, 11)")
    List<LichsuthuchiDto> findLichsuthuchiByTaikhoan(@Param("mataikhoan") Long mataikhoan);

}