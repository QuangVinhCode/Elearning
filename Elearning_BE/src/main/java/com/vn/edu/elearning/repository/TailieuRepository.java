package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.KiemduyettailieuDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TailieuRepository extends JpaRepository<Tailieu, Long> {

    List<Tailieu> findByDanhmuc_Madanhmuc(Long madanhmuc);

    @Query(value = "SELECT tl.* FROM tailieu tl JOIN thanhtoan tt ON tl.matailieu = tt.matailieu GROUP BY tl.matailieu ORDER BY COUNT(tl.matailieu) DESC LIMIT 5", nativeQuery = true)
    List<Tailieu> findTop5TailieuByThanhtoanNhieuNhat();


    List<Tailieu> findByTentailieuContains(String tentailieu);

    @Transactional
    @Modifying
    @Query("update Tailieu t set t.trangthai = ?1 where t.matailieu = ?2")
    void updateTrangthaiByMatailieu(String trangthai, Long matailieu);

    List<Tailieu> findByDanhmuc_MadanhmucAndTrangthai(Long madanhmuc, String trangthai);

    @Query("SELECT new com.vn.edu.elearning.dto.KiemduyettailieuDto(t.matailieu, t.tentailieu, tk.mataikhoan, tk.tendangnhap,t.trangthai,dt.thoigiantailen)" +
            "FROM Tailieu t JOIN t.dsdangtai dt JOIN dt.taikhoan tk")
    List<KiemduyettailieuDto> findDSTailieukiemduyet();
}