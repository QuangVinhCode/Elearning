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
    @EmbeddedId
    private Mathanhtoan mathanhtoan;
    @ManyToOne
    @MapsId("mataikhoan")
    @JoinColumn(name = "mataikhoan")
    private Taikhoan taikhoan;

    @ManyToOne
    @MapsId("matailieu")
    @JoinColumn(name = "matailieu")
    private Tailieu tailieu;

    @Column(name = "thoigianthanhtoan",length = 50,nullable = false)
    private String thoigianthanhtoan;

    @Column(length = 20, nullable = false)
    private String trangthai;
}
