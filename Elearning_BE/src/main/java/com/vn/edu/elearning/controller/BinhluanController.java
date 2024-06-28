package com.vn.edu.elearning.controller;

import com.vn.edu.elearning.domain.Binhluan;
import com.vn.edu.elearning.dto.BinhluanDto;
import com.vn.edu.elearning.service.BinhluanService;
import com.vn.edu.elearning.service.MapValidationErrorService;
import com.vn.edu.elearning.service.TaikhoandabinhluanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/binhluan")
public class BinhluanController {
    @Autowired
    BinhluanService binhluanService;

    @Autowired
    TaikhoandabinhluanService taikhoandabinhluanService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;


    @PostMapping
    public ResponseEntity<?> createComment(@Validated @RequestBody BinhluanDto dto, BindingResult result){

       ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);

       if (responseEntity != null)
       {
           return responseEntity;
       }
        Binhluan entity = binhluanService.save(dto);

        if (entity!=null)
        {
            dto.setMabinhluan(entity.getMabinhluan());
            taikhoandabinhluanService.save(dto);
        }
        return new ResponseEntity<>(entity, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<?> getComments(){
        return new ResponseEntity<>(binhluanService.findAll(),HttpStatus.OK);
    }
    @GetMapping("/document/{id}")
    public ResponseEntity<?> getCommentsByDocument(@PathVariable("id") Long id){
        return new ResponseEntity<>(binhluanService.findAllByDocument(id),HttpStatus.OK);
    }

    @GetMapping("/{id}/get")
    public  ResponseEntity<?> getComment(@PathVariable("id") Long id){
        return new ResponseEntity<>(binhluanService.findById(id),HttpStatus.OK);
    }

    @DeleteMapping("/{matk}/{matl}/{mabl}")
    public ResponseEntity<?> deleteComment(@PathVariable("matk") Long matk,@PathVariable("matl") Long matl,@PathVariable("mabl") Long mabl)
    {
        taikhoandabinhluanService.deleteById(matk,matl,mabl);
        binhluanService.deleteById(mabl);
        return  new ResponseEntity<>("Xóa thành công",HttpStatus.OK);
    }
}
