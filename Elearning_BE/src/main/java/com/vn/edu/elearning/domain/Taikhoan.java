package com.vn.edu.elearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "taikhoan")
public class Taikhoan {
    @Id
    @Column(name = "mataikhoan", nullable = false,length = 50)
    private Long mataikhoan;

    @Column(name = "tendangnhap", nullable = false, length = 100)
    private String tendangnhap;

    @Column(name = "matkhau", nullable = false, length = 100)
    private String matkhau;

    @Column(name = "sodienthoai", nullable = false, length = 50)
    private String sodienthoai;

    @Column(name = "gmail", nullable = false, length = 50)
    private String gmail;

    @Column(name = "quyenhan", nullable = false, length = 50)
    private String quyenhan;

    @Column(name = "sodu", nullable = false, length = 50)
    private Long sodu;

    @OneToMany(mappedBy = "taikhoan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Taikhoandabinhluan> dstaikhoandabinhluan;

    @OneToMany(mappedBy = "taikhoan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Taikhoanthanhtoantailieu> dstaikhoanthanhtoantailieu;

    @OneToMany(mappedBy = "taikhoan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Taikhoandangbantailieu> dstaikhoandangbantailieus;
}