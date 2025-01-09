package com.vn.edu.elearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vn.edu.elearning.util.Status;
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

    @Column(name = "tentailieu",length = 100, nullable = false)
    private String tentailieu;

    @Column(name = "tacgia",length = 50, nullable = false)
    private String tacgia;

    @Column(name = "mota",length = 250, nullable = false)
    private String mota;

    @Column(name = "giaban",nullable = false)
    private Long giaban;

    @Column(name = "diachiluutru",length = 250, nullable = false)
    private String diachiluutru;

    @Column(name = "tylephiquantri",nullable = false)
    private Long tylephiquantri;

    @Column(name = "tylethunhaptacgia",nullable = false)
    private Long tylethunhaptacgia;

    @Column(name = "trangthai",length = 20, nullable = false)
    private String trangthai = Status.CKD.getValue();

    @ManyToOne
    @JoinColumn(name = "madanhmuc")
    private Danhmuc danhmuc;

    @OneToMany(mappedBy = "tailieu", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Dangtai> dsdangtai;

    @OneToMany(mappedBy = "tailieu", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Thanhtoan> dsthanhtoan;

    @OneToMany(mappedBy = "tailieu", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Baocaotailieu> dsbaocaotailieu;

    @OneToMany(mappedBy = "tailieu", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Binhluan> dsbinhluan;

}