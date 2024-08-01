package com.vn.edu.elearning.controller;

import com.vn.edu.elearning.domain.Baocaobinhluan;
import com.vn.edu.elearning.domain.Baocaotailieu;
import com.vn.edu.elearning.domain.Danhmuc;
import com.vn.edu.elearning.dto.BaocaobinhluanDto;
import com.vn.edu.elearning.dto.BaocaotailieuDto;
import com.vn.edu.elearning.dto.DanhmucDto;
import com.vn.edu.elearning.service.BaocaobinhluanService;
import com.vn.edu.elearning.service.BaocaotailieuService;
import com.vn.edu.elearning.service.DanhmucService;
import com.vn.edu.elearning.service.MapValidationErrorService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/baocao")
public class BaocaoController {
    @Autowired
    BaocaotailieuService baocaotailieuService;
    @Autowired
    BaocaobinhluanService baocaobinhluanService;
    @Autowired
    MapValidationErrorService mapValidationErrorService;
    @PostMapping("/tailieu")
    public ResponseEntity<?> createReportDocument(@Validated @RequestBody BaocaotailieuDto dto, BindingResult result){

       ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);

       if (responseEntity != null)
       {
           return responseEntity;
       }
        Baocaotailieu entity = baocaotailieuService.save(dto);

        return new ResponseEntity<>(entity, HttpStatus.CREATED);
    }

    @PostMapping("/binhluan")
    public ResponseEntity<?> createReportComment(@Validated @RequestBody BaocaobinhluanDto dto, BindingResult result){

        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);

        if (responseEntity != null)
        {
            return responseEntity;
        }
        Baocaobinhluan entity = baocaobinhluanService.save(dto);

        return new ResponseEntity<>(entity, HttpStatus.CREATED);
    }


    @GetMapping("/tailieu")
    public ResponseEntity<?> getReportDocuments(){
        return new ResponseEntity<>(baocaotailieuService.findAll(),HttpStatus.OK);
    }

    @GetMapping("/binhluan")
    public ResponseEntity<?> getReportComments(){
        return new ResponseEntity<>(baocaobinhluanService.findAll(),HttpStatus.OK);
    }


}
