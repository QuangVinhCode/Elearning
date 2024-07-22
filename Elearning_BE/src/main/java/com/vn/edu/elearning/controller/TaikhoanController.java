package com.vn.edu.elearning.controller;

import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.dto.TaikhoanDto;
import com.vn.edu.elearning.exeception.TaikhoanException;
import com.vn.edu.elearning.service.MapValidationErrorService;
import com.vn.edu.elearning.service.TaikhoanService;
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
    private TaikhoanService taikhoanService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    private TaikhoanDto registeredDto; // Biến cục bộ để lưu DTO đã đăng ký

    private Taikhoan taikhoan;

    @PostMapping()
    public ResponseEntity<?> register(@Validated @RequestBody TaikhoanDto dto, BindingResult result) {
        // Validate input DTO fields
        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }

        try {
            // Send OTP to the provided email
            taikhoanService.registerUser(dto.getGmail());

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
        if (taikhoanService.verifyOTP(registeredDto.getGmail(), otp)) {
            // Đăng ký tài khoản từ DTO đã lưu
            Taikhoan registeredAccount = taikhoanService.register(registeredDto);
            return new ResponseEntity<>(registeredAccount, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Mã xác nhận không chính xác!"));
        }
    }

    @PatchMapping("/forget/{tendangnhap}/{gmail}")
    public ResponseEntity<?> forgotPassword(@PathVariable("tendangnhap") String tendangnhap, @PathVariable("gmail") String gmail ) {
        // Validate input DTO fields
        taikhoan = taikhoanService.findByTendangnhapAndGmail(tendangnhap,gmail);
        try {
            // Send OTP to the provided email
            taikhoanService.forgotUser(gmail);

            // Return URL for OTP verification
            return ResponseEntity.ok(Map.of("message", "Mã xác nhận đã được gửi đến email của bạn. Vui lòng nhập mã để hoàn tất lấy lại tài khoản.",
                    "url", "http://localhost:3000/users/otp-forget"));
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi gửi mã xác nhận: " + e.getMessage());
        }
    }
    @PatchMapping("/confirm/{otp}")
    public ResponseEntity<?> confirm(@PathVariable("otp") String otp) {
        if (taikhoan == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không có dữ liệu tài khoản để xác nhận.");
        }
        // Validate OTP
        if (taikhoanService.verifyOTP(taikhoan.getGmail(), otp)) {
            return ResponseEntity.ok(Map.of("message", "Thành công lấy lại tài khoản!",
                    "url", "http://localhost:3000/users/reset"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Mã xác nhận không chính xác!"));
        }
    }

    @PatchMapping("/reset/{password}")
    public ResponseEntity<?> newPassword(@PathVariable("password") String password) {
        taikhoanService.forgotPassword(taikhoan,password);
        return new ResponseEntity<>("Mật khẩu mới đã có thể sử dụng", HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<?>> getAllAccounts() {
        List<?> accounts = taikhoanService.findAll();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/{id}/get")
    public ResponseEntity<?> getAccountById(@PathVariable("id") Long id) {
        Taikhoan account = taikhoanService.findById(id);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @GetMapping("/status")
    public ResponseEntity<?> getAccountsByStatus() {
        List<Taikhoan> taikhoanList = taikhoanService.findBinhThuongWithoutAdmin();
        return new ResponseEntity<>(taikhoanList, HttpStatus.OK);
    }

    @GetMapping("/stateless")
    public ResponseEntity<?> getAccountsByStateless() {
        List<Taikhoan> taikhoanList = taikhoanService.findNotBinhThuongWithoutAdmin();
        return new ResponseEntity<>(taikhoanList, HttpStatus.OK);
    }

    @PatchMapping("/login/{username}/{password}")
    public ResponseEntity<?> loginAccount(@PathVariable("username") String username,@PathVariable("password") String password) {

        Taikhoan loggedInAccount = taikhoanService.login(username,password);
        return new ResponseEntity<>(loggedInAccount, HttpStatus.OK);
    }

    @PatchMapping("/status/{id}/{status}")
    public ResponseEntity<?> statusAccount(@PathVariable("id") Long id,@PathVariable("status") String status) {
        taikhoanService.updateTrangThai(id,status);
        Taikhoan taikhoan = taikhoanService.findById(id);
        return new ResponseEntity<>(taikhoan, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccountById(@PathVariable Long id) {
        taikhoanService.deleteById(id);
        return new ResponseEntity<>("Account with ID " + id + " has been deleted", HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable("id") Long id, @Validated @RequestBody TaikhoanDto dto, BindingResult result) {
        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }

        Taikhoan updatedAccount = taikhoanService.update(id, dto);
        return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
    }

    @PatchMapping("/change/{id}/{oldpassword}/{newpassword}")
    public ResponseEntity<?> changePassword(@PathVariable("id") Long id,@PathVariable("oldpassword") String oldpassword,@PathVariable("newpassword") String newpassword) {
        taikhoanService.changedPassword(id,oldpassword,newpassword);
        return new ResponseEntity<>("Đổi mật khẩu thành công", HttpStatus.OK);
    }
}
