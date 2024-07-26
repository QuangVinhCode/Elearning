package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.TailieuKiemDuyetDto;
import com.vn.edu.elearning.dto.TailieuRevenueDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TailieuRepository extends JpaRepository<Tailieu, Long> {
    List<Tailieu> findByDanhmuc_Madanhmuc(Long madanhmuc);



    Page<Tailieu> findByDanhmuc_MadanhmucOrderByGiabanAsc(Long madanhmuc, Pageable pageable);
    @Query(value = "SELECT tl.* FROM tailieu tl JOIN taikhoanthanhtoantailieu tkt ON tl.matailieu = tkt.matailieu GROUP BY tl.matailieu ORDER BY COUNT(tkt.matailieu) DESC LIMIT 5", nativeQuery = true)
    List<Tailieu> findTop5TailieuByThanhtoanNhieuNhat();


    List<Tailieu> findByTentailieuContains(String tentailieu);

    List<Tailieu> findByDstaikhoanthanhtoantailieu_Taikhoan_Mataikhoan(Long mataikhoan);

    List<Tailieu> findByDstaikhoandangbantailieus_Taikhoan_Mataikhoan(Long mataikhoan);

    @Query("SELECT new com.vn.edu.elearning.dto.TailieuKiemDuyetDto(t.matailieu, t.tentailieu, t.mota, t.giaban, tk.tendangnhap,t.danhmuc.tendanhmuc,t.diachiluutru) " +
            "FROM Tailieu t " +
            "JOIN Taikhoandangbantailieu tb ON t.matailieu = tb.mataikhoandangbantailieu.matailieu " +
            "JOIN Taikhoan tk ON tb.mataikhoandangbantailieu.mataikhoan = tk.mataikhoan " +
            "WHERE t.kiemduyet = :kiemduyet")
    List<TailieuKiemDuyetDto> findTailieuWithTaikhoanByKiemduyet(@Param("kiemduyet") String kiemduyet);

    @Query("SELECT new com.vn.edu.elearning.dto.TailieuRevenueDto(" +
            "t.matailieu, " +
            "t.tentailieu, " +
            "SUM(tt.sotienthanhtoan), " +
            "SUM(tt.phiquantri), " +
            "SUM(tt.thunhaptacgia)) " +
            "FROM Taikhoanthanhtoantailieu tt " +
            "JOIN Tailieu t ON tt.tailieu.matailieu = t.matailieu " +
            "WHERE tt.tailieu.matailieu IN (" +
            "   SELECT tb.tailieu.matailieu " +
            "   FROM Taikhoandangbantailieu tb " +
            "   WHERE tb.taikhoan.mataikhoan = :mataikhoan" +
            ") " +
            "GROUP BY t.matailieu, t.tentailieu")
    List<TailieuRevenueDto> getTongHopTheoMaTaiKhoan(@Param("mataikhoan") Long mataikhoan);

    List<Tailieu> findByDanhmuc_MadanhmucAndKiemduyetNot(Long madanhmuc, String kiemduyet);
}