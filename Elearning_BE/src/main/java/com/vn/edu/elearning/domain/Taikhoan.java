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
    @Column(name = "mataikhoan", nullable = false)
    private Long mataikhoan;

    @Column(name = "tendangnhap",length = 50, nullable = false)
    private String tendangnhap;

    @Column(name = "matkhau",length = 100, nullable = false)
    private String matkhau;

    @Column(name = "sodu",nullable = false)
    private Long sodu;

    @Column(name = "gmail",length = 100, nullable = false)
    private String gmail;

    @Column(name = "sodienthoai",length = 15, nullable = false)
    private String sodienthoai;

    @Column(name = "quyenhan",length = 20, nullable = false)
    private String quyenhan;

    @Column(name = "trangthaidangtai",length = 20, nullable = false)
    private String trangthaidangtai;

    @Column(name = "trangthaibinhluan",length = 20, nullable = false)
    private String trangthaibinhluan;

    @OneToMany(mappedBy = "taikhoan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Dangtai> dsdangtai;

    @OneToMany(mappedBy = "taikhoan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Thanhtoan> dsthanhtoan;

    @OneToMany(mappedBy = "taikhoan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Baocaotailieu> dsbaocaotailieu;

    @OneToMany(mappedBy = "taikhoan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Baocaobinhluan> dsbaocaobinhluan;

    @OneToMany(mappedBy = "taikhoan")
    @JsonIgnore
    private List<Giaodich> dsgiaodich;

    @OneToMany(mappedBy = "taikhoan")
    @JsonIgnore
    private List<Binhluan> dsbinhluan;
}