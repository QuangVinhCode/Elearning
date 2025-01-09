package com.vn.edu.elearning.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Status {
    ADMIN("admin"),
    USER("user"),
    BT("Bình thường"),
    TC("Thành công"),
    TB("Thất bại"),
    C("Chặn"),
    CAM("Cấm"),
    CKD("Chờ kiểm duyệt"),
    DKD("Đã kiểm duyệt"),
    CCS("Cần chỉnh sửa");
    private final String value;
}
