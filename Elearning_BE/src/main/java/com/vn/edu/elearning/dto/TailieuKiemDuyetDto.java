package com.vn.edu.elearning.dto;

import com.vn.edu.elearning.domain.Binhluan;
import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link Binhluan}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TailieuKiemDuyetDto implements Serializable {
    private Long matailieu;
    private String tentailieu;
    private String mota;
    private Long giaban;
    private String tendangnhap;
    private String tendanhmuc;
    private String diachiluutru;
}