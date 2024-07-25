import { message } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { changePassword } from "../../../redux/actions/accountAction";
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";
const useUserSession = () => {
  const storedUserSession = sessionStorage.getItem("userSession");
  return storedUserSession ? JSON.parse(storedUserSession) : null;
};

const ChangePassword = ({ changePassword }) => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const userSession = useUserSession();
  const handleUpdatePassword = () => {
    if (newPassword !== confirmNewPassword) {
      message.warning({
        content: "Mật khẩu mới và nhập lại mật khẩu mới không khớp.",
        style: { marginTop: "20vh" },
      });
      return;
    }
    if (userSession) {
      const { mataikhoan } = userSession.data;
      changePassword(mataikhoan, oldPassword, newPassword,navigate);
    }
    // Xử lý việc cập nhật mật khẩu ở đây
    console.log("Mật khẩu cũ:", oldPassword);
    console.log("Mật khẩu mới:", newPassword);
    console.log("Nhập lại mật khẩu mới:", confirmNewPassword);
  };

  return (
    <div className="accountsettings">
      <h1 className="mainhead1" style={{ color: "black" }}>
        Đổi Mật Khẩu
      </h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="oldpass">
            Mật khẩu cũ <span>*</span>
          </label>
          <input
            type="password"
            id="oldpass"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="newpass">
            Mật khẩu mới <span>*</span>
          </label>
          <input
            type="password"
            id="newpass"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginLeft: 410 }}>
          <label htmlFor="confirmNewPass">
            Nhập lại mật khẩu mới <span>*</span>
          </label>
          <input
            type="password"
            id="confirmNewPass"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
      </div>

      <button className="mainbutton1" onClick={handleUpdatePassword}>
        Xác nhận
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  changePassword,
};

export default connect(null, mapDispatchToProps)(ChangePassword);
