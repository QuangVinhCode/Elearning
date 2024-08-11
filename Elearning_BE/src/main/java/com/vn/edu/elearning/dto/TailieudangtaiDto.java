package com.vn.edu.elearning.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vn.edu.elearning.domain.Danhmuc;
import lombok.Data;
import lombok.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Tailieu}
 */
@Value
public class TailieudangtaiDto implements Serializable {
    Long matailieu;
    String tentailieu;
    String tacgia;
    String mota;
    Long giaban;
    String diachiluutru;
    Long tylephiquantri;
    Long tylethunhaptacgia;
    String trangthai;
    Danhmuc danhmuc;
    Long mataikhoan;
    String thoigiantailen;
    String thoigianduocduyet;
}