import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "./bootstrap.min.css";
import { Button } from "./Button";
import DropdownMenu from "./DropdownMenu";
import { useDispatch } from "react-redux";
import { LOG_OUT } from "../../redux/actions/actionTypes";
import { FaSearch } from "react-icons/fa";

function Navbar({ onUploadClick }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);

    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);

  const handleLogout = () => {
    let sesion = sessionStorage.removeItem("userSession");

    if (!sesion) {
      navigate("/login");
      dispatch({ type: LOG_OUT });
    }
  };

  const storedUserSession = sessionStorage.getItem("userSession");
  const userSession = storedUserSession ? JSON.parse(storedUserSession) : null;

  return (
    <>
      <div className="container-fluid fixed-top">
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/" className="navbar-brand">
              <h1 className="text-primary display-6"> E Learning</h1>
            </Link>
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
              <div className="navbar-nav mx-auto">
                <Link to="/" className="nav-item nav-link active">
                  Trang chủ
                </Link>
                <div className="nav-item nav-link">
                  <DropdownMenu />
                </div>

                {userSession && (
                  <Link
                    to="#"
                    className="nav-item nav-link"
                    onClick={() => {
                      closeMobileMenu();
                      onUploadClick();
                    }}
                  >
                    Tải lên
                  </Link>
                )}
              </div>
              <button
                className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <FaSearch className="fas fa-search text-primary" />
              </button>
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
                    onClick={closeMobileMenu}
                  >
                    Đăng nhập
                  </Link>
                )}
                {button && userSession && (
                  <Button onClick={handleLogout}>Đăng xuất</Button>
                )}
                {button && !userSession && (
                  <Button buttonStyle="btn--outline">Đăng nhập</Button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
