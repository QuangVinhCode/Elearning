package com.vn.edu.elearning.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Mataikhoandangbantailieu implements Serializable {
    private Long mataikhoan;
    private Long matailieu;
}
