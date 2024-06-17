import React from "react";
import "./Register.css";
export default function Register() {
  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="title"> Đăng ký</h1>
        <form>
          <div className="input-box">
            <input type="text" placeholder="FirstName" required />
          </div>
          <div className="input-box">
            <input type="text" placeholder="LastName" required />
          </div>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-box">
            <input type="text" placeholder="Email" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="ConfirmPassword" required />
          </div>
          <button type="submit">Đăng ký</button>
          <div className="login-link">
            <p>
              Đã có tài khoản ? <a href="/users/login"> Đăng nhập</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
