// src/pages/NotFound.js
import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Trang không tìm thấy</h1>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn tìm không tồn tại."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Quay lại
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
