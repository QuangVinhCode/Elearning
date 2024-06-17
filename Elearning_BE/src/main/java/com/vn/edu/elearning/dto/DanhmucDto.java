package com.vn.edu.elearning.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.vn.edu.elearning.domain.Danhmuc}
 */
@Data
public class DanhmucDto implements Serializable {
    Long madanhmuc;
    String tendanhmuc;
}