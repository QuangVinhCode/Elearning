package com.vn.edu.elearning.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class Mataikhoanthanhtoantailieu implements Serializable {
    private Long mataikhoan;
    private Long matailieu;
}
