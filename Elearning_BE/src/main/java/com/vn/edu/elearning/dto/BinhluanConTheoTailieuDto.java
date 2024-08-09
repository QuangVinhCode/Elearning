package com.vn.edu.elearning.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Binhluan}
 */
@Value
public class BinhluanConTheoTailieuDto implements Serializable {
    Long mabinhluan;
    Long mataikhoan;
    String tendangnhap;
    String noidung;
    String trangthai;
    String thoigianbinhluan;
}