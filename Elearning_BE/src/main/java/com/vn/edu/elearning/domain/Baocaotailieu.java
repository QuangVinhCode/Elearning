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
@Table(name = "baocaotailieu")
public class Baocaotailieu {
    @EmbeddedId
    private Mabaocaotailieu mabaocaotailieu;

    @ManyToOne
    @MapsId("mataikhoan")
    @JoinColumn(name = "mataikhoan")
    private Taikhoan taikhoan;

    @ManyToOne
    @MapsId("matailieu")
    @JoinColumn(name = "matailieu")
    private Tailieu tailieu;

    @Column(name = "thoigianbaocao",length = 50,nullable = false)
    private String thoigianbaocao;

    @Column(length = 250, nullable = false)
    private String lydo;

    @Column(name = "trangthai",length = 20, nullable = false)
    private String trangthai;
}
