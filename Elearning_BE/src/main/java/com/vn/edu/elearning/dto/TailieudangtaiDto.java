package com.vn.edu.elearning.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    String trangthai;
    String thoigiantailen;
    String thoigianduocduyet;
}