package com.vn.edu.elearning.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Taikhoandangbantailieu}
 */
@Data
public class TaikhoandangbantailieuDto implements Serializable {
    MataikhoandangbantailieuDto mataikhoandangbantailieu;
    Long mataikhoan;
    TailieuDto tailieu;
    Date thoigiandangban;
}