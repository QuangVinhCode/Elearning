import React from "react";

const ChangePassword = () => {
  return (
    <div className="accountsettings">
      <h1 className="mainhead1 " color="black">
        Đổi Mật Khẩu
      </h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="oldpass">
            Mật khẩu cũ <span>*</span>
          </label>
          <input type="password" />
        </div>

        <div className="form-group">
          <label htmlFor="newpass">
            Mật khẩu mới <span>*</span>
          </label>
          <input type="password" />
        </div>
        <div className="form-group" style={{ marginLeft: 410 }}>
          <label htmlFor="newpass">
            Nhập lại mật khẩu mới <span>*</span>
          </label>
          <input type="password" />
        </div>
      </div>

      <button className="mainbutton1">Save Changes</button>
    </div>
  );
};

export default ChangePassword;
