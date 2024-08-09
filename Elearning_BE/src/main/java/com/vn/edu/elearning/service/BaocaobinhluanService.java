package com.vn.edu.elearning.service;

import com.vn.edu.elearning.domain.*;
import com.vn.edu.elearning.dto.*;
import com.vn.edu.elearning.exeception.BaocaoException;
import com.vn.edu.elearning.repository.BaocaobinhluanRepository;
import com.vn.edu.elearning.repository.BaocaotailieuRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class BaocaobinhluanService {
    @Autowired
    private BaocaobinhluanRepository baocaobinhluanRepository;

    @Autowired
    private TaikhoanService taikhoanService;

    @Autowired
    private BinhluanService binhluanService;

    public Baocaobinhluan save(BaocaobinhluanDto dto) {
        Baocaobinhluan entity = new Baocaobinhluan();
        Baocaobinhluan baocaobinhluan = baocaobinhluanRepository.findByTaikhoan_MataikhoanAndBinhluan_Mabinhluan(dto.getMataikhoan(), dto.getMabinhluan());
        if (baocaobinhluan!=null)
        {
            throw new BaocaoException("Báo cáo của bạn đã được ghi nhận!");
        }
        BeanUtils.copyProperties(dto,entity);
        Taikhoan taikhoan = taikhoanService.findById(dto.getMataikhoan());
        Binhluan binhluan = binhluanService.findById(dto.getMabinhluan());
        Mabaocaobinhluan mabaocaobinhluan = new Mabaocaobinhluan(dto.getMataikhoan(), dto.getMabinhluan());
        entity.setTaikhoan(taikhoan);
        entity.setBinhluan(binhluan);
        entity.setMabaocaobinhluan(mabaocaobinhluan);
        entity.setTrangthai("Chờ xem xét");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
        entity.setThoigianbaocao(LocalDateTime.now().format(formatter));
        return baocaobinhluanRepository.save(entity);
    }

    public List<Baocaobinhluan> findAll() {
        return baocaobinhluanRepository.findAll();
    }

    public List<ThongtinbaocaobinhluanDto> findReportedCommentsInfo() {
        return baocaobinhluanRepository.findReportedCommentsInfo();
    }

    public List<TheodoibaocaoDto> findReportMonitor() {
        return baocaobinhluanRepository.findReportMonitor();
    }
    public List<Baocaobinhluan> findReportsByAccount(Long matl) {
        return baocaobinhluanRepository.findByTaikhoan_Mataikhoan(matl);
    }

    public void updateTrangthaiByMabinhluan(Long mabl,String trangthai) {
        baocaobinhluanRepository.updateTrangthaiByMabinhluan(trangthai,mabl);
    }
}
