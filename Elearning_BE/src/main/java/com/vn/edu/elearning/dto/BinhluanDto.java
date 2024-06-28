package com.vn.edu.elearning.dto;

import com.vn.edu.elearning.domain.Binhluan;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link Binhluan}
 */
@Data
public class BinhluanDto implements Serializable {
    Long mataikhoan;
    Long mabinhluan;
    Long matailieu;
    String noidung;

}