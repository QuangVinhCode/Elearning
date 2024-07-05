package com.vn.edu.elearning.controller;

import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.dto.TaikhoanDto;
import com.vn.edu.elearning.service.MapValidationErrorService;
import com.vn.edu.elearning.service.TaiikhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/taikhoan")
public class TaikhoanController {

    @Autowired
    private TaiikhoanService taiikhoanService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping()
    public ResponseEntity<?> registerAccount(@Validated @RequestBody TaikhoanDto dto, BindingResult result) {
        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }
        Taikhoan registeredAccount = taiikhoanService.register(dto);
        return new ResponseEntity<>(registeredAccount, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<?>> getAllAccounts() {
        List<?> accounts = taiikhoanService.findAll();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/{id}/get")
    public ResponseEntity<?> getAccountById(@PathVariable("id") Long id) {
        Taikhoan account = taiikhoanService.findById(id);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @PatchMapping("/login/{username}/{password}")
    public ResponseEntity<?> loginAccount(@PathVariable("username") String username,@PathVariable("password") String password) {

        Taikhoan loggedInAccount = taiikhoanService.login(username,password);
        return new ResponseEntity<>(loggedInAccount, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccountById(@PathVariable Long id) {
        taiikhoanService.deleteById(id);
        return new ResponseEntity<>("Account with ID " + id + " has been deleted", HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable("id") Long id, @Validated @RequestBody TaikhoanDto dto, BindingResult result) {
        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }

        Taikhoan updatedAccount = taiikhoanService.update(id, dto);
        return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
    }

    @PatchMapping("/change/{id}/{oldpassword}/{newpassword}")
    public ResponseEntity<?> changePassword(@PathVariable("id") Long id,@PathVariable("oldpassword") String oldpassword,@PathVariable("newpassword") String newpassword) {
        taiikhoanService.changedPassword(id,oldpassword,newpassword);
        return new ResponseEntity<>("Đổi mật khẩu thành công", HttpStatus.OK);
    }
}
