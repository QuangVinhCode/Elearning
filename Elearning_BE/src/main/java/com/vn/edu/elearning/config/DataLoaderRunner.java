package com.vn.edu.elearning.config;

import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.repository.TaikhoanRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class DataLoaderRunner {

    @Autowired
    private final TaikhoanRepository taikhoanRepository;
    @Autowired
    public DataLoaderRunner(TaikhoanRepository taikhoanRepository) {
        this.taikhoanRepository = taikhoanRepository;
    }

    @PostConstruct
    public void init() {
        if (taikhoanRepository.count() == 0) {
            // Create admin account if no accounts exist
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            Taikhoan adminAccount = new Taikhoan();
            adminAccount.setMataikhoan(111111111111111L);
            adminAccount.setTendangnhap("admin");
            adminAccount.setMatkhau(passwordEncoder.encode("1234"));
            adminAccount.setSodienthoai("0123456789");
            adminAccount.setGmail("admin@gmail.com");
            adminAccount.setQuyenhan("Quản trị viên");
            adminAccount.setSodu(0L);
            adminAccount.setTrangthaidangtai("Bình thường");
            adminAccount.setTrangthaibinhluan("Bình thường");

            taikhoanRepository.save(adminAccount);
        }
//        LocalDate currentDate = LocalDate.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
//        String currentDateString = currentDate.format(formatter);
//
//        taikhoanRepository.updateTrangthaiIfDateMatches(currentDateString);
    }
}
