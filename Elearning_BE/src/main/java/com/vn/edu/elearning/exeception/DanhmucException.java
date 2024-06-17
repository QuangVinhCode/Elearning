package com.vn.edu.elearning.exeception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DanhmucException extends  RuntimeException{
    public DanhmucException(String message) {
        super(message);
    }
}
