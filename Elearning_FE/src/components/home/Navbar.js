import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "./bootstrap.min.css";
import { Button } from "./Button";
import DropdownMenu from "./DropdownMenu";
import { useDispatch } from "react-redux";
import { LOG_OUT } from "../../redux/actions/actionTypes";
import { FaSearch } from "react-icons/fa";

const useUserSession = () => {
  const storedUserSession = sessionStorage.getItem("userSession");
  return storedUserSession ? JSON.parse(storedUserSession) : null;
};

const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const Navbar = ({ onUploadClick }) => {
  const [click, setClick] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchWarning, setShowSearchWarning] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSession = useUserSession();
  const isMobile = useWindowSize();

  const handleLogout = () => {
    sessionStorage.removeItem("userSession");
    navigate("/login");
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

  return (
    <div className="container-fluid fixed-top">
      <div className="container px-0">
        <nav className="navbar navbar-light bg-white navbar-expand-xl">
          <Link to="/" className="navbar-brand">
            <h1 className="text-primary display-6">E Learning</h1>
          </Link>
          <div className="navbar-nav align-items-center">
            <Link to="/" className="nav-item nav-link active">
              Trang chủ
            </Link>
            <div className="nav-item nav-link">
              <DropdownMenu />
            </div>
            <div className="nav-item nav-link">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={handleSearchChange}
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
          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars text-primary"></span>
          </button>
          <div
            className="collapse navbar-collapse bg-white"
            id="navbarCollapse"
          >
            <div className="navbar-nav ms-auto">
              {userSession && (
                <Link
                  to="#"
                  className="nav-item nav-link"
                  onClick={() => {
                    setClick(false);
                    onUploadClick();
                  }}
                >
                  Tải lên
                </Link>
              )}
            </div>
            <div className="d-flex m-3 me-0">
              {userSession ? (
                <Link
                  to="/users/profile/accountsettings"
                  className="nav-item nav-link"
                >
                  <span className="nav-link">
                    Chào, {userSession.data.tendangnhap}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/users/login"
                  className="nav-links-mobile"
                  onClick={() => setClick(false)}
                >
                  Đăng nhập
                </Link>
              )}
              {!isMobile && userSession && (
                <Button onClick={handleLogout}>Đăng xuất</Button>
              )}
            </div>
          </div>
        </nav>
      </div>
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
