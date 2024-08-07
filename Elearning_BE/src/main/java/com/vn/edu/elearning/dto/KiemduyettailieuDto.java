package com.vn.edu.elearning.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Tailieu}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class KiemduyettailieuDto implements Serializable {
    Long matailieu;
    String tentailieu;
    Long mataikhoan;
    String tendangnhap;
    String trangthai;;
    String thoigiandangtai;
}