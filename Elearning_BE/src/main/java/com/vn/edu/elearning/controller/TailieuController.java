package com.vn.edu.elearning.controller;


import com.vn.edu.elearning.domain.Dangtai;
import com.vn.edu.elearning.domain.Madangtai;
import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.LichsukiemduyetDto;
import com.vn.edu.elearning.dto.TailieuDto;
import com.vn.edu.elearning.exeception.FileNotFoundException;
import com.vn.edu.elearning.service.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/tailieu")
public class TailieuController {

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    TailieuService tailieuService;

    @Autowired
    TaikhoanService taikhoanService;

    @Autowired
    DangtaiService dangtaiService;

    @Autowired
    KiemduyetService kiemduyetService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createDocument(@Validated @ModelAttribute TailieuDto dto, BindingResult result){
        System.out.println(dto);
        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }

        Tailieu tailieu = tailieuService.save(dto);
        Taikhoan taikhoan = taikhoanService.findById(dto.getMataikhoan());

        dangtaiService.save(taikhoan,tailieu);
        LichsukiemduyetDto kiemduyet = new LichsukiemduyetDto();
        kiemduyet.setMatailieu(tailieu.getMatailieu());
        if (taikhoan.getQuyenhan().equals("Quản trị viên"))
        {
            kiemduyet.setKetqua("Đã duyệt");
        }else {
            kiemduyet.setKetqua("Chờ kiểm duyệt");
        }
        kiemduyetService.save(kiemduyet);

        return new ResponseEntity<>(tailieu, HttpStatus.CREATED);
    }

    @GetMapping("/content/{filename:.+}")
    public ResponseEntity<?> downloadFile(@PathVariable String filename, HttpServletRequest request) {
        Resource resource = fileStorageService.loadPDFFileAsResource(filename);

        String contentType = null;

        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

        }catch (Exception ex)
        {
            throw new FileNotFoundException("Không thể mở tệp tin. ");
        }

        if (contentType == null)
        {
            contentType= "application/octet-stream";
        }
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename=\""
                + resource.getFilename() + "\"")
                .body(resource);
    }

    @PatchMapping(value = "/{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateDocument(
            @PathVariable Long id,@Validated @ModelAttribute TailieuDto dto, BindingResult result){

        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }
        System.out.println("id:" + id);
        System.out.println("dto:" + dto);
        // Save the new Subject entity
        Tailieu tailieu = tailieuService.update(id,dto);


        return new ResponseEntity<>(tailieu, HttpStatus.CREATED);
    }
    @GetMapping()
    public ResponseEntity<?> getDocuments(){
        return new ResponseEntity<>(tailieuService.findAll(),HttpStatus.OK);
    }
    @GetMapping("/top")
    public ResponseEntity<?> getTop5Documents(){
        return new ResponseEntity<>(tailieuService.getTop5TaiLieuThanhToanNhieuNhat(),HttpStatus.OK);
    }

    @GetMapping("/name/{tentailieu}")
    public ResponseEntity<?> getListDocumentByName(@PathVariable("tentailieu") String tentailieu){
        return new ResponseEntity<>(tailieuService.getListDocumentByName(tentailieu),HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getDocumentsByCategory(@PathVariable("id") Long id){
        return new ResponseEntity<>(tailieuService.findAllByCategory(id),HttpStatus.OK);
    }

    @GetMapping("/censorship")
    public ResponseEntity<?> getAllDocumentCensorship(){
        return new ResponseEntity<>(tailieuService.findAllDocumentCensorship(),HttpStatus.OK);
    }

//    @GetMapping("/revenue/{id}")
//    public ResponseEntity<?> getAllDocumentRevenueByAccount(@PathVariable("id") Long id){
//        return new ResponseEntity<>(tailieuService.findAllDocumentRevenueByAccount(id),HttpStatus.OK);
//    }


//    @GetMapping("/censorship/{censorship}")
//    public ResponseEntity<?> getDocumentsByCensorship(@PathVariable("censorship") String censorship){
//        return new ResponseEntity<>(tailieuService.findAllByCensorship(censorship),HttpStatus.OK);
//    }


    @GetMapping("/{id}/get")
    public  ResponseEntity<?> getDocument(@PathVariable("id") Long id){
        return new ResponseEntity<>(tailieuService.findById(id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable("id") Long id)
    {
        tailieuService.deleteById(id);

        return  new ResponseEntity<>("Tài liệu có id " + id + " đã được xóa",HttpStatus.OK);
    }

    @GetMapping("/preview/{filename:.+}")
    public ResponseEntity<byte[]> getPDFPreview(@PathVariable String filename) {
        try {
            byte[] previewImage = fileStorageService.getPDFPreviewImage(filename);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(previewImage, headers, HttpStatus.OK);
        } catch (IOException ex) {
            throw new FileNotFoundException("Cannot load preview image for PDF file", ex);
        }
    }

    @GetMapping("/view/{filename}")
    public ResponseEntity<Resource> viewPDF(@PathVariable String filename, HttpServletRequest request) {
        Resource resource = fileStorageService.loadPDFFileAsResource(filename);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            contentType = "application/pdf";
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    private boolean hasAccessToDocument(Long username, String filename) {

        return true; // Change this to actual access check
    }

}
