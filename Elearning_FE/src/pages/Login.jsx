import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAccount } from "../redux/actions/accountAction";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(loginAccount(values, navigate));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1>Đăng nhập</h1>
          <Form.Item
            label=""
            name="username"
            rules={[
              {
                required: true,
                message: "Hãy nhập tên đăng nhập!",
              },
            ]}
          >
            <div className="input-box">
              <Input type="text" placeholder="Tên đăng nhập" required />
              <FaUser className="icon" />
            </div>
          </Form.Item>
          <Form.Item
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
          >
            <div className="input-box">
              <Input type="password" placeholder="Mật Khẩu" required />
              <FaLock className="icon" />
            </div>
          </Form.Item>
          <div className="remember-forgot">
            <label className="nmk">
              <input type="checkbox" />
              Nhớ mật khẩu
            </label>
            <a href="/users/forget">Quên mật khẩu</a>
          </div>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
          <div className="register-link">
            <p className="cctk">
              Chưa có tài khoản? <a href="/users/register"> Đăng ký</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
