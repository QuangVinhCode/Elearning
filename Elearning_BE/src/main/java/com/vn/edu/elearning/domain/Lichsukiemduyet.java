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
@Table(name = "lichsukiemduyet")
public class Lichsukiemduyet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "malichsukiemduyet", nullable = false)
    private Long malichsukiemduyet;

    @Column(name = "ketqua",length = 50, nullable = false)
    private String ketqua;

    @Column(name = "lydo",length = 150 )
    private String lydo;

    @Column(name = "thoigiankiemduyet",length = 50,nullable = false)
    private String thoigiankiemduyet;

    @ManyToOne
    @JoinColumn(name = "matailieu")
    private Tailieu tailieu;
}
