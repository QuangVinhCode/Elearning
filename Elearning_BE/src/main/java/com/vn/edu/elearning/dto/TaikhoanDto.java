package com.vn.edu.elearning.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Taikhoan}
 */
@Data
@Builder
public class TaikhoanDto implements Serializable {
    Long mataikhoan;
    String tendangnhap;
    Long sodu;
    String gmail;
    String matkhau;
    String sodienthoai;
    String trangthaidangtai;
    String trangthaibinhluan;
    String quyenhan;
}