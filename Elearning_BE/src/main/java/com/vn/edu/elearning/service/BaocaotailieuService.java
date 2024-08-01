package com.vn.edu.elearning.service;

import com.vn.edu.elearning.domain.*;
import com.vn.edu.elearning.dto.BaocaotailieuDto;
import com.vn.edu.elearning.dto.BinhluanDto;
import com.vn.edu.elearning.dto.BinhluanTheoTailieuDto;
import com.vn.edu.elearning.exeception.DanhmucException;
import com.vn.edu.elearning.repository.BaocaotailieuRepository;
import com.vn.edu.elearning.repository.BinhluanRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class BaocaotailieuService {
    @Autowired
    private BaocaotailieuRepository baocaotailieuRepository;

    @Autowired
    private TaikhoanService taikhoanService;

    @Autowired
    private TailieuService tailieuService;

    public Baocaotailieu save(BaocaotailieuDto dto) {
        Baocaotailieu entity = new Baocaotailieu();
        BeanUtils.copyProperties(dto,entity);
        Taikhoan taikhoan = taikhoanService.findById(dto.getMataikhoan());
        Tailieu tailieu = tailieuService.findById(dto.getMatailieu());
        Mabaocaotailieu mabaocaotailieu = new Mabaocaotailieu(dto.getMataikhoan(), dto.getMatailieu());
        entity.setTaikhoan(taikhoan);
        entity.setTailieu(tailieu);
        entity.setMabaocaotailieu(mabaocaotailieu);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
        entity.setThoigianbaocao(LocalDateTime.now().format(formatter));
        return baocaotailieuRepository.save(entity);
    }

    public List<Baocaotailieu> findAll() {
        return baocaotailieuRepository.findAll();
    }

    public List<Baocaotailieu> findReportsByAccount(Long matl) {
        return baocaotailieuRepository.findByTaikhoan_Mataikhoan(matl);
    }

//    public Baocaotailieu findById(Long id) {
//        Optional<Baocaotailieu> found = baocaotailieuRepository.findById(id);
//
//        if (!found.isPresent())
//        {
//            throw new DanhmucException("Bình luận có id "+ id + "không tồn tại");
//        }
//        return found.get();
//    }
//
//    public void  deleteById(Long id){
//
//        Binhluan existed = findById(id);
//        baocaotailieuRepository.delete(existed);
//    }
}
