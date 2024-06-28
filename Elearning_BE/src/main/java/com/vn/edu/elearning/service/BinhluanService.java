package com.vn.edu.elearning.service;

import com.vn.edu.elearning.domain.Binhluan;
import com.vn.edu.elearning.dto.BinhluanDto;
import com.vn.edu.elearning.dto.TaikhoanBinhluanDto;
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

    public Binhluan save(BinhluanDto dto) {
        Binhluan entity = new Binhluan();
        BeanUtils.copyProperties(dto,entity);
        return binhluanRepository.save(entity);
    }

    public List<Binhluan> findAll() {
        return binhluanRepository.findAll();
    }

    public List<TaikhoanBinhluanDto> findAllByDocument(Long matl) {
        return binhluanRepository.findCommentsByTailieuId(matl);
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
