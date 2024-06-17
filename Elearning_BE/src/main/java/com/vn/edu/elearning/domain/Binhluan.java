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
@Table(name = "binhluan")
public class Binhluan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mabinhluan", nullable = false)
    private Long mabinhluan;

    @Column(name = "tieude", nullable = false, length = 50)
    private String tieude;

    @Column(name = "noidung", nullable = false, length = 250)
    private String noidung;

    @OneToMany(mappedBy = "binhluan", cascade = CascadeType.ALL)
    private List<Taikhoandabinhluan> dstaikhoandabinhluan;

}