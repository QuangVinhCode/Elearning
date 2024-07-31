package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Mathanhtoan;
import com.vn.edu.elearning.domain.Thanhtoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ThanhtoanRepository extends JpaRepository<Thanhtoan, Mathanhtoan> {

    @Transactional
    @Modifying
    @Query("update Thanhtoan t set t.trangthai = ?1 where t.mathanhtoan = ?2")
    void updateTrangthaiByMathanhtoan(String trangthai, Mathanhtoan mathanhtoan);

    Thanhtoan findByTaikhoan_MataikhoanAndTailieu_Matailieu(Long mataikhoan, Long matailieu);


}