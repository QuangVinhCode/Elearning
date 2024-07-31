package com.vn.edu.elearning.service;

import com.vn.edu.elearning.domain.*;
import com.vn.edu.elearning.dto.ThanhtoanDto;
import com.vn.edu.elearning.exeception.TailieuException;
import com.vn.edu.elearning.repository.DangtaiRepository;
import com.vn.edu.elearning.repository.GiaodichRepository;
import com.vn.edu.elearning.repository.ThanhtoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ThanhtoanService {
    @Autowired
    private ThanhtoanRepository thanhtoanRepository;

    @Autowired
    TaikhoanService taikhoanService;

    @Autowired
    TailieuService tailieuService;

    @Autowired
    GiaodichService giaodichService;
    @Autowired
    private GiaodichRepository giaodichRepository;

    public Thanhtoan save(ThanhtoanDto dto) {
        Thanhtoan entity = new Thanhtoan();
        Mathanhtoan mathanhtoan = new Mathanhtoan();
        Tailieu tailieu = tailieuService.findById(dto.getMatailieu());
        Taikhoan taikhoan = taikhoanService.findById(dto.getMataikhoan());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
        if (taikhoan==null)
        {
            throw  new TailieuException("Yêu cầu đăng nhập");
        }
        if (taikhoan.getSodu() < tailieu.getGiaban())
        {
            throw  new TailieuException("Số dư trong tài khoản không đủ!");
        }
        else {
            Taikhoan taikhoandangtai  = taikhoanService.findByPostedDocuments(dto.getMatailieu());
            Long giaban = tailieu.getGiaban();
            Giaodich giaodichTacgia = new Giaodich();
            Giaodich giaodichAdmin = new Giaodich();
            Giaodich giaodichThanhtoan = new Giaodich();
            dto.setTrangthai("Thành công");
            if (taikhoandangtai.getQuyenhan().equals("Quản trị viên"))
            {
                Long soduTK = taikhoan.getSodu() - tailieu.getGiaban();
                taikhoanService.incrementSodu(taikhoandangtai.getMataikhoan(),giaban);
                taikhoanService.updateSodu(taikhoan.getMataikhoan(),soduTK);

                giaodichTacgia.setLydo("Thu nhập từ bán tài liệu " + tailieu.getTentailieu());
                giaodichTacgia.setSotien(giaban);
                giaodichTacgia.setThoigiangiaodich(LocalDateTime.now().format(formatter));
                giaodichTacgia.setTaikhoan(taikhoandangtai);
                giaodichTacgia.setTrangthai("Thành công");
                giaodichRepository.save(giaodichTacgia);

                giaodichThanhtoan.setLydo("Thanh toán tài liệu " + tailieu.getTentailieu());
                giaodichThanhtoan.setSotien(giaban);
                giaodichThanhtoan.setThoigiangiaodich(LocalDateTime.now().format(formatter));
                giaodichThanhtoan.setTaikhoan(taikhoan);
                giaodichThanhtoan.setTrangthai("Thành công");
                giaodichRepository.save(giaodichThanhtoan);

            }else {
                Long phiquangtri = (tailieu.getGiaban() / 10) * tailieu.getTylephiquantri();
                Long thunhaptacgia = (tailieu.getGiaban() / 10) * tailieu.getTylethunhaptacgia();
                Long soduTK = taikhoan.getSodu() - tailieu.getGiaban();
                System.out.println("phiquangtri " + phiquangtri);
                System.out.println("thunhaptacgia " + thunhaptacgia);
                System.out.println("soduTK " + soduTK);
                taikhoanService.incrementSoduForAdmin(phiquangtri);
                taikhoanService.incrementSodu(taikhoandangtai.getMataikhoan(),thunhaptacgia);
                taikhoanService.updateSodu(taikhoan.getMataikhoan(),soduTK);

                giaodichTacgia.setLydo("Thu nhập từ bán tài liệu " + tailieu.getTentailieu());
                giaodichTacgia.setSotien(thunhaptacgia);
                giaodichTacgia.setThoigiangiaodich(LocalDateTime.now().format(formatter));
                giaodichTacgia.setTaikhoan(taikhoandangtai);
                giaodichTacgia.setTrangthai("Thành công");
                giaodichRepository.save(giaodichTacgia);

                Taikhoan taikhoanadmin = taikhoanService.findAccountRole("Quản trị viên");
                giaodichAdmin.setLydo("Thu nhập từ thu phí quản trị tài liệu " + tailieu.getTentailieu());
                giaodichAdmin.setSotien(phiquangtri);
                giaodichAdmin.setThoigiangiaodich(LocalDateTime.now().format(formatter));
                giaodichAdmin.setTaikhoan(taikhoanadmin);
                giaodichAdmin.setTrangthai("Thành công");
                giaodichRepository.save(giaodichAdmin);

                giaodichThanhtoan.setLydo("Thanh toán tài liệu " + tailieu.getTentailieu());
                giaodichThanhtoan.setSotien(giaban);
                giaodichThanhtoan.setThoigiangiaodich(LocalDateTime.now().format(formatter));
                giaodichThanhtoan.setTaikhoan(taikhoan);
                giaodichThanhtoan.setTrangthai("Thành công");
                giaodichRepository.save(giaodichThanhtoan);
            }

        }
        mathanhtoan.setMatailieu(dto.getMatailieu());
        entity.setTailieu(tailieu);
        entity.setTaikhoan(taikhoan);
        entity.setTrangthai(dto.getTrangthai());
        entity.setMathanhtoan(mathanhtoan);
        entity.setThoigianthanhtoan(LocalDateTime.now().format(formatter));
        return thanhtoanRepository.save(entity);
    }
    public List<Thanhtoan> findAll() {
        return thanhtoanRepository.findAll();
    }

    public boolean checkThanhtoan(Long taikhoan, Long tailieu) {
        Thanhtoan thanhtoan = thanhtoanRepository.findByTaikhoan_MataikhoanAndTailieu_Matailieu(taikhoan,tailieu);
        if (thanhtoan != null)
        {
            return  true;
        }
        return  false;
    }
}
