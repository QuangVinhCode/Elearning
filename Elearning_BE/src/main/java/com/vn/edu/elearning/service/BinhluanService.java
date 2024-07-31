package com.vn.edu.elearning.service;

import com.vn.edu.elearning.domain.Binhluan;
import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.BinhluanDto;
import com.vn.edu.elearning.dto.BinhluanTheoTailieuDto;
import com.vn.edu.elearning.exeception.DanhmucException;
import com.vn.edu.elearning.repository.BinhluanRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        Tailieu tailieu = new Tailieu();
        taikhoan.setMataikhoan(dto.getMataikhoan());
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
