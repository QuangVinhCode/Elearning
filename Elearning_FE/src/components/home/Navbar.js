import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "./bootstrap.min.css";
import { Button, message, Modal } from "antd";
import DropdownMenu from "./DropdownMenu";
import { useDispatch } from "react-redux";
import { LOG_OUT } from "../../redux/actions/actionTypes";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";

const useUserSession = () => {
  const storedUserSession = sessionStorage.getItem("userSession");
  return storedUserSession ? JSON.parse(storedUserSession) : null;
};

const Navbar = ({ onUploadClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchWarning, setShowSearchWarning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSession = useUserSession();
  const handleLogout = () => {
    sessionStorage.removeItem("userSession");
    sessionStorage.removeItem("jwtToken");
    navigate("/users/login");
    dispatch({ type: LOG_OUT });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchWarning(false); // Hide the warning when the user starts typing
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setShowSearchWarning(true);
      return;
    }
    navigate("/users/search/" + searchQuery); // Thay thế bằng logic gửi yêu cầu tìm kiếm
  };

  const handleUploadClick = () => {
    if (!userSession) {
      message.warning({
        content: "Bạn cần đăng nhập để tải lên tài liệu",
        style: { marginTop: "20vh" },
      });
      return;
    }
    if (userSession.trangthaidangtai !== "Bình thường") {
      message.warning({
        content: "Tài khoản của bạn đã bị chặn quyền đăng tài liệu!",
        style: { marginTop: "20vh" },
      });
      return;
    }
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    onUploadClick(); // Proceed to upload after confirming terms
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="nav__container">
      <div className="nav__item nav__title">
        <h1>Elearning</h1>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      <div className={`nav__list ${isOpen ? "active" : ""}`}>
        <div className="nav__list--item">
          <div className="nav__item nav__home">
            <Link to="/">Trang chủ</Link>
          </div>
          <div className="nav__item nav__menu">
            <DropdownMenu />
          </div>
          <div className="nav__item nav__search">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ border: "none" }}
              />
              <button
                className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white"
                type="submit"
              >
                <FaSearch className="fas fa-search text-primary" />
              </button>
            </form>
          </div>
        </div>
        <div className="nav__list--item">
          {userSession ? (
            <>
              <div className="nav__action--item">
                <Link
                  to="#"
                  onClick={() => {
                    handleUploadClick();
                  }}
                >
                  Tải lên
                </Link>
              </div>
              <div className="nav__action--item">
                <Link to="/users/profile/accountsettings">
                  <span>Chào, {userSession.tendangnhap}</span>
                </Link>
              </div>
              <div className="nav__action--item">
                <Button onClick={handleLogout}>Đăng xuất</Button>
              </div>
            </>
          ) : (
            <div className="nav__action--item">
              <Link to="/users/login">Đăng nhập</Link>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Điều khoản đăng tài liệu"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Chấp nhận"
        cancelText="Hủy"
      >
        <p>
          <strong>
            Chúng tôi hoan nghênh bạn đóng góp tài liệu cho nền tảng của chúng
            tôi. Tuy nhiên, để đảm bảo chất lượng và hợp pháp của các tài liệu,
            vui lòng lưu ý các điều khoản sau đây:
          </strong>
        </p>
        <p>
          <strong>Chào mừng bạn đến với nền tảng của chúng tôi!</strong>
          <br />
          Để đảm bảo chất lượng và tính hợp pháp của các tài liệu, vui lòng tuân
          thủ các quy định sau khi đăng tải tài liệu:
        </p>
        <ul>
          <li>
            <strong>Không Đăng Tải Tài Liệu Giả Mạo:</strong> Tài liệu đăng tải
            phải là bản gốc, chính thức và chính xác. Không chấp nhận tài liệu
            đã bị chỉnh sửa, thay đổi nội dung gốc, hoặc tài liệu giả mạo.
          </li>
          <li>
            <strong>Tuân Thủ Pháp Luật:</strong> Tài liệu không được vi phạm bất
            kỳ quy định pháp luật nào, bao gồm luật bản quyền và các quy định
            liên quan. Không được đăng tải nội dung vi phạm quyền sở hữu trí
            tuệ, các hành vi trái phép khác hoặc nội dung gây tổn hại đến người
            khác.
          </li>
          <li>
            <strong>Chia Sẻ Doanh Thu:</strong> Đối với mỗi tài liệu được bán,
            10% doanh thu sẽ được phân phối lại cho nền tảng của chúng tôi. Số
            tiền chia sẻ này nhằm hỗ trợ duy trì và phát triển nền tảng của
            chúng tôi.
          </li>
          <li>
            <strong>Quá Trình Xét Duyệt:</strong> Tất cả các tài liệu sẽ phải
            trải qua quá trình xét duyệt của quản trị viên. Tài liệu chỉ được
            công khai trên nền tảng sau khi được phê duyệt, đảm bảo rằng nó đáp
            ứng tất cả các tiêu chuẩn và quy định của chúng tôi.
          </li>
          <li>
            <strong>Trách Nhiệm Của Người Đăng Tải:</strong> Người đăng tải tài
            liệu có trách nhiệm đảm bảo rằng tài liệu của mình không vi phạm các
            quy định trên. Người đăng tải sẽ chịu trách nhiệm hoàn toàn đối với
            bất kỳ khiếu nại nào liên quan đến nội dung tài liệu của mình.
          </li>
        </ul>
        <p>
          <strong>
            Chúng tôi cảm ơn sự hợp tác và đóng góp của bạn để duy trì chất
            lượng và tính hợp pháp của nền tảng. Nếu bạn có bất kỳ câu hỏi nào,
            vui lòng liên hệ với chúng tôi để được hỗ trợ.
          </strong>
        </p>
      </Modal>
      {showSearchWarning && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thông báo</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSearchWarning(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Vui lòng nhập nội dung tìm kiếm</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowSearchWarning(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
