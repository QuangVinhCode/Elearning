package com.vn.edu.elearning.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Taikhoan}
 */
@Data
public class TaikhoanDto implements Serializable {
    Long mataikhoan;
    String tendangnhap;
    String matkhau;
    String sodienthoai;
    String gmail;
    String quyenhan;
}