package com.vn.edu.elearning.service;


import com.vn.edu.elearning.domain.Danhmuc;
import com.vn.edu.elearning.domain.Tailieu;
import com.vn.edu.elearning.dto.TailieuDto;
import com.vn.edu.elearning.exeception.TailieuException;
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
    private FileStorageService fileStorageService;

    public Tailieu save(TailieuDto dto) {

        Tailieu entity = new Tailieu();

        BeanUtils.copyProperties(dto,entity);

//        entity.setTentailieu(dto.getTentailieu());
//        entity.setMota(dto.getMota());
//        entity.setGiaban(dto.getGiaban());
        Danhmuc danhmuc = new Danhmuc();
        danhmuc.setMadanhmuc(dto.getMadanhmuc());
        entity.setDanhmuc(danhmuc);
        System.out.println("entity :" + entity);
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

    public Page<Tailieu> findAll(Pageable pageable){
        return tailieuRepository.findAll(pageable);
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
}
