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
@Table(name = "taikhoandangbantailieu")
public class Taikhoandangbantailieu {

    @EmbeddedId
    private Mataikhoandangbantailieu mataikhoandangbantailieu;

    @ManyToOne
    @MapsId("mataikhoan")
    @JoinColumn(name = "mataikhoan")
    private Taikhoan taikhoan;

    @ManyToOne
    @MapsId("matailieu")
    @JoinColumn(name = "matailieu")
    private Tailieu tailieu;


    @Column(name = "thoigiandangban")
    private String thoigiandangban;
}