package com.vn.edu.elearning.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret
    ) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public String uploadFile(MultipartFile file) throws IOException {
        // Xác định thư mục dựa trên loại file
        String folder = determineFolder(file.getContentType());

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "raw",
                        "folder", folder
                ));
        return uploadResult.get("secure_url").toString();
    }

    private String determineFolder(String contentType) {
        if (contentType == null) return "others"; // Nếu không xác định được

        if (contentType.startsWith("image")) return "images";
        if (contentType.startsWith("video")) return "videos";
        if (contentType.equals("application/pdf")) return "pdfs";

        return "others";
    }
}
