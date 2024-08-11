package com.vn.edu.elearning.service;

import com.vn.edu.elearning.domain.*;
import com.vn.edu.elearning.dto.*;
import com.vn.edu.elearning.exeception.BaocaoException;
import com.vn.edu.elearning.exeception.DanhmucException;
import com.vn.edu.elearning.exeception.TailieuException;
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

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");

    public Baocaotailieu save(BaocaotailieuDto dto) {
        Baocaotailieu entity = new Baocaotailieu();
        BeanUtils.copyProperties(dto,entity);
        Taikhoan taikhoan = taikhoanService.findById(dto.getMataikhoan());
        Tailieu tailieu = tailieuService.findById(dto.getMatailieu());
        if (taikhoan!=null)
        {
            throw  new BaocaoException("Tài khoản không tồn tại");
        }
        if (tailieu!=null)
        {
            throw  new BaocaoException("Tài liệu không tồn tại");
        }
        boolean check = isReportAllowed(taikhoan,tailieu);
        if (!check)
        {
            throw  new BaocaoException("Báo cáo tài liệu này chỉ được phép thực hiện nếu cách báo cáo gần nhất ít nhất 1 giờ.");
        }
        entity.setTaikhoan(taikhoan);
        entity.setTailieu(tailieu);
        entity.setThoigianbaocao(LocalDateTime.now().format(FORMATTER));
        return baocaotailieuRepository.save(entity);
    }

    public List<Baocaotailieu> findAll() {
        return baocaotailieuRepository.findAll();
    }

    public List<Baocaotailieu> findReportsByDocument(Long id) {
        return baocaotailieuRepository.findByTailieu_Matailieu(id);
    }

    public List<ThongtinbaocaotailieuDto> findReportedDocumentInfo() {
        return baocaotailieuRepository.findReportedDocumentInfo();
    }

    public List<TheodoibaocaoDto> findReportMonitor() {
        return baocaotailieuRepository.findReportMonitor();
    }
    public List<Baocaotailieu> findReportsByAccount(Long matl) {
        return baocaotailieuRepository.findByTaikhoan_Mataikhoan(matl);
    }

    public boolean isReportAllowed(Taikhoan taikhoan, Tailieu tailieu) {
        Optional<Baocaotailieu> latestReportOpt = baocaotailieuRepository.findLatestReportForDocument(taikhoan, tailieu);

        if (latestReportOpt.isPresent()) {
            Baocaotailieu latestReport = latestReportOpt.get();
            LocalDateTime latestReportTime = LocalDateTime.parse(latestReport.getThoigianbaocao(), FORMATTER);
            LocalDateTime currentDateTime = LocalDateTime.now();
            // Kiểm tra xem báo cáo hiện tại có cách báo cáo gần nhất ít nhất 1 giờ
            return currentDateTime.isAfter(latestReportTime.plusHours(1));
        }
        // Nếu không có báo cáo nào, có thể cho phép báo cáo mới
        return true;
    }
}
