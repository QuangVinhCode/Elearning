package com.vn.edu.elearning.service;


import com.vn.edu.elearning.domain.Danhmuc;
import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.TailieuDto;
import com.vn.edu.elearning.exeception.TailieuException;
import com.vn.edu.elearning.repository.TaikhoanRepository;
import com.vn.edu.elearning.repository.TailieuRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TailieuService {
    @Autowired
    private TailieuRepository tailieuRepository;

    @Autowired
    private TaikhoanRepository taikhoanRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public Tailieu save(TailieuDto dto) {

        Tailieu entity = new Tailieu();

        BeanUtils.copyProperties(dto,entity);

        Danhmuc danhmuc = new Danhmuc();
        danhmuc.setMadanhmuc(dto.getMadanhmuc());
        entity.setDanhmuc(danhmuc);

        Optional<Taikhoan> taikhoan = taikhoanRepository.findById(dto.getMataikhoan());
        System.out.println("entity  taikhoan:" + taikhoan.get().getTendangnhap().toString());
        if (taikhoan.get().getQuyenhan().equals("Quản trị viên"))
        {
            entity.setKiemduyet("Đã kiểm duyệt");
        }
        else{
                entity.setKiemduyet("Chưa kiểm duyệt");
        }

        System.out.println("entity :" + entity.getKiemduyet());
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

    public List<?> findAllByCategory(Long madm) {
        return tailieuRepository.findByDanhmuc_Madanhmuc(madm);
    }

    public List<?> findAllByCensorship(String censorship) {
        return tailieuRepository.findByKiemduyetContains(censorship);
    }

    public Page<Tailieu> findAllByCategory(Long id,Pageable pageable){
        return tailieuRepository.findByDanhmuc_MadanhmucOrderByGiabanAsc(id,pageable);
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

    public Tailieu update(Long id ,TailieuDto dto) {
        var found = tailieuRepository.findById(id);

        if (!found.isPresent())
        {
            throw  new TailieuException("Không tìm thấy tài liệu");
        }

        Tailieu entity = new Tailieu();

        BeanUtils.copyProperties(dto,entity);
        Danhmuc danhmuc = new Danhmuc();
        danhmuc.setMadanhmuc(dto.getMadanhmuc());
        entity.setDanhmuc(danhmuc);
        entity.setMatailieu(id);
        Optional<Taikhoan> taikhoan = taikhoanRepository.findById(dto.getMataikhoan());
        System.out.println("entity  taikhoan:" + taikhoan.get().getTendangnhap().toString());
        if (taikhoan.get().getQuyenhan().equals("Quản trị viên"))
        {
            entity.setKiemduyet("Đã kiểm duyệt");
        }
        else{
            entity.setKiemduyet("Chưa kiểm duyệt");
        }

        System.out.println("entity :" + entity.getKiemduyet());
        if (dto.getPdfFile() != null)
        {
            String filename = fileStorageService.storePDFFile(dto.getPdfFile());

            entity.setDiachiluutru(filename);
            dto.setPdfFile(null);
        }else{
            entity.setDiachiluutru(found.get().getDiachiluutru());
        }

        return tailieuRepository.save(entity);
    }

    public Tailieu confirm(Long id) {
        Tailieu tailieu = findById(id);

        tailieu.setKiemduyet("Đã kiểm duyệt");

        return tailieuRepository.save(tailieu);
    }

    public Tailieu error(Long id,String note) {
        Tailieu tailieu = findById(id);

        tailieu.setKiemduyet("Lỗi kiểm duyệt");
        tailieu.setGhichu(note);
        return tailieuRepository.save(tailieu);
    }
}
