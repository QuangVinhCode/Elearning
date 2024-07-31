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
@Table(name = "dangtai")
public class Dangtai {

    @EmbeddedId
    private Madangtai madangtai;
    @ManyToOne
    @MapsId("mataikhoan")
    @JoinColumn(name = "mataikhoan")
    private Taikhoan taikhoan;

    @ManyToOne
    @MapsId("matailieu")
    @JoinColumn(name = "matailieu")
    private Tailieu tailieu;

    @Column(name = "thoigiantailen",length = 50,nullable = false)
    private String thoigiantailen;

    @Column(name = "thoigianduocduyet",length = 50)
    private String thoigianduocduyet;
}
