package com.vn.edu.elearning.controller;

import com.vn.edu.elearning.domain.Taikhoanthanhtoantailieu;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.PaymentDTO;
import com.vn.edu.elearning.exeception.ResponseObject;
import com.vn.edu.elearning.service.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/thanhtoan")
@RequiredArgsConstructor
public class ThanhtoanController {
    private final PaymentService paymentService;
    @Autowired
    TailieuService tailieuService;
    @Autowired
    private TaikhoanthanhtoantailieuService taikhoanthanhtoantailieuService;
    private Long amount;
    private Long account;

    @Autowired
    private TaikhoandangbantailieuService taikhoandangbantailieuService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;
    @GetMapping("/check/{tk}/{tl}")
    public ResponseEntity<?> checkDocumentViewingPermissions(@PathVariable("tk") Long tk, @PathVariable("tl") Long tl) {
        String check = "Chưa thanh toán";
        boolean checkSalesAccount = taikhoandangbantailieuService.checkSalesAccount(tk,tl);
        boolean checkBuyAccount = taikhoanthanhtoantailieuService.checkBuyAccount(tk,tl);
        Tailieu tailieu = tailieuService.findById(tl);
        if (tailieu != null)
        {
            check = "Miễn phí";
        }
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
        Tailieu tailieu = tailieuService.findById(tl);
        Long adminShare = tailieu.getGiaban() / 10;
        Long userShare = tailieu.getGiaban() - adminShare;

        System.out.println("Mã tài khoản " + tk);
        System.out.println("Giá tài liệu " + tailieu.getGiaban());
        System.out.println("Admin share: " + adminShare);
        System.out.println("User share: " + userShare);
        Taikhoanthanhtoantailieu taikhoanthanhtoantailieu = taikhoanthanhtoantailieuService.save(tk,tl,tailieu.getGiaban(),adminShare,userShare);
        if (taikhoanthanhtoantailieu!=null)
        {
            Long matk = taikhoanthanhtoantailieuService.findFirstMataikhoanByMatailieu(taikhoanthanhtoantailieu.getTailieu().getMatailieu());
            Long giaTL = taikhoanthanhtoantailieu.getTailieu().getGiaban();

            taikhoanthanhtoantailieuService.incrementSodu(matk, userShare);

            taikhoanthanhtoantailieuService.incrementSoduForAdmin(adminShare);
        }
        return new ResponseEntity<>(taikhoanthanhtoantailieu, HttpStatus.OK);
    }
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
