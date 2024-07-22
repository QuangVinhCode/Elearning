package com.vn.edu.elearning.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Binhluan}
 */

@Getter
@Setter
@AllArgsConstructor
public class ThongtinTaikhoanBinhluanDto implements Serializable {
    private Long mabinhluan;
    private String noidung;
    private Long matailieu;
    private String tentailieu;
    private Long mataikhoan;
    private  String thoigianbinhluan;
}