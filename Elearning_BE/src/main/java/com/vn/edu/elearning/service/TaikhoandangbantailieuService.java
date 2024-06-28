package com.vn.edu.elearning.service;


import com.vn.edu.elearning.domain.Danhmuc;
import com.vn.edu.elearning.domain.Mataikhoandangbantailieu;
import com.vn.edu.elearning.domain.Taikhoandangbantailieu;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.TaikhoandangbantailieuDto;
import com.vn.edu.elearning.dto.TailieuDto;
import com.vn.edu.elearning.exeception.TailieuException;
import com.vn.edu.elearning.repository.TaikhoandangbantailieuRepository;
import com.vn.edu.elearning.repository.TailieuRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class TaikhoandangbantailieuService {
    @Autowired
    private TaikhoandangbantailieuRepository taikhoandangbantailieuRepository;
    public Taikhoandangbantailieu save(Taikhoandangbantailieu dto) {
        Taikhoandangbantailieu entity = new Taikhoandangbantailieu();
        BeanUtils.copyProperties(dto,entity);
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy");
        String formattedDateTime = currentDateTime.format(formatter);
        entity.setThoigiandangban(formattedDateTime);
        return taikhoandangbantailieuRepository.save(entity);
    }

    public List<?> findAll() {
        return taikhoandangbantailieuRepository.findAll();
    }


    public boolean checkSalesAccount(Long matk,Long matl) {
        Optional<Taikhoandangbantailieu> found = taikhoandangbantailieuRepository.findByTaikhoan_MataikhoanAndTailieu_Matailieu(matk,matl);
        if(found.isPresent())
            return true;
        return false;
    }

}
