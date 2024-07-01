import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { insertAccount } from "../redux/actions/accountAction";
import { setError } from "../redux/actions/commonAction";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import "./Register.css";

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const err = useSelector((state) => state.commonReducer.error);

  useEffect(() => {
    if (err) {
      dispatch(setError(""));
      message.error(err);
    }
  }, [err, dispatch]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const data = {
      tendangnhap: values.username,
      matkhau: values.matkhau,
      gmail: values.email,
      sodienthoai: values.sodienthoai,
    };
    dispatch(insertAccount(data, navigate));
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
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <div className="login-link">
          <p className="dn">
            Đã có tài khoản? <a href="/users/login">Đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  );
}
