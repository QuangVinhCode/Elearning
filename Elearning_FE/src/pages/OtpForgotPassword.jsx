import React, { useState } from "react";
import { Input, Button, Row, Col, Typography, Space } from "antd";
import "antd/dist/antd.css";
import "./OtpVerification.css";
import { forgotPasswordOpt } from "../redux/actions/accountAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../components/common/ContentHeader";
const { Title, Text } = Typography;

const OtpForgotPassword = ({ forgotPasswordOpt }) => {
  const [values, setValues] = useState(Array(6).fill(""));
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
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
    forgotPasswordOpt(otp);
    console.log("OTP Entered:", otp);
  };

  return (
    <Row align="middle" justify="center" style={{ height: "100vh" }}>
      <Col>
        <ContentHeader
          navigate={navigate}
          title="Mã xác nhận OTP"
          className="site-page-header"
        ></ContentHeader>
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
            disabled={otp.length !== 6}
          >
            Xác Nhận
          </Button>
        </div>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = {
  forgotPasswordOpt,
};

export default connect(null, mapDispatchToProps)(OtpForgotPassword);
