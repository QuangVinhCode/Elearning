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
@Table(name = "taikhoandabinhluan")
public class Taikhoandabinhluan {

    @EmbeddedId
    private Mataikhoandabinhluan mataikhoandabinhluan;

    @ManyToOne
    @MapsId("mataikhoan")
    @JoinColumn(name = "mataikhoan")
    private Taikhoan taikhoan;

    @ManyToOne
    @MapsId("matailieu")
    @JoinColumn(name = "matailieu")
    private Tailieu tailieu;

    @ManyToOne
    @MapsId("mabinhluan")
    @JoinColumn(name = "mabinhluan")
    private Binhluan binhluan;

    @Column(name = "thoigianbinhluan")
    private String thoigianbinhluan;
}