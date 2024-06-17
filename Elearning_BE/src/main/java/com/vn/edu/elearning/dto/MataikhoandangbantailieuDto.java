package com.vn.edu.elearning.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Mataikhoandangbantailieu}
 */
@Data
public class MataikhoandangbantailieuDto implements Serializable {
    Long mataikhoan;
    Long matailieu;
}