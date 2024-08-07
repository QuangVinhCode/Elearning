package com.vn.edu.elearning.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Thanhtoan}
 */
@Data
public class ThanhtoanDto implements Serializable {
    Long matailieu;
    Long mataikhoan;
    String thoigianthanhtoan;
    String trangthai;
}