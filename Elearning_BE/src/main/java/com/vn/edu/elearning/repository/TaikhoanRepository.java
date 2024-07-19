package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Taikhoan;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaikhoanRepository extends JpaRepository<Taikhoan, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE Taikhoan t SET t.sodu = :sodu WHERE t.mataikhoan = :id")
    void updateSodu(@Param("id") Long id, @Param("sodu") Long sodu);

    @Modifying
    @Transactional
    @Query("UPDATE Taikhoan t SET t.sodu = t.sodu + :amount WHERE t.mataikhoan = :id")
    void incrementSodu(@Param("id") Long id, @Param("amount") Long amount);

    @Modifying
    @Transactional
    @Query("UPDATE Taikhoan t SET t.sodu = t.sodu + :amount WHERE t.quyenhan = 'Quản trị viên'")
    void incrementSoduForAdmin(@Param("amount") Long amount);

    @Modifying
    @Query("UPDATE Taikhoan t SET t.trangthai = :trangthai WHERE t.mataikhoan = :id")
    @Transactional
    void updateTrangThai(@Param("id") Long id, @Param("trangthai") String trangthai);

    @Query("SELECT t FROM Taikhoan t WHERE t.trangthai = 'Bình thường' AND t.quyenhan <> 'Quản trị viên'")
    List<Taikhoan> findBinhThuongWithoutAdmin();

    @Query("SELECT t FROM Taikhoan t WHERE t.trangthai <> 'Bình thường' AND t.quyenhan <> 'Quản trị viên'")
    List<Taikhoan> findNotBinhThuongWithoutAdmin();

    @Modifying
    @Transactional
    @Query("UPDATE Taikhoan t SET t.trangthai = 'Bình thường' WHERE t.trangthai = ?1")
    void updateTrangthaiIfDateMatches(String currentDate);


    Optional<Taikhoan> findByTendangnhapAndGmail(String tendangnhap, String gmail);

    Optional<Taikhoan> findByTendangnhap(String tendangnhap);


}