package com.vn.edu.elearning.repository;

import com.vn.edu.elearning.domain.Mathanhtoan;
import com.vn.edu.elearning.domain.Thanhtoan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThanhtoanRepository extends JpaRepository<Thanhtoan, Mathanhtoan> {
}