package com.vn.edu.elearning.exeception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TaikhoanException extends  RuntimeException{
    public TaikhoanException(String message) {
        super(message);
    }
}
