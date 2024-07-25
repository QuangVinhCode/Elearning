package com.vn.edu.elearning.dto;

import com.vn.edu.elearning.domain.Binhluan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

/**
 * DTO for {@link Binhluan}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TailieuRevenueDto implements Serializable {
    private Long matailieu;
    private String tentailieu;
    private Long sotienthanhtoan;
    private Long phiquantri;
    private Long thunhaptacgia;
}