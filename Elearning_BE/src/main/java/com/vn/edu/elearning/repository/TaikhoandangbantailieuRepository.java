package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Mataikhoandangbantailieu;
import com.vn.edu.elearning.domain.Taikhoandangbantailieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;

import java.util.Optional;

public interface TaikhoandangbantailieuRepository extends JpaRepository<Taikhoandangbantailieu, Mataikhoandangbantailieu> {


    Optional<Taikhoandangbantailieu> findByTaikhoan_MataikhoanAndTailieu_Matailieu(@Nullable Long mataikhoan, Long matailieu);

    @Query("SELECT t.taikhoan.mataikhoan FROM Taikhoandangbantailieu t WHERE t.tailieu.matailieu = :matailieu")
    Optional<Long> findFirstMataikhoanByMatailieu(@Param("matailieu") Long matailieu);
}