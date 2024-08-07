package com.vn.edu.elearning.service;

import com.vn.edu.elearning.domain.Binhluan;
import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.BinhluanConTheoTailieuDto;
import com.vn.edu.elearning.dto.BinhluanDto;
import com.vn.edu.elearning.dto.BinhluanTheoTailieuDto;
import com.vn.edu.elearning.exeception.DanhmucException;
import com.vn.edu.elearning.repository.BinhluanRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class BinhluanService {
    @Autowired
    private BinhluanRepository binhluanRepository;

    @Autowired
    private TaikhoanService taikhoanService;

    public Binhluan save(BinhluanDto dto) {
        Binhluan entity = new Binhluan();
        BeanUtils.copyProperties(dto,entity);
        Taikhoan taikhoan = taikhoanService.findById(dto.getMataikhoan());
        if (taikhoan.getTrangthaibinhluan().equals("Bình thường"))
        {
            entity.setTrangthai("Thành công");
        }
        else {
            entity.setTrangthai("Thất bại");
        }
        Tailieu tailieu = new Tailieu();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
        entity.setThoigianbinhluan(LocalDateTime.now().format(formatter));
        tailieu.setMatailieu(dto.getMatailieu());
        entity.setTaikhoan(taikhoan);
        entity.setTailieu(tailieu);
        return binhluanRepository.save(entity);
    }

    public List<Binhluan> findAll() {
        return binhluanRepository.findAll();
    }

    public List<Binhluan> findAllByAccount(Long id) {
        return binhluanRepository.findByTaikhoan_Mataikhoan(id);
    }

    public List<BinhluanTheoTailieuDto> findBinhluansByMatailieu(Long matl) {
        return binhluanRepository.findBinhluansByMatailieu(matl);
    }

    public List<BinhluanConTheoTailieuDto> findBinhluanconsByMatailieu(Long mabl) {
        return binhluanRepository.findBinhluansByMatbinhluandatraloi(mabl);
    }

    public Binhluan findById(Long id) {
        Optional<Binhluan> found = binhluanRepository.findById(id);

        if (!found.isPresent())
        {
            throw new DanhmucException("Bình luận có id "+ id + "không tồn tại");
        }
        return found.get();
    }

    public void  deleteById(Long id){

        Binhluan existed = findById(id);
        binhluanRepository.delete(existed);
    }
}
