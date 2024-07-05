import React from "react";
import "./AccountSettings.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const useUserSession = () => {
  const storedUserSession = sessionStorage.getItem("userSession");
  return storedUserSession ? JSON.parse(storedUserSession) : null;
};
const AccountSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSession = useUserSession();
  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Thông tin cá nhân</h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="name">
            Tên đăng nhập: <span>{userSession.data.tendangnhap}</span>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Số điện thoại: <span>{userSession.data.sodienthoai}</span>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Gmail: <span>{userSession.data.gmail}</span>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Mật khẩu:{" "}
            <span>
              <input
                type="password"
                name="password"
                id="password"
                value={userSession.data.matkhau}
                style={{ border: 0 }}
              ></input>
            </span>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="sodu">
            Số dư: <span>{userSession.data.sodu}</span>
          </label>
        </div>
      </div>

      <button className="mainbutton1">Save Changes</button>
    </div>
  );
};

export default AccountSettings;
