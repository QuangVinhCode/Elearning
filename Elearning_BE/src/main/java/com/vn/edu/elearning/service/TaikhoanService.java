package com.vn.edu.elearning.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.vn.edu.elearning.config.OTPGenerator;
import com.vn.edu.elearning.domain.Taikhoan;
import com.vn.edu.elearning.dto.OTPInfo;
import com.vn.edu.elearning.dto.TaikhoanDto;
import com.vn.edu.elearning.exeception.TaikhoanException;
import com.vn.edu.elearning.repository.DangtaiRepository;
import com.vn.edu.elearning.repository.TaikhoanRepository;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class TaikhoanService {
    @Autowired
    TaikhoanRepository taikhoanRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private DangtaiRepository dangtaiRepository;

    private static final long OTP_EXPIRATION_TIME = 5 * 60 * 1000;
    protected static final  String SIGNER_KEY = "LWwRhNg8jexoFVR3TnJu3R/qtjpjZO9FVsXwllzFCpXLFoXMAKv0cMmIYCZBmZ+Q";
    private Map<String, OTPInfo> otpStorage = new HashMap<>();
    public Taikhoan register(TaikhoanDto dto) {

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
        return taikhoanRepository.save(entity);
    }

    public void registerUser(String email,String name) throws MessagingException {
        Optional<?> found = taikhoanRepository.findByTendangnhap(name);
        if (!found.isEmpty()) {
            throw new TaikhoanException("Tên tài khoản đã tồn tại trong hệ thống");
        }
        Optional<?> foundGmail = taikhoanRepository.findByGmail(email);
        if (!foundGmail.isEmpty()) {
            throw new TaikhoanException("Gmail đã từng được dùng để đăng ký tài khoản khác!");
        }
        // Sinh mã xác nhận
        String otp = OTPGenerator.generateOTP(6);

        // Lưu mã xác nhận cùng với email người dùng
        otpStorage.put(email, new OTPInfo(otp, System.currentTimeMillis()));

        // Gửi email chứa mã xác nhận
        String subject = "Xác nhận đăng ký tài khoản";
        String content = "Mã xác nhận của bạn là: " + otp;

        emailService.sendEmail(email, subject, content);
    }

    public void forgotUser(String email) throws MessagingException {
        // Sinh mã xác nhận
        String otp = OTPGenerator.generateOTP(6);

        // Lưu mã xác nhận cùng với email người dùng
        otpStorage.put(email, new OTPInfo(otp, System.currentTimeMillis()));

        // Gửi email chứa mã xác nhận
        String subject = "Xác nhận lấy lại tài khoản";
        String content = "Mã xác nhận của bạn là: " + otp;

        emailService.sendEmail(email, subject, content);
    }

    public void changeGmail(String email) throws MessagingException {
        // Sinh mã xác nhận
        String otp = OTPGenerator.generateOTP(6);

        // Lưu mã xác nhận cùng với email người dùng
        otpStorage.put(email, new OTPInfo(otp, System.currentTimeMillis()));

        // Gửi email chứa mã xác nhận
        String subject = "Xác nhận đổi gmail";
        String content = "Mã xác nhận của bạn là: " + otp;

        emailService.sendEmail(email, subject, content);
    }

    public void newGmail(String email) throws MessagingException {
        // Sinh mã xác nhận
        String otp = OTPGenerator.generateOTP(6);

        // Lưu mã xác nhận cùng với email người dùng
        otpStorage.put(email, new OTPInfo(otp, System.currentTimeMillis()));

        // Gửi email chứa mã xác nhận
        String subject = "Xác nhận gmai mới";
        String content = "Mã xác nhận của bạn là: " + otp;

        emailService.sendEmail(email, subject, content);
    }

    public boolean verifyOTP(String email, String otp) {
        OTPInfo otpInfo = otpStorage.get(email);
        if (otpInfo != null) {
            long currentTime = System.currentTimeMillis();
            // Check if OTP is valid and not expired
            if (otpInfo.getOtp().equals(otp) && (currentTime - otpInfo.getCreationTime() <= OTP_EXPIRATION_TIME)) {
                return true;
            }
        }
        return false;
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
            throw new TaikhoanException("Yêu cầu đăng nhập");
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

    public void  updateTrangThaiDangTai(Long id,String stautus){
        taikhoanRepository.updateTrangThaiDangTai(id,stautus);
    }

    public void  updateTrangThaiBinhLuan(Long id,String stautus){
        taikhoanRepository.updateTrangThaiBinhlLuan(id,stautus);
    }

    public List<Taikhoan>  findAllWithoutAdmin(){
        return taikhoanRepository.findAllWithoutAdmin();
    }

    public Taikhoan update(Long id ,TaikhoanDto dto) {
        Taikhoan foundAccount = findById(id);
        foundAccount.setSodienthoai(dto.getSodienthoai());
        foundAccount.setGmail(dto.getGmail());
        return taikhoanRepository.save(foundAccount);
    }

    public boolean checkGmail(Long id ,String gmail) {
        Taikhoan foundAccount = findById(id);
        if (foundAccount.getGmail().equals(gmail))
            return true;
        Optional<?> foundGmail = taikhoanRepository.findByGmail(gmail);
        if (!foundGmail.isEmpty() && !foundAccount.getGmail().equals(gmail)) {
            throw new TaikhoanException("Gmail đã từng được dùng để đăng ký tài khoản khác!");
        }
        return false;
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

    public String generateToken(String username){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(username)
                .issuer("Elearning.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.DAYS).toEpochMilli()))
                .claim("role","role")
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header,payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            System.out.println("Error create token: " + e);
            throw new RuntimeException(e);
        }

    }

    public boolean introspect(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified =  signedJWT.verify(verifier);

        return verified && expiryTime.after(new Date());
    }
}
