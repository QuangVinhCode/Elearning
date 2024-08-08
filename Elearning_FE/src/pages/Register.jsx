import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { insertAccount } from "../redux/actions/accountAction";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const data = {
      tendangnhap: values.username,
      matkhau: values.matkhau,
      gmail: values.email,
      sodienthoai: values.sodienthoai,
    };
    dispatch(insertAccount(data));
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="title">Đăng ký</h1>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: "86",
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập",
              },
              {
                min: 4,
                message: "Tên đăng nhập cần ít nhất 4 ký tự",
              },
            ]}
          >
            <div className="input-box">
              <Input type="text" placeholder="Tên đăng nhập" required />
              <FaUser className="icon" />
            </div>
          </Form.Item>

          <Form.Item
            name="matkhau"
            tooltip="Hãy nhập mật khẩu dễ nhớ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
              {
                min: 4,
                message: "Mật khẩu cần ít nhất 4 ký tự",
              },
            ]}
          >
            <div className="input-box">
              <Input type="password" placeholder="Mật Khẩu" required />
              <FaLock className="icon" />
            </div>
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["matkhau"]}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu!",
              },
              {
                min: 4,
                message: "Mật khẩu cần ít nhất 4 ký tự",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("matkhau") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại của bạn không khớp!")
                  );
                },
              }),
            ]}
          >
            <div className="input-box">
              <Input type="password" placeholder="Nhập lại mật khẩu" required />
              <FaLock className="icon" />
            </div>
          </Form.Item>

          <Form.Item
            name="email"
            tooltip="Hãy nhập email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email",
                whitespace: true,
              },
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Vui lòng nhập địa chỉ Gmail hợp lệ",
              },
            ]}
          >
            <div className="input-box">
              <Input type="email" placeholder="Email" required />
              <IoIosMail className="icon" />
            </div>
          </Form.Item>

          <Form.Item
            name="sodienthoai"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Vui lòng chỉ nhập số!",
              },
            ]}
          >
            <div className="input-box">
              <Input type="tel" placeholder="Số điện thoại" />
              <FaPhoneAlt className="icon" />
            </div>
          </Form.Item>

          <Form.Item>
            <button type="primary" htmlType="submit" className="dangky2">
              Đăng ký
            </button>
          </Form.Item>
        </Form>
        <div className="login-link">
          <div>
            <p className="dn">
              Đã có tài khoản?{" "}
              <button
                className="dangnhap2"
                onClick={() => {
                  navigate("/users/login");
                }}
              >
                Đăng nhập
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
