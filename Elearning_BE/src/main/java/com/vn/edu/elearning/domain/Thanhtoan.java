package com.vn.edu.elearning.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "thanhtoan")
public class Thanhtoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mathanhtoan", nullable = false)
    private Long mathanhtoan;

    @ManyToOne
    @JoinColumn(name = "mataikhoan", nullable = false)
    private Taikhoan taikhoan;

    @ManyToOne
    @JoinColumn(name = "matailieu", nullable = false)
    private Tailieu tailieu;

    @Column(name = "thoigianthanhtoan",length = 50,nullable = false)
    private String thoigianthanhtoan;

    @Column(length = 20, nullable = false)
    private String trangthai;
}
