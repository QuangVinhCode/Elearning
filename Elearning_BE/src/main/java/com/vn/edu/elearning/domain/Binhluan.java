package com.vn.edu.elearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "binhluan")
public class Binhluan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mabinhluan", nullable = false)
    private Long mabinhluan;
    @ManyToOne
    @JoinColumn(name = "matailieu", nullable = false)
    private Tailieu tailieu;
    @ManyToOne
    @JoinColumn(name = "mataikhoan", nullable = false)
    private Taikhoan taikhoan;
    @Column(name = "noidung", nullable = false, length = 500)
    private String noidung;
    @Column(name = "trangthai",length = 20, nullable = false)
    private String trangthai;
    @Column(name = "matbinhluandatraloi",length = 20, nullable = false)
    private Long matbinhluandatraloi;
    @Column(name = "thoigianbinhluan",length = 50,nullable = false)
    private String thoigianbinhluan;
    @OneToMany(mappedBy = "binhluan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Baocaobinhluan> dsbaocaobinhluan;
}