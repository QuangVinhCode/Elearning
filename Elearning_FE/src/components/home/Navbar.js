import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button";
import DropdownMenu from "./DropdownMenu";
import { useDispatch } from "react-redux";
import { LOG_OUT } from "../../redux/actions/actionTypes";
function Navbar({ onUploadClick }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [button, setButton] = useState(true);

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedUserSession = sessionStorage.getItem("userSession");
  const userSession = storedUserSession ? JSON.parse(storedUserSession) : null;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            E Learning <i className="fab fa-typo3"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/document"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <DropdownMenu />
              </Link>
            </li>
            {userSession && (
              <li className="nav-item">
                <Link
                  to="#"
                  className="nav-links"
                  onClick={() => {
                    closeMobileMenu();
                    onUploadClick();
                  }}
                >
                  Tải lên
                </Link>
              </li>
            )}
            {userSession ? (
              <li className="nav-item">
                <span className="nav-links">
                  Chào, {userSession.data.tendangnhap}
                </span>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/users/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Đăng nhập
                </Link>
              </li>
            )}
          </ul>

          {button && userSession && (
            <Button onClick={handleLogout}>Đăng xuất</Button>
          )}
          {button && !userSession && (
            <Button buttonStyle="btn--outline">Đăng nhập</Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
