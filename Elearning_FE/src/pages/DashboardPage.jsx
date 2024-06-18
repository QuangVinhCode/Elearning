import "./DashboardPage.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Layout, Menu, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdAddCircleOutline,
  MdClass,
  MdFormatListBulleted,
  MdLogout,
  MdOutlineHome,
  MdOutlinePlayLesson,
} from "react-icons/md";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../components/home/Home";
import AddOrEditCategory from "../components/category/AddOrEditCategory";
import ListCategory from "../components/category/ListCategory";
import ListDocument from "../components/document/ListDocument";
import Censoring from "../components/document/Censoring";
import Censored from "../components/document/Censored";
import ErrorCensorship from "../components/document/ErrorCensorship";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../redux/actions/actionTypes";
import { setError, setMessage } from "../redux/actions/commonAction";
const { Header, Sider, Content } = Layout;

function DashboardPage() {
  const [marginLeft, setMarginLeft] = useState(200);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const msg = useSelector((state) => state.commonReducer.message);
  const err = useSelector((state) => state.commonReducer.error);
  const dispatch = useDispatch();
  const handleLogout = () => {
    let sesion = sessionStorage.removeItem("userSession");

    if (!sesion) {
      navigate("/users/login");
      dispatch({ type: LOG_OUT });
    }
  };
  useEffect(() => {
    if (msg) {
      dispatch(setMessage(""));
      message.success(msg);
    }

    if (err) {
      dispatch(setError(""));
      message.success(err);
    }
  }, [msg, err]);

  const siteLayoutStyle = { marginLeft: marginLeft };
  const storedUserSession = sessionStorage.getItem("userSession");
  const userSession = storedUserSession ? JSON.parse(storedUserSession) : null;
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          <h2>{collapsed ? "EL" : "E Learning"}</h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <MdOutlineHome />,
              label: "Trang chủ",
              onClick: () => navigate("/dashboard/*"),
            },
            {
              key: "2",
              icon: <MdClass />,
              label: "Danh mục",
              children: [
                {
                  key: "21",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách danh mục",
                  onClick: () => navigate("/dashboard/category/list"),
                },
                {
                  key: "22",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm danh mục",
                  onClick: () => navigate("/dashboard/category/add"),
                },
              ],
            },
            {
              key: "3",
              icon: <MdOutlinePlayLesson />,
              label: "Tài liệu",
              onClick: () => navigate("/dashboard/document/list"),
            },
            {
              key: "4",
              icon: <MdClass />,
              label: "Kiểm duyệt",
              children: [
                {
                  key: "41",
                  icon: <MdFormatListBulleted />,
                  label: "Chưa kiểm duyệt",
                  onClick: () => navigate("/dashboard/document/censoring"),
                },
                {
                  key: "42",
                  icon: <MdAddCircleOutline />,
                  label: "Đã kiểm duyệt",
                  onClick: () => navigate("/dashboard/document/censored"),
                },
                {
                  key: "43",
                  icon: <MdAddCircleOutline />,
                  label: "Lỗi kiểm duyệt",
                  onClick: () => navigate("/dashboard/document/error_censorship"),
                },
              ],
            },
            {
              key: "8",
              icon: <MdLogout />,
              label: "Đăng xuất",
              onClick: handleLogout,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout" style={siteLayoutStyle}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            right: 16,
            left: marginLeft + 16,
            top: 0,
            position: "fixed",
            height: 70,
          }}
        >
          <Row>
            <Col md={18}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => {
                    const sts = !collapsed;
                    setCollapsed(sts);
                    setMarginLeft(sts ? 80 : 200);
                  },
                }
              )}
            </Col>
            <Col md={6}>
              <div className="User">
                <Avatar size="default" icon={<UserOutlined />}></Avatar>
                {userSession ? userSession.data.tendangnhap : "Null"}
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "80px 24px 16px 24px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className="content-panel">
            <Routes>
              <Route path="/*" element={<Home />}></Route>
              <Route
                path="/category/add"
                element={<AddOrEditCategory key="a" />}
              ></Route>
              <Route
                path="/category/update/:madanhmuc"
                element={<AddOrEditCategory key="u" />}
              ></Route>
              <Route path="/category/list" element={<ListCategory />}></Route>
              <Route path="/document/list" element={<ListDocument />}></Route>
              <Route
                path="/document/censoring"
                element={<Censoring />}
              ></Route>
              <Route
                path="/document/censored"
                element={<Censored />}
              ></Route>
              <Route
                path="/document/error_censorship"
                element={<ErrorCensorship />}
              ></Route>
            </Routes>
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardPage;
