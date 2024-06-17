package com.vn.edu.elearning.exeception;

import lombok.Data;

@Data
public class ClassExceptionResponse {
    private String message;

    public ClassExceptionResponse(String message) {
        this.message = message;
    }
}
