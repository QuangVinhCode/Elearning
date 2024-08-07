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
@Table(name = "danhmuc")
public class Danhmuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "madanhmuc", nullable = false)
    private Long madanhmuc;

    @Column(name = "tendanhmuc", nullable = false, length = 50)
    private String tendanhmuc;

    @OneToMany(mappedBy = "danhmuc")
    @JsonIgnore
    private List<Tailieu> dstailieu;
}