package com.vn.edu.elearning.controller;

import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.domain.Taikhoanthanhtoantailieu;
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

    @Autowired
    MapValidationErrorService mapValidationErrorService;
    @GetMapping("/check/{tk}/{tl}")
    public ResponseEntity<?> checkDocumentViewingPermissions(@PathVariable("tk") Long tk,@PathVariable("tl") Long tl) {
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
    @PostMapping("/pay/{tk}/{tl}")
    public ResponseEntity<?> payDocument(@PathVariable("tk") Long tk,@PathVariable("tl") Long tl) {
        Taikhoanthanhtoantailieu taikhoanthanhtoantailieu = taikhoanthanhtoantailieuService.save(tk,tl);
        if (taikhoanthanhtoantailieu!=null)
        {
            Long matk = taikhoanthanhtoantailieuService.findFirstMataikhoanByMatailieu(taikhoanthanhtoantailieu.getTailieu().getMatailieu());
            Long giaTL = taikhoanthanhtoantailieu.getTailieu().getGiaban();
            System.out.println("Mã tài khoản " + matk);
            System.out.println("Giá tài liệu " + giaTL);
            taikhoanthanhtoantailieuService.incrementSodu(matk,giaTL);
        }
        return new ResponseEntity<>(taikhoanthanhtoantailieu, HttpStatus.OK);
    }

}
