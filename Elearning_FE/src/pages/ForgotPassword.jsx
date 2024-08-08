import React from "react";
import { Form, Input, Button, Typography, Space } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import "./ForgotPassword.css";
import { forgotPassword } from "../redux/actions/accountAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const ForgotPassword = ({ forgotPassword }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values from form: ", values);
    // Xử lý logic gửi yêu cầu quên mật khẩu tại đây
    forgotPassword(values.username, values.gmail, navigate);
  };

  return (
    <div className="forgot-password-container">
      <Space
        direction="vertical"
        size="large"
        align="center"
        className="forgot-password-content"
      >
        <Title level={2} style={{ color: "#1890ff" }}>
          Quên Mật Khẩu
        </Title>
        <Text>
          Vui lòng nhập tên tài khoản và email của bạn để nhận liên kết đặt lại
          mật khẩu.
        </Text>
        <Form
          name="forgot_password"
          onFinish={onFinish}
          className="forgot-password-form"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên tài khoản"
            />
          </Form.Item>
          <Form.Item
            name="gmail"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
              {
                type: "email",
                message: "Địa chỉ email không hợp lệ!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="forgot-password-button"
            >
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

const mapDispatchToProps = {
  forgotPassword,
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
