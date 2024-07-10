package com.vn.edu.elearning.controller;

import com.vn.edu.elearning.dto.PaymentDTO;
import com.vn.edu.elearning.exeception.ResponseObject;
import com.vn.edu.elearning.service.PaymentService;
import com.vn.edu.elearning.service.TaiikhoanService;
import com.vn.edu.elearning.service.TaikhoanthanhtoantailieuService;
import com.vn.edu.elearning.service.TailieuService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    private TaikhoanthanhtoantailieuService taikhoanthanhtoantailieuService;
    private Long amount;
    private Long account;
    @GetMapping("/vn-pay")
    public ResponseObject<PaymentDTO.VNPayResponse> pay(HttpServletRequest request) {
        amount = Long.parseLong(request.getParameter("amount"));
        account = Long.parseLong(request.getParameter("account"));

        return new ResponseObject<>(HttpStatus.OK, "Success", paymentService.createVnPayPayment(request));
    }
    @GetMapping("/vn-pay-callback")
    public ResponseEntity<Void> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        System.out.println("amount" + amount);
        System.out.println("account" + account);
        if ("00".equals(status)) {
            taikhoanthanhtoantailieuService.incrementSodu(account,amount);
            // Thanh toán thành công, chuyển hướng về trang cá nhân của người dùng
            return ResponseEntity.status(HttpStatus.FOUND)
                    .header("Location", "http://localhost:3000/users/profile/accountsettings?message=success")
                    .build();
        } else {
            // Xử lý khi thanh toán thất bại, chuyển hướng về trang cá nhân của người dùng
            return ResponseEntity.status(HttpStatus.FOUND)
                    .header("Location", "http://localhost:3000/users/profile/accountsettings?message=error")
                    .build();
        }
    }
}
