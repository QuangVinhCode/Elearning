package com.vn.edu.elearning.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Binhluan}
 */
@Data
public class BinhluanDto implements Serializable {
    Long mabinhluan;
    Long mataikhoan;
    Long matailieu;
    String noidung;
    String trangthai;
    Long matbinhluandatraloi;
    String thoigianbinhluan;
}