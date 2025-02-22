import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Typography, Space, Tag } from "antd";
import "./OtpVerification.css";
import { forgotPasswordOpt } from "../redux/actions/accountAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../components/common/ContentHeader";
const { Text } = Typography;

const OtpVerification = ({ forgotPasswordOpt }) => {
  const [values, setValues] = useState(Array(6).fill(""));
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showResendMessage, setShowResendMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      setShowResendMessage(true);
      return; // Stop the timer when it reaches zero
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);
      const newOtp = newValues.join("");
      setOtp(newOtp);

      // Focus next input
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = () => {
    forgotPasswordOpt(otp, navigate);
    console.log("OTP Entered:", otp);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <Row align="middle" justify="center" style={{ height: "80vh" }}>
      <Col>
        <ContentHeader
          navigate={navigate}
          title="Mã xác nhận OTP"
          className="site-page-header"
        />

        {!showResendMessage ? (
          <>
            <Text
              style={{
                textAlign: "center",
                display: "block",
                marginBottom: "20px",
              }}
            >
              Vui lòng nhập mã OTP gồm 6 chữ số được gửi tới email của bạn
            </Text>
            <Space>
              {values.map((value, index) => (
                <Input
                  key={index}
                  id={`otp-input-${index}`}
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "24px",
                    textAlign: "center",
                  }}
                />
              ))}
            </Space>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="primary"
                onClick={handleSubmit}
                disabled={otp.length !== 6 || timeLeft <= 0}
              >
                Xác Nhận
              </Button>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Tag color={timeLeft <= 0 ? "red" : "blue"}>
                Thời gian còn lại: {formatTime(timeLeft)}
              </Tag>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text type="danger">
              Thời gian đã hết. Vui lòng đăng ký lại để nhận mã OTP mới.
            </Text>
            {/* You can add a button to redirect users to the registration page or trigger the registration process again */}
            <Button type="primary" onClick={() => navigate("/register")}>
              Đăng ký lại
            </Button>
          </div>
        )}
      </Col>
    </Row>
  );
};

const mapDispatchToProps = {
  forgotPasswordOpt,
};

export default connect(null, mapDispatchToProps)(OtpVerification);
