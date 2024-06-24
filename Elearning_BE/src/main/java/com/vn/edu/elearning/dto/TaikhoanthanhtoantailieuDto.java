package com.vn.edu.elearning.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Taikhoanthanhtoantailieu}
 */
@Value
public class TaikhoanthanhtoantailieuDto implements Serializable {
    MataikhoanthanhtoantailieuDto mataikhoanthanhtoantailieu;
    TaikhoanDto taikhoan;
    TailieuDto tailieu;
}