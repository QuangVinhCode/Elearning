import React from "react";
import "./AccountSettings.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const useUserSession = () => {
  const storedUserSession = sessionStorage.getItem("userSession");
  return storedUserSession ? JSON.parse(storedUserSession) : null;
};
const UserAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSession = useUserSession();
  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Sửa thông tin cá nhân</h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="name">
            Tên đăng nhập: <span>*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={userSession.data.tendangnhap}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Số điện thoại: <span>*</span>
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={userSession.data.sodienthoai}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Gmail: <span>*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userSession.data.gmail}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Mật khẩu: <span>*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={userSession.data.matkhau}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sodu">
            Số dư: <span>*</span>
          </label>
          <input
            type="sodu"
            name="sodu"
            id="sodu"
            value={userSession.data.sodu}
          />
        </div>
      </div>

      <button className="mainbutton1">Save Changes</button>
    </div>
  );
};

export default UserAddress;
