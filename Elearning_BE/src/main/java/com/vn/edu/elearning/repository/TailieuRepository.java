package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Tailieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TailieuRepository extends JpaRepository<Tailieu, Long> {

    List<Tailieu> findByKiemduyetContains(String kiemduyet);

    List<Tailieu> findByDanhmuc_Madanhmuc(Long madanhmuc);

    Page<Tailieu> findByDanhmuc_MadanhmucOrderByGiabanAsc(Long madanhmuc, Pageable pageable);
    @Query(value = "SELECT tl.* FROM tailieu tl JOIN taikhoanthanhtoantailieu tkt ON tl.matailieu = tkt.matailieu GROUP BY tl.matailieu ORDER BY COUNT(tkt.matailieu) DESC LIMIT 5", nativeQuery = true)
    List<Tailieu> findTop5TailieuByThanhtoanNhieuNhat();

    List<Tailieu> findByTentailieuLike(String tentailieu);

    List<Tailieu> findByTentailieuContains(String tentailieu);


}