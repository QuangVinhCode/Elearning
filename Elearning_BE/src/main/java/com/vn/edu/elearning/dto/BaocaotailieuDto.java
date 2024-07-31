package com.vn.edu.elearning.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Baocaotailieu}
 */
@Value
public class BaocaotailieuDto implements Serializable {
    Long mataikhoan;
    Long matailieu;
    String thoigianthanhtoan;
    String lydo;
}