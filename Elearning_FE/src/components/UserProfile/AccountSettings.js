import React, { useEffect, useState } from "react";
import "./AccountSettings.css";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { FaMoneyCheck } from "react-icons/fa";
import { getAccount } from "../../redux/actions/accountAction";

const useUserSession = () => {
  const storedUserSession = sessionStorage.getItem("userSession");
  return storedUserSession ? JSON.parse(storedUserSession) : null;
};

const AccountSettings = ({ account, getAccount }) => {
  const navigate = useNavigate();
  const userSession = useUserSession();
  const location = useLocation();

  const [isSuccess, setIsSuccess] = useState(
    new URLSearchParams(location.search).get("message") === "success"
  );

  const handleOpenVNpay = () => {
    navigate("/users/vnpayform");
  };

  const handleCloseNotification = () => {
    setIsSuccess(false);
  };

  useEffect(() => {
    if (userSession) {
      const { mataikhoan } = userSession.data;
      getAccount(mataikhoan);
    }
  }, [getAccount, userSession]);

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Thông tin cá nhân</h1>
      {isSuccess && (
        <div className="message-notification">
          <p>Thanh toán thành công!</p>
          <button onClick={handleCloseNotification}>Đóng</button>
        </div>
      )}
      <div className="form">
        <div className="form-group">
          <label htmlFor="name">
            Tên đăng nhập: <span>{account.tendangnhap}</span>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Số điện thoại: <span>{account.sodienthoai}</span>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Gmail: <span>{account.gmail}</span>
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
                value={account.matkhau}
                style={{ border: 0 }}
              ></input>
            </span>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="sodu">
            Số dư:{" "}
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(account.sodu)}
            </span>{" "}
            <button className="recharge" onClick={handleOpenVNpay}>
              <FaMoneyCheck /> Nạp
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.accountReducer.account,
});

const mapDispatchToProps = {
  getAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
