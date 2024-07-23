package com.vn.edu.elearning.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "taikhoanthanhtoantailieu")
public class Taikhoanthanhtoantailieu {
    @EmbeddedId
    private Mataikhoanthanhtoantailieu mataikhoanthanhtoantailieu;

    @ManyToOne
    @MapsId("mataikhoan")
    @JoinColumn(name = "mataikhoan")
    private Taikhoan taikhoan;

    @ManyToOne
    @MapsId("matailieu")
    @JoinColumn(name = "matailieu")
    private Tailieu tailieu;

    @Column(name = "thoigianthanhtoan")
    private String thoigianthanhtoan;

    @Column(name = "sotienthanhtoan", nullable = false, length = 50)
    private Long sotienthanhtoan;

    @Column(name = "phiquantri", nullable = false, length = 50)
    private Long phiquantri;

    @Column(name = "thunhaptacgia", nullable = false, length = 50)
    private Long thunhaptacgia;
}