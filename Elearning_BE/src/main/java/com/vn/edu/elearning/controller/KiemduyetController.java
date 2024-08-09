package com.vn.edu.elearning.controller;


import com.vn.edu.elearning.domain.Lichsukiemduyet;
import com.vn.edu.elearning.domain.Madangtai;
import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.KiemduyettailieuDto;
import com.vn.edu.elearning.dto.LichsukiemduyetDto;
import com.vn.edu.elearning.service.KiemduyetService;
import com.vn.edu.elearning.service.MapValidationErrorService;
import com.vn.edu.elearning.service.TaikhoanService;
import com.vn.edu.elearning.service.TailieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/kiemduyet")
public class KiemduyetController {
    @Autowired
    KiemduyetService kiemduyetService;
    @Autowired
    TailieuService tailieuService;
    @Autowired
    TaikhoanService taikhoanService;
    @Autowired
    MapValidationErrorService mapValidationErrorService;

    @PostMapping
    public ResponseEntity<?> createCensorship(@Validated @RequestBody LichsukiemduyetDto dto, BindingResult result){

       ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);

       if (responseEntity != null)
       {
           return responseEntity;
       }
       Lichsukiemduyet entity = kiemduyetService.save(dto);
        Taikhoan taikhoan = taikhoanService.findByPostedDocuments(dto.getMatailieu());
        Tailieu tailieu = tailieuService.findById(dto.getMatailieu());
        Madangtai madangtai = new Madangtai(taikhoan.getMataikhoan(),dto.getMatailieu());
        System.out.println("tai khoan " + taikhoan.getTendangnhap());
        System.out.println("madangtai " + madangtai.getMataikhoan());
        if (entity.getKetqua().equals("Đã duyệt"))
        {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
            String thoigian = LocalDateTime.now().format(formatter);
            kiemduyetService.updateCensorshipTime(thoigian,taikhoan,tailieu);
            tailieuService.updateTrangthai("Đã kiểm duyệt",entity.getTailieu().getMatailieu());
        }else {
            tailieuService.updateTrangthai("Cần chỉnh sửa",entity.getTailieu().getMatailieu());
        }


        return new ResponseEntity<>(entity, HttpStatus.CREATED);
    }

    @GetMapping("/document/{id}")
    public  ResponseEntity<?> getCensorshipByDocument(@PathVariable("id") Long id){
        return new ResponseEntity<>(kiemduyetService.findAllByDocument(id),HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity<?> getCensorshipList(){
        return new ResponseEntity<>(kiemduyetService.findAll(),HttpStatus.OK);
    }

    @GetMapping("/{id}/get")
    public  ResponseEntity<?> getCensorship(@PathVariable("id") Long id){
        return new ResponseEntity<>(kiemduyetService.findById(id),HttpStatus.OK);
    }

}
