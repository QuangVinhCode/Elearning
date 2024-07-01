package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Tailieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TailieuRepository extends JpaRepository<Tailieu, Long> {

    List<Tailieu> findByKiemduyetContains(String kiemduyet);

    List<Tailieu> findByDanhmuc_Madanhmuc(Long madanhmuc);

    Page<Tailieu> findByDanhmuc_MadanhmucOrderByGiabanAsc(Long madanhmuc, Pageable pageable);

}