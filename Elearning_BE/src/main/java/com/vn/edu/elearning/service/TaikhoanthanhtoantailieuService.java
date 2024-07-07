package com.vn.edu.elearning.service;


import com.vn.edu.elearning.domain.*;
import com.vn.edu.elearning.exeception.TaikhoanthanhtoantailieuException;
import com.vn.edu.elearning.exeception.TailieuException;
import com.vn.edu.elearning.repository.TaikhoanRepository;
import com.vn.edu.elearning.repository.TaikhoandangbantailieuRepository;
import com.vn.edu.elearning.repository.TaikhoanthanhtoantailieuRepository;
import com.vn.edu.elearning.repository.TailieuRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class TaikhoanthanhtoantailieuService {

    @Autowired
    private TaikhoanRepository taikhoanRepository;
    @Autowired
    private TailieuRepository tailieuRepository;
    @Autowired
    private TaikhoandangbantailieuRepository taikhoandangbantailieuRepository;
    @Autowired
    private TaikhoanthanhtoantailieuRepository taikhoanthanhtoantailieuRepository;
    public Taikhoanthanhtoantailieu save(Long matk,Long matl) {
        Taikhoanthanhtoantailieu entity = new Taikhoanthanhtoantailieu();
        Mataikhoanthanhtoantailieu mataikhoanthanhtoantailieu = new Mataikhoanthanhtoantailieu();
        Taikhoan taikhoan = new Taikhoan();
        Tailieu tailieu = new Tailieu();
        var exitTK = taikhoanRepository.findById(matk);
        if (!exitTK.isPresent())
        {
            throw  new TaikhoanthanhtoantailieuException("Yêu cầu đăng nhập!");
        }
        var exitTL = tailieuRepository.findById(matl);
        if (!exitTL.isPresent())
        {
            throw  new TaikhoanthanhtoantailieuException("Tài liệu không tồn tại");
        }
        Optional<Taikhoanthanhtoantailieu> checkThanhtoan = taikhoanthanhtoantailieuRepository.findByTaikhoan_MataikhoanAndTailieu_Matailieu(matk,matl);
        if(checkThanhtoan.isPresent())
        {
            throw  new TaikhoanthanhtoantailieuException("Đã thanh toán");
        }
        Long soduTK = exitTK.get().getSodu();
        Long soduTL = exitTL.get().getGiaban();
        System.out.println("soduTK " + soduTK);
        System.out.println("soduTL " + soduTL);
        if (soduTL > soduTK)
        {
            throw  new TaikhoanthanhtoantailieuException("Số dư trong tài khoản không đủ");
        }
        else {
            Long sodumoi = soduTK - soduTL;
            System.out.println("matk " + matk);
            System.out.println("soduTL " + sodumoi);
            updateSodu(matk,sodumoi);
        }

        mataikhoanthanhtoantailieu.setMataikhoan(matk);
        mataikhoanthanhtoantailieu.setMatailieu(matl);
        taikhoan.setMataikhoan(matk);
        tailieu.setMatailieu(matl);
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy");
        String formattedDateTime = currentDateTime.format(formatter);
        entity.setMataikhoanthanhtoantailieu(mataikhoanthanhtoantailieu);
        entity.setTaikhoan(taikhoan);
        entity.setTailieu(tailieu);
        entity.setThoigianthanhtoan(formattedDateTime);
        return taikhoanthanhtoantailieuRepository.save(entity);
    }

    public void updateSodu(Long mataikhoan, Long sodu) {
        taikhoanRepository.updateSodu(mataikhoan, sodu);
    }

    public void incrementSodu(Long mataikhoan, Long sodu) {

        taikhoanRepository.incrementSodu(mataikhoan,sodu);
    }

    public void incrementSoduForAdmin(Long sodu) {

        taikhoanRepository.incrementSoduForAdmin(sodu);
    }

    public Long findFirstMataikhoanByMatailieu(Long matl) {
       Optional<Long> found  = taikhoandangbantailieuRepository.findFirstMataikhoanByMatailieu(matl);
       return  found.get();
    }
    public List<?> findAll() {
        return taikhoanthanhtoantailieuRepository.findAll();
    }


    public boolean checkBuyAccount(Long matk,Long matl) {
        Optional<Taikhoanthanhtoantailieu> found = taikhoanthanhtoantailieuRepository.findByTaikhoan_MataikhoanAndTailieu_Matailieu(matk,matl);
        if(found.isPresent())
            return true;
        return false;
    }

}
