package com.vn.edu.elearning.dto;

import com.vn.edu.elearning.domain.Mataikhoanthanhtoantailieu;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link Mataikhoanthanhtoantailieu}
 */
@Value
public class MataikhoanthanhtoantailieuDto implements Serializable {
    Long mataikhoan;
    Long matailieu;
}