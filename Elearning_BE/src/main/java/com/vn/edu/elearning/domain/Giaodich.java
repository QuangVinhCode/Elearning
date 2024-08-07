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
@Table(name = "giaodich")
public class Giaodich {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "magiaodich", nullable = false)
    private Long magiaodich;

    @Column(name = "sotien",nullable = false)
    private Long sotien;

    @Column(name = "lydo",length = 250, nullable = false)
    private String lydo;

    @Column(name = "trangthai",length = 20, nullable = false)
    private String trangthai;

    @Column(name = "thoigiangiaodich",length = 50,nullable = false)
    private String thoigiangiaodich;

    @ManyToOne
    @JoinColumn(name = "mataikhoan")
    private Taikhoan taikhoan;
}
