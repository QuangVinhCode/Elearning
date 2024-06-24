package com.vn.edu.elearning.service;


import com.vn.edu.elearning.domain.Taikhoandangbantailieu;
import com.vn.edu.elearning.domain.Taikhoanthanhtoantailieu;
import com.vn.edu.elearning.repository.TaikhoandangbantailieuRepository;
import com.vn.edu.elearning.repository.TaikhoanthanhtoantailieuRepository;
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
    private TaikhoanthanhtoantailieuRepository taikhoanthanhtoantailieuRepository;
    public Taikhoanthanhtoantailieu save(Taikhoandangbantailieu dto) {
        Taikhoanthanhtoantailieu entity = new Taikhoanthanhtoantailieu();
        BeanUtils.copyProperties(dto,entity);
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ss:mm:HH dd-MM-yyyy");
        String formattedDateTime = currentDateTime.format(formatter);
        entity.setThoigianthanhtoan(formattedDateTime);
        return taikhoanthanhtoantailieuRepository.save(entity);
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
