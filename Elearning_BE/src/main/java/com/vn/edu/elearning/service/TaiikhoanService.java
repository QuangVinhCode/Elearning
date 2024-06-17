package com.vn.edu.elearning.service;

import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.dto.TaikhoanDto;
import com.vn.edu.elearning.exeception.TaikhoanException;
import com.vn.edu.elearning.repository.TaikhoanRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class TaiikhoanService {
    @Autowired
    TaikhoanRepository taikhoanRepository;

    public Taikhoan register(TaikhoanDto dto) {
        Optional<?> found = taikhoanRepository.findByTendangnhapContains(dto.getTendangnhap());

        if (!found.isEmpty()) {
            throw new TaikhoanException("Tên tài khoản đã tồn tại trong hệ thống");
        }

        Taikhoan entity = new Taikhoan();
        BeanUtils.copyProperties(dto,entity);
        Random random = new Random();

        // Tạo ID ngẫu nhiên trong khoảng từ 1 đến 9999
        int randomId = random.nextInt(9999) + 1;

        // Lấy thời gian hiện tại
        LocalDateTime currentTime = LocalDateTime.now();

        // Định dạng thời gian với giờ, phút, giây
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        // Ghép số ngẫu nhiên với thời gian hiện tại
        String finalId = randomId + currentTime.format(formatter);
        Long mataikhoan = Long.parseLong(finalId);
        entity.setMataikhoan(mataikhoan);
        // Mã hóa mật khẩu
        String password = encryptPassword(dto.getMatkhau());
        System.out.println("MK : " + password);
        entity.setMatkhau(password);
        return taikhoanRepository.save(entity);
    }

    public List<?> findAll() {
        return taikhoanRepository.findAll();
    }

    public String encryptPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    public boolean matchesPassword(String rawPassword, String encodedPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    public Taikhoan findById(Long id) {
        Optional<Taikhoan> found = taikhoanRepository.findById(id);

        if (!found.isPresent())
        {
            throw new TaikhoanException("Tài khoản có id "+ id + "không tồn tại");
        }
        return found.get();
    }

    public Taikhoan login(String username,String password) {
        System.out.println("________________");
        System.out.println(username + password);
        Optional<Taikhoan> found = taikhoanRepository.findByTendangnhapContains(username);
        if (found.isEmpty())
        {
            throw new TaikhoanException("Tài khoản không tồn tại");
        }
        // Giải mã mật khẩu
        boolean matches = matchesPassword(password,found.get().getMatkhau());
        if (matches == false)
        {
            throw new TaikhoanException("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
        return found.get();
    }

    public void  deleteById(Long id){
        Taikhoan existed = findById(id);

        taikhoanRepository.delete(existed);
    }

    public Taikhoan update(Long id ,TaikhoanDto dto) {
        Optional<Taikhoan> foundList = taikhoanRepository.findById(id);
        Taikhoan entity = new Taikhoan();


        if (!foundList.isPresent()) {
            throw new TaikhoanException("Tên tài khoản đã tồn tại trong hệ thống");
        }
        BeanUtils.copyProperties(foundList,entity);
        BeanUtils.copyProperties(dto,entity);
        String password = encryptPassword(dto.getMatkhau());
        entity.setMatkhau(password);
        return taikhoanRepository.save(entity);
    }
}
