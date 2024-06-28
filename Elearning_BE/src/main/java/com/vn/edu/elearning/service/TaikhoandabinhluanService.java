package com.vn.edu.elearning.service;


import com.vn.edu.elearning.domain.*;
import com.vn.edu.elearning.dto.BinhluanDto;
import com.vn.edu.elearning.repository.TaikhoandabinhluanRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class TaikhoandabinhluanService {
    @Autowired
    private TaikhoandabinhluanRepository taikhoandabinhluanRepository;
    public Taikhoandabinhluan save(BinhluanDto dto) {
        Taikhoandabinhluan entity = new Taikhoandabinhluan();
        Taikhoan taikhoan = new Taikhoan();
        Tailieu tailieu = new Tailieu();
        Binhluan binhluan = new Binhluan();
        Mataikhoandabinhluan mataikhoandabinhluan = new Mataikhoandabinhluan();
        mataikhoandabinhluan.setMabinhluan(dto.getMabinhluan());
        mataikhoandabinhluan.setMatailieu(dto.getMatailieu());
        mataikhoandabinhluan.setMataikhoan(dto.getMataikhoan());
        taikhoan.setMataikhoan(dto.getMataikhoan());
        tailieu.setMatailieu(dto.getMatailieu());
        binhluan.setMabinhluan(dto.getMabinhluan());

        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy");
        String formattedDateTime = currentDateTime.format(formatter);

        entity.setMataikhoandabinhluan(mataikhoandabinhluan);
        entity.setTaikhoan(taikhoan);
        entity.setTailieu(tailieu);
        entity.setBinhluan(binhluan);
        entity.setThoigianbinhluan(formattedDateTime);
        return taikhoandabinhluanRepository.save(entity);
    }

    public List<?> findAll() {
        return taikhoandabinhluanRepository.findAll();
    }

    public void  deleteById(Long matk,Long matl,Long mabl){
       taikhoandabinhluanRepository.deleteByMataikhoandabinhluan_MataikhoanAndMataikhoandabinhluan_MatailieuAndMataikhoandabinhluan_Mabinhluan(matk,matk,mabl);
    }

}
