package com.vn.edu.elearning.service;

import com.vn.edu.elearning.config.OTPGenerator;
import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.dto.TaikhoanDto;
import com.vn.edu.elearning.exeception.TaikhoanException;
import com.vn.edu.elearning.repository.TaikhoanRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TaikhoanService {
    @Autowired
    TaikhoanRepository taikhoanRepository;

    @Autowired
    private EmailService emailService;

    private Map<String, String> otpStorage = new HashMap<>();
    public Taikhoan register(TaikhoanDto dto) {
        Optional<?> found = taikhoanRepository.findByTendangnhap(dto.getTendangnhap());
        if (!found.isEmpty()) {
            throw new TaikhoanException("Tên tài khoản đã tồn tại trong hệ thống");
        }
        Optional<?> foundGmail = taikhoanRepository.findByGmail(dto.getGmail());
        if (!foundGmail.isEmpty()) {
            throw new TaikhoanException("Gmail đã từng được dùng để đăng ký tài khoản khác!");
        }
        Taikhoan entity = new Taikhoan();
        BeanUtils.copyProperties(dto,entity);
        Random random = new Random();

        // Tạo ID ngẫu nhiên trong khoảng từ 1 đến 9999
        int randomId = random.nextInt(99) + 1;

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
        entity.setQuyenhan("Người dùng");
        entity.setTrangthaibinhluan("Bình thường");
        entity.setTrangthaidangtai("Bình thường");
        entity.setSodu(0L);
        return taikhoanRepository.save(entity);
    }

    public void registerUser(String email) throws MessagingException {
        // Sinh mã xác nhận
        String otp = OTPGenerator.generateOTP(6);

        // Lưu mã xác nhận cùng với email người dùng
        otpStorage.put(email, otp);

        // Gửi email chứa mã xác nhận
        String subject = "Xác nhận đăng ký tài khoản";
        String content = "Mã xác nhận của bạn là: " + otp;

        emailService.sendEmail(email, subject, content);
    }

    public void forgotUser(String email) throws MessagingException {
        // Sinh mã xác nhận
        String otp = OTPGenerator.generateOTP(6);

        // Lưu mã xác nhận cùng với email người dùng
        otpStorage.put(email, otp);

        // Gửi email chứa mã xác nhận
        String subject = "Xác nhận lấy lại tài khoản";
        String content = "Mã xác nhận của bạn là: " + otp;

        emailService.sendEmail(email, subject, content);
    }

    public boolean verifyOTP(String email, String otp) {
        String storedOtp = otpStorage.get(email);
        return storedOtp != null && storedOtp.equals(otp);
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
            throw new TaikhoanException("Tài khoản có mã "+ id + "không tồn tại");
        }
        return found.get();
    }

    public Taikhoan findAccountRole(String role) {
        Optional<Taikhoan> found = taikhoanRepository.findByQuyenhan(role);

        if (!found.isPresent())
        {
            throw new TaikhoanException("Tài khoản có quyền hạn "+ role + " không tồn tại");
        }
        return found.get();
    }

    public Taikhoan findByPostedDocuments(Long id) {
        Taikhoan found = taikhoanRepository.findByDsdangtai_Tailieu_Matailieu(id);
        return found;
    }

    public Taikhoan findByTendangnhapAndGmail(String tendangnhap,String gmail) {
        Optional<Taikhoan> found = taikhoanRepository.findByTendangnhapAndGmail(tendangnhap,gmail);

        if (!found.isPresent())
        {
            throw new TaikhoanException("Tên đăng nhập hoặc gmail đăng ký không chính xác!");
        }
        return found.get();
    }

    public Taikhoan login(String username,String password) {
        System.out.println(username + password);
        Optional<Taikhoan> found = taikhoanRepository.findByTendangnhap(username);
        if (!found.isPresent())
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

    public void  updateTrangThai(Long id,String stautus){
        taikhoanRepository.updateTrangThaiDangTai(id,stautus);
    }

    public List<Taikhoan>  findBinhThuongWithoutAdmin(){
        return taikhoanRepository.findBinhThuongWithoutAdmin();
    }

    public List<Taikhoan>  findNotBinhThuongWithoutAdmin(){
        return taikhoanRepository.findNotBinhThuongWithoutAdmin();
    }

    public Taikhoan update(Long id ,TaikhoanDto dto) {
        Taikhoan foundAccount = findById(id);
        foundAccount.setSodienthoai(dto.getSodienthoai());
        foundAccount.setGmail(dto.getGmail());
        return taikhoanRepository.save(foundAccount);
    }

    public Taikhoan changedPassword(Long id ,String oldPassword,String newPassword) {
        Taikhoan foundAccount = findById(id);
        System.out.println("found Account Password : " + foundAccount.getMatkhau());
        boolean matches = matchesPassword(oldPassword,foundAccount.getMatkhau());
        System.out.println("found Account Password : " + matches);
        if (matches == false)
        {
            throw new TaikhoanException("Mật khẩu không chính xác");
        }
        String password = encryptPassword(newPassword);
        foundAccount.setMatkhau(password);
        return taikhoanRepository.save(foundAccount);
    }

    public void forgotPassword(Taikhoan taikhoan, String newPassword) {
        String password = encryptPassword(newPassword);
        taikhoan.setMatkhau(password);
        taikhoanRepository.save(taikhoan);
    }

    public void  incrementSodu(Long id,Long amount){
        taikhoanRepository.incrementSodu(id,amount);
    }

    public void  incrementSoduForAdmin(Long amount){
        taikhoanRepository.incrementSoduForAdmin(amount);
    }

    public void  updateSodu(Long id,Long amount){
        taikhoanRepository.updateSodu(id,amount);
    }
}
