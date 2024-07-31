package com.vn.edu.elearning.service;


import com.vn.edu.elearning.domain.Danhmuc;
import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.KiemduyettailieuDto;
import com.vn.edu.elearning.dto.LichsukiemduyetDto;
import com.vn.edu.elearning.dto.TailieuDto;
import com.vn.edu.elearning.exeception.TailieuException;
import com.vn.edu.elearning.repository.DangtaiRepository;
import com.vn.edu.elearning.repository.TaikhoanRepository;
import com.vn.edu.elearning.repository.TailieuRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Tailieu save(TailieuDto dto) {
        Tailieu entity = new Tailieu();
        BeanUtils.copyProperties(dto,entity);
        Danhmuc danhmuc = new Danhmuc();
        danhmuc.setMadanhmuc(dto.getMadanhmuc());
        entity.setDanhmuc(danhmuc);
        Taikhoan taikhoan = taikhoanService.findById(dto.getMataikhoan());
        System.out.println("entity  taikhoan:" + taikhoan.getTendangnhap().toString());
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
    public void  deleteById(Long id){
        Tailieu existed = findById(id);

        tailieuRepository.delete(existed);
    }

    public void  updateTrangthai(String trangthai,Long matailieu){
        tailieuRepository.updateTrangthaiByMatailieu(trangthai,matailieu);
    }

    public Tailieu update(Long id ,TailieuDto dto) {
        Tailieu found = findById(id);

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
            LichsukiemduyetDto lichsukiemduyetDto = new LichsukiemduyetDto();
            lichsukiemduyetDto.setMatailieu(id);
            lichsukiemduyetDto.setKetqua("Chờ kiểm duyệt");
            lichsukiemduyetDto.setLydo("Người dùng cập nhật thông tin mới cần kiểm duyệt lại");
            kiemduyetService.save(lichsukiemduyetDto);
            kiemduyetService.updateCensorshipTime("",taikhoan,found);
        }
        if (taikhoan.getQuyenhan().equals("Quản trị viên"))
        {
            entity.setTrangthai("Đã kiểm duyệt");
        }
        else{
            entity.setTrangthai("Chờ kiểm duyệt");
        }
        System.out.println("entity trang thai: " + entity.getTrangthai());
        if (dto.getPdfFile() != null)
        {
            String filename = fileStorageService.storePDFFile(dto.getPdfFile());

            entity.setDiachiluutru(filename);
            dto.setPdfFile(null);
        }else{
            entity.setDiachiluutru(found.getDiachiluutru());
        }
        return tailieuRepository.save(entity);
    }

}
