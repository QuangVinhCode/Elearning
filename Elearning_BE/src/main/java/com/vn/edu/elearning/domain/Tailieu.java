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
@Table(name = "tailieu")
public class Tailieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "matailieu", nullable = false)
    private Long matailieu;

    @Column(name = "tentailieu", nullable = false, length = 50)
    private String tentailieu;

    @Column(name = "mota", nullable = false, length = 250)
    private String mota;

    @Column(name = "giaban", nullable = false, length = 10)
    private Long giaban;

    @Column(name = "diachiluutru", nullable = false, length = 50)
    private String diachiluutru;

    @Column(name = "kiemduyet", nullable = false,length = 50)
    private String kiemduyet;

    @Column(name = "ghichu",length = 150)
    private String ghichu;

    @ManyToOne
    @JoinColumn(name = "madanhmuc")
    private Danhmuc danhmuc;

    @OneToMany(mappedBy = "tailieu", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Taikhoandabinhluan> dstaikhoandabinhluan;

    @OneToMany(mappedBy = "tailieu", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Taikhoanthanhtoantailieu> dstaikhoanthanhtoantailieu;

    @OneToMany(mappedBy = "tailieu", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Taikhoandangbantailieu> dstaikhoandangbantailieus;

}