package com.vn.edu.elearning.controller;

import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.dto.TaikhoanDto;
import com.vn.edu.elearning.service.MapValidationErrorService;
import com.vn.edu.elearning.service.TaiikhoanService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/taikhoan")
public class TaikhoanController {

    @Autowired
    private TaiikhoanService taiikhoanService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    private TaikhoanDto registeredDto; // Biến cục bộ để lưu DTO đã đăng ký

    @PostMapping()
    public ResponseEntity<?> register(@Validated @RequestBody TaikhoanDto dto, BindingResult result) {
        // Validate input DTO fields
        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }

        try {
            // Send OTP to the provided email
            taiikhoanService.registerUser(dto.getGmail());

            // Lưu DTO đã đăng ký vào biến cục bộ
            registeredDto = dto;

            // Return URL for OTP verification
            return ResponseEntity.ok(Map.of("message", "Mã xác nhận đã được gửi đến email của bạn. Vui lòng nhập mã để hoàn tất đăng ký tài khoản.",
                    "url", "http://localhost:3000/users/otp"));
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi gửi mã xác nhận: " + e.getMessage());
        }
    }


    @PatchMapping("/verify/{otp}")
    public ResponseEntity<?> verify(@PathVariable("otp") String otp) {
        if (registeredDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không có dữ liệu tài khoản để xác nhận.");
        }

        // Validate OTP
        if (taiikhoanService.verifyOTP(registeredDto.getGmail(), otp)) {
            // Đăng ký tài khoản từ DTO đã lưu
            Taikhoan registeredAccount = taiikhoanService.register(registeredDto);
            return new ResponseEntity<>(registeredAccount, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mã xác nhận không đúng. Vui lòng kiểm tra lại.");
        }
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

    @GetMapping("/status")
    public ResponseEntity<?> getAccountsByStatus() {
        List<Taikhoan> taikhoanList = taiikhoanService.findBinhThuongWithoutAdmin();
        return new ResponseEntity<>(taikhoanList, HttpStatus.OK);
    }

    @GetMapping("/stateless")
    public ResponseEntity<?> getAccountsByStateless() {
        List<Taikhoan> taikhoanList = taiikhoanService.findNotBinhThuongWithoutAdmin();
        return new ResponseEntity<>(taikhoanList, HttpStatus.OK);
    }

    @PatchMapping("/login/{username}/{password}")
    public ResponseEntity<?> loginAccount(@PathVariable("username") String username,@PathVariable("password") String password) {

        Taikhoan loggedInAccount = taiikhoanService.login(username,password);
        return new ResponseEntity<>(loggedInAccount, HttpStatus.OK);
    }

    @PatchMapping("/status/{id}/{status}")
    public ResponseEntity<?> statusAccount(@PathVariable("id") Long id,@PathVariable("status") String status) {
        taiikhoanService.updateTrangThai(id,status);
        Taikhoan taikhoan = taiikhoanService.findById(id);
        return new ResponseEntity<>(taikhoan, HttpStatus.OK);
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
