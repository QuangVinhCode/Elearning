package com.vn.edu.elearning.service;

import com.vn.edu.elearning.domain.*;
import com.vn.edu.elearning.dto.DanhmucDto;
import com.vn.edu.elearning.exeception.DanhmucException;
import com.vn.edu.elearning.repository.DangtaiRepository;
import com.vn.edu.elearning.repository.DanhmucRepository;
import com.vn.edu.elearning.repository.TailieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class DangtaiService {
    @Autowired
    private DangtaiRepository dangtaiRepository;

    public Dangtai save(Taikhoan taikhoan, Tailieu tailieu) {
        Dangtai entity = new Dangtai();
        Madangtai madangtai = new Madangtai();
        madangtai.setMataikhoan(taikhoan.getMataikhoan());
        madangtai.setMatailieu(tailieu.getMatailieu());
        entity.setMadangtai(madangtai);
        entity.setTailieu(tailieu);
        entity.setTaikhoan(taikhoan);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
        entity.setThoigiantailen(LocalDateTime.now().format(formatter));
        if(taikhoan.getQuyenhan().equals("Quản trị viên"))
        {
            DateTimeFormatter Thoigianduocduyet = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
            entity.setThoigianduocduyet(LocalDateTime.now().format(Thoigianduocduyet));
        }
        return dangtaiRepository.save(entity);
    }
    public List<Dangtai> findAll() {
        return dangtaiRepository.findAll();
    }

}
