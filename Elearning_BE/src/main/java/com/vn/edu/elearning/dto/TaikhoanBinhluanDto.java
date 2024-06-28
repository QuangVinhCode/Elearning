package com.vn.edu.elearning.dto;

import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Binhluan}
 */

@Getter
@Setter
@AllArgsConstructor
public class TaikhoanBinhluanDto implements Serializable {
    private Long mabinhluan;
    private String noidung;
    private String tendangnhap;
    private  String thoigianbinhluan;
}