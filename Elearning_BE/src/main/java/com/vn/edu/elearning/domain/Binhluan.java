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

    @Column(name = "noidung", nullable = false, length = 500)
    private String noidung;

    @OneToMany(mappedBy = "binhluan", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Taikhoandabinhluan> dstaikhoandabinhluan;

}