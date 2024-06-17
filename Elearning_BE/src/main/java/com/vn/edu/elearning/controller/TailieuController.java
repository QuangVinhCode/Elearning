package com.vn.edu.elearning.controller;


import com.vn.edu.elearning.domain.Mataikhoandangbantailieu;
import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.domain.Taikhoandangbantailieu;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.TailieuDto;
import com.vn.edu.elearning.exeception.FileNotFoundException;
import com.vn.edu.elearning.repository.TaikhoandangbantailieuRepository;
import com.vn.edu.elearning.service.FileStorageService;
import com.vn.edu.elearning.service.MapValidationErrorService;
import com.vn.edu.elearning.service.TaikhoandangbantailieuService;
import com.vn.edu.elearning.service.TailieuService;
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


@RestController
@CrossOrigin
@RequestMapping("/api/v1/tailieu")
public class TailieuController {

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    TailieuService tailieuService;

    @Autowired
    TaikhoandangbantailieuService taikhoandangbantailieuService;

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

        // Save the new Subject entity
        Tailieu tailieu = tailieuService.save(dto);
        Mataikhoandangbantailieu mataikhoandangbantailieu = new Mataikhoandangbantailieu();
        Taikhoan taikhoan = new Taikhoan();
        Taikhoandangbantailieu taikhoandangbantailieu = new Taikhoandangbantailieu();

        taikhoan.setMataikhoan(dto.getMataikhoan());
        mataikhoandangbantailieu.setMataikhoan(dto.getMataikhoan());
        mataikhoandangbantailieu.setMatailieu(tailieu.getMatailieu());
        taikhoandangbantailieu.setMataikhoandangbantailieu(mataikhoandangbantailieu);
        taikhoandangbantailieu.setTailieu(tailieu);
        taikhoandangbantailieu.setTaikhoan(taikhoan);

        taikhoandangbantailieuService.save(taikhoandangbantailieu);

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
}
