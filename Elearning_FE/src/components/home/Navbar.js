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
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSession = useUserSession();
  const isMobile = useWindowSize();

  const handleLogout = () => {
    sessionStorage.removeItem("userSession");
    navigate("/login");
    dispatch({ type: LOG_OUT });
  };
  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
  };
  const handleChangeValue = (e) => {
    setSearchQuery(e.target.value)
    console.log(searchQuery);

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
           {showSearchInput && <div className="nav-item nav-link">
              <input type="text" value={searchQuery}
                onChange={handleChangeValue}
                placeholder="Tìm kiếm..."/>
            </div>}
            <button
              className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white"
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
              onClick={handleSearchClick}
            >
              <FaSearch className="fas fa-search text-primary" />
            </button>
           
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
                <Link to="/contact" className="nav-item nav-link">
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
    </div>
  );
};

export default Navbar;
