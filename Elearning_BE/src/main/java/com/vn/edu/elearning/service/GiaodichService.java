package com.vn.edu.elearning.service;

import com.vn.edu.elearning.domain.Danhmuc;
import com.vn.edu.elearning.domain.Giaodich;
import com.vn.edu.elearning.domain.Lichsukiemduyet;
import com.vn.edu.elearning.dto.DanhmucDto;
import com.vn.edu.elearning.dto.GiaodichDto;
import com.vn.edu.elearning.dto.LichsuthuchiDto;
import com.vn.edu.elearning.exeception.DanhmucException;
import com.vn.edu.elearning.repository.DanhmucRepository;
import com.vn.edu.elearning.repository.GiaodichRepository;
import com.vn.edu.elearning.repository.TailieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GiaodichService {
    @Autowired
    private GiaodichRepository giaodichRepository;
    public Giaodich save(Giaodich entity) {
        return giaodichRepository.save(entity);
    }

    public List<Giaodich> findAllByAccount(Long id) {
        return giaodichRepository.findByTaikhoan_Mataikhoan(id);

    }

    public List<LichsuthuchiDto> findAllTransactionByAccount(Long id) {
        return giaodichRepository.findLichsuthuchiByTaikhoan(id);

    }

}
