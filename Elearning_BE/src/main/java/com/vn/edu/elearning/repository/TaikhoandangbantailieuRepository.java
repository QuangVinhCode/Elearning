package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Mataikhoandangbantailieu;
import com.vn.edu.elearning.domain.Taikhoandangbantailieu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaikhoandangbantailieuRepository extends JpaRepository<Taikhoandangbantailieu, Mataikhoandangbantailieu> {
}