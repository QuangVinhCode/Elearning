package com.vn.edu.elearning.service;


import com.vn.edu.elearning.domain.Danhmuc;
import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.KiemduyettailieuDto;
import com.vn.edu.elearning.dto.LichsukiemduyetDto;
import com.vn.edu.elearning.dto.TailieuDto;
import com.vn.edu.elearning.exeception.TailieuException;
import com.vn.edu.elearning.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class TailieuService {
    @Autowired
    private TailieuRepository tailieuRepository;

    @Autowired
    private TaikhoanService taikhoanService;

    @Autowired
    private KiemduyetService kiemduyetService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private DangtaiService dangtaiService;

    @Autowired
    private ThanhtoanRepository thanhtoanRepository;

    @Autowired
    private DangtaiRepository dangtaiRepository;

    public Tailieu save(TailieuDto dto) {
        Tailieu entity = new Tailieu();
        BeanUtils.copyProperties(dto,entity);
        Danhmuc danhmuc = new Danhmuc();
        danhmuc.setMadanhmuc(dto.getMadanhmuc());
        entity.setDanhmuc(danhmuc);
        Taikhoan taikhoan = taikhoanService.findById(dto.getMataikhoan());
        System.out.println("entity  taikhoan:" + taikhoan.getTendangnhap().toString());
        if (!taikhoan.getTrangthaidangtai().equals("Bình thường"))
        {
            throw new TailieuException("Tài koản của bạn đã bị chặn đăng tải");
        }
        if (taikhoan.getQuyenhan().equals("Quản trị viên"))
        {
            entity.setTrangthai("Đã kiểm duyệt");
        }
        else{
            entity.setTrangthai("Chờ kiểm duyệt");
        }

        System.out.println("entity Trạng thái :" + entity.getTrangthai());
        if (dto.getPdfFile() != null)
        {
            String filename = fileStorageService.storePDFFile(dto.getPdfFile());

            entity.setDiachiluutru(filename);
            dto.setPdfFile(null);
        }else
        {
            throw  new TailieuException("Chưa thêm file pdf");
        }

        return tailieuRepository.save(entity);
    }

    public List<?> findAll() {
        return tailieuRepository.findAll();
    }

    public List<?> findAllDocumentCensorship() {
        return tailieuRepository.findDSTailieukiemduyet();
    }


    public List<?> findAllByCategory(Long madm) {
        return tailieuRepository.findByDanhmuc_MadanhmucAndTrangthai(madm,"Đã kiểm duyệt");
    }

    public List<?> findAllUploadByAccount(Long mtk) {
        return tailieuRepository.findTailieudangtaiDtosByMataikhoan(mtk);
    }

    public List<?> findAllPayByAccount(Long mtk) {
        return tailieuRepository.findTailieuthanhtoanByMataikhoan(mtk) ;
    }

    public List<?> findAllPay() {
        return tailieuRepository.findThunhaptailieu() ;
    }

    public List<?> findAllTransactionAdmin() {
        return tailieuRepository.findLichsuthuchiAdmin() ;
    }

    public List<?> findAllDocumentCollectionByAccount(Long mtk) {
        return tailieuRepository.findThunhaptailieuByMataikhoan(mtk) ;
    }

    public List<Tailieu> getTop5TaiLieuThanhToanNhieuNhat(){
        return tailieuRepository.findTop5TailieuByThanhtoanNhieuNhat();
    }

    public List<Tailieu> getListDocumentByName(String name){
        return tailieuRepository.findByTentailieuContains(name);
    }
    public Tailieu findById(Long id) {
        Optional<Tailieu> found = tailieuRepository.findById(id);

        if (!found.isPresent())
        {
            throw new TailieuException("Tài liệu có id "+ id + " không tồn tại");
        }
        return found.get();
    }
    @Transactional
    public void  deleteById(Long id){
        List<?> list = thanhtoanRepository.findByTailieu_Matailieu(id);

        if (!list.isEmpty())
        {
            throw new TailieuException("Tài liệu đã có người thanh toán");
        }
        Tailieu existed = findById(id);

        kiemduyetService.deleteLichSuKiemDuyetByTaiLieu(existed);
        dangtaiService.deleteById(id);
        tailieuRepository.delete(existed);
    }

    public void  updateTrangthai(String trangthai,Long matailieu){
        tailieuRepository.updateTrangthaiByMatailieu(trangthai,matailieu);
    }

    public Tailieu update(Long id ,TailieuDto dto) {
        Tailieu found = findById(id);
        List<?> list = thanhtoanRepository.findByTailieu_Matailieu(id);
        if (found==null)
        {
            throw  new TailieuException("Không tìm thấy tài liệu");
        }

        Tailieu entity = new Tailieu();

        BeanUtils.copyProperties(dto,entity);
        Danhmuc danhmuc = new Danhmuc();
        danhmuc.setMadanhmuc(dto.getMadanhmuc());
        entity.setDanhmuc(danhmuc);
        entity.setMatailieu(id);
        Taikhoan taikhoan = taikhoanService.findById(dto.getMataikhoan());
        System.out.println("entity  taikhoan:" + taikhoan.getTendangnhap().toString());
        if (found.getTrangthai().equals("Đã kiểm duyệt"))
        {
            if (taikhoan.getQuyenhan().equals("Quản trị viên"))
            {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
                LichsukiemduyetDto lichsukiemduyetDto = new LichsukiemduyetDto();
                lichsukiemduyetDto.setMatailieu(id);
                lichsukiemduyetDto.setKetqua("Đã duyệt");
                lichsukiemduyetDto.setLydo("Quản trị viên đã cập nhật thông tin mới");
                kiemduyetService.save(lichsukiemduyetDto);
                kiemduyetService.updateCensorshipTime(LocalDateTime.now().format(formatter),taikhoan,found);
            }else {
                LichsukiemduyetDto lichsukiemduyetDto = new LichsukiemduyetDto();
                lichsukiemduyetDto.setMatailieu(id);
                lichsukiemduyetDto.setKetqua("Chờ kiểm duyệt");
                lichsukiemduyetDto.setLydo("Người dùng cập nhật thông tin mới cần kiểm duyệt lại");
                kiemduyetService.save(lichsukiemduyetDto);
                kiemduyetService.updateCensorshipTime("",taikhoan,found);
            }
        }
        if (taikhoan.getQuyenhan().equals("Quản trị viên"))
        {

            entity.setTrangthai("Đã kiểm duyệt");
        }
        else{
            entity.setTrangthai("Chờ kiểm duyệt");
        }
        System.out.println("entity trang thai: " + entity.getTrangthai());
        if (list.isEmpty())
        {
            if (dto.getPdfFile() != null)
            {
                String filename = fileStorageService.storePDFFile(dto.getPdfFile());

                entity.setDiachiluutru(filename);
                dto.setPdfFile(null);
            }else{
                entity.setDiachiluutru(found.getDiachiluutru());
            }
        }else {
            entity.setDiachiluutru(found.getDiachiluutru());
        }

        return tailieuRepository.save(entity);
    }

}
