package com.vn.edu.elearning.controller;

import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.dto.TaikhoanDto;
import com.vn.edu.elearning.service.MapValidationErrorService;
import com.vn.edu.elearning.service.TaiikhoanService;
import com.vn.edu.elearning.service.TaikhoandangbantailieuService;
import com.vn.edu.elearning.service.TaikhoanthanhtoantailieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/thanhtoan")
public class ThanhtoanController {

    @Autowired
    private TaikhoandangbantailieuService taikhoandangbantailieuService;

    @Autowired
    private TaikhoanthanhtoantailieuService taikhoanthanhtoantailieuService;
    @GetMapping("/check/{tk}/{tl}")
    public ResponseEntity<?> CheckDocumentViewingPermissions(@PathVariable("tk") Long tk,@PathVariable("tl") Long tl) {
        String check = "Chưa thanh toán";
        boolean checkSalesAccount = taikhoandangbantailieuService.checkSalesAccount(tk,tl);
        boolean checkBuyAccount = taikhoanthanhtoantailieuService.checkBuyAccount(tk,tl);
        if (checkSalesAccount)
        {
            check = "Chủ sở hữu";
        }
        if (checkBuyAccount)
        {
            check = "Đã thanh toán";
        }
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

}
