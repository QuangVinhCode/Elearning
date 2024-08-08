import React, { useEffect, useState } from "react";
import "./AccountSettings.css";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { FaMoneyCheck } from "react-icons/fa";
import { getAccount } from "../../../redux/actions/accountAction";

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

  const [isError, setIsError] = useState(
    new URLSearchParams(location.search).get("message") === "error"
  );

  const handleOpenVNpay = () => {
    navigate("/users/vnpay-form");
  };

  const handleCloseNotification = () => {
    setIsSuccess(false);
    setIsError(false);
  };

  useEffect(() => {
    if (userSession) {
      const { mataikhoan } = userSession;
      getAccount(mataikhoan);
    }
  }, []);

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Thông Tin Cá Nhân</h1>
      {isSuccess && (
        <div className="message-notification">
          <p>Thanh toán thành công!</p>
          <button onClick={handleCloseNotification}>Đóng</button>
        </div>
      )}
      {isError && (
        <div className="message-notification">
          <p>Thanh toán thất bại!</p>
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
            Mật khẩu: <span>**********</span>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Quyền hạn: <span>{account.quyenhan}</span>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Trạng thái bình luận: <span>{account.trangthaibinhluan}</span>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Trạng thái đăng tài liệu: <span>{account.trangthaidangtai}</span>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="sodu">
            <div className="sodu-container">
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
            </div>
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
