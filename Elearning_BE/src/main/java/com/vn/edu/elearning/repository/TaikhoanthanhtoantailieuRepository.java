package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Mataikhoanthanhtoantailieu;
import com.vn.edu.elearning.domain.Taikhoanthanhtoantailieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.Nullable;

import java.util.Optional;

public interface TaikhoanthanhtoantailieuRepository extends JpaRepository<Taikhoanthanhtoantailieu, Mataikhoanthanhtoantailieu> {
    Optional<Taikhoanthanhtoantailieu> findByTaikhoan_MataikhoanAndTailieu_Matailieu(@Nullable Long mataikhoan, Long matailieu);


}