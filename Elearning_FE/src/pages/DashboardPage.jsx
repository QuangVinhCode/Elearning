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
  MdReportProblem,
} from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { AiOutlineTransaction, AiOutlineMonitor } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaComments } from "react-icons/fa";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../components/home/Home";
import AddOrEditCategory from "../components/category/AddOrEditCategory";
import ListCategory from "../components/category/ListCategory";
import ListDocument from "../components/document/ListDocument";
import Censoring from "../components/document/Censoring";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../redux/actions/actionTypes";
import { setError, setMessage } from "../redux/actions/commonAction";
import UserManage from "../components/account/admin/UserManage";
import CommentReport from "../components/account/admin/CommentReport";
import DocumentReport from "../components/account/admin/DocumentReport";
import TradingHistoryAdmin from "../components/document/TradingHistoryAdmin";
import DocumentReportNumber from "../components/account/admin/DocumentReportNumber";
import CommentReportNumber from "../components/account/admin/CommentReportNumber";
import StatisticsAdmin from "../components/document/StatisticsAdmin";
import CommentHistory from "../components/document/CommentHistory";
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
    let token = sessionStorage.removeItem("jwtToken");
    if (!sesion && !token) {
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
              key: "3",
              icon: <MdClass />,
              label: "Danh mục",
              children: [
                {
                  key: "31",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách danh mục",
                  onClick: () => navigate("/dashboard/category/list"),
                },
                {
                  key: "32",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm danh mục",
                  onClick: () => navigate("/dashboard/category/add"),
                },
              ],
            },
            {
              key: "4",
              icon: <MdOutlinePlayLesson />,
              label: "Tài liệu",
              onClick: () => navigate("/dashboard/document/list"),
            },
            {
              key: "5",
              icon: <AiOutlineMonitor />,
              label: "Kiểm duyệt",
              onClick: () => navigate("/dashboard/document/censoring"),
            },
            {
              key: "6",
              icon: <HiMiniUserGroup />,
              label: "Quản lý tài khoản",
              onClick: () => navigate("/dashboard/account/usermanage"),
            },
            {
              key: "7",
              icon: <FaComments />,
              label: "Bình luận",
              onClick: () => navigate("/dashboard/document/commenthistory"),
            },
            {
              key: "8",
              icon: <MdReportProblem />,
              label: "Quản lý báo cáo",
              children: [
                {
                  key: "81",
                  icon: <MdFormatListBulleted />,
                  label: "DS báo cáo tài liệu",
                  onClick: () => navigate("/dashboard/account/document-report"),
                },
                {
                  key: "82",
                  icon: <IoEyeSharp />,
                  label: "Theo dõi đăng tải",
                  onClick: () =>
                    navigate("/dashboard/account/document-report-number"),
                },
                {
                  key: "83",
                  icon: <MdFormatListBulleted />,
                  label: "DS báo cáo bình luận",
                  onClick: () => navigate("/dashboard/account/comment-report"),
                },

                {
                  key: "84",
                  icon: <IoEyeSharp />,
                  label: "Theo dõi bình luận",
                  onClick: () =>
                    navigate("/dashboard/account/comment-report-number"),
                },
              ],
            },
            {
              key: "9",
              icon: <AiOutlineTransaction />,
              label: "Lịch sử giao dịch admin",
              onClick: () =>
                navigate("/dashboard/document/trading-history-admin"),
            },

            {
              key: "10",
              icon: <FcStatistics />,
              label: "Thống kê",
              onClick: () => navigate("/dashboard/document/statistics-admin"),
            },
            {
              key: "11",
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
                {userSession ? userSession.tendangnhap : "Null"}
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
              <Route path="/document/censoring" element={<Censoring />}></Route>
              <Route
                path="/document/commenthistory"
                element={<CommentHistory />}
              ></Route>
              <Route
                path="/document/trading-history-admin"
                element={<TradingHistoryAdmin />}
              ></Route>
              <Route
                path="/account/usermanage"
                element={<UserManage />}
              ></Route>
              <Route
                path="/account/document-report"
                element={<DocumentReport />}
              ></Route>
              <Route
                path="/account/comment-report"
                element={<CommentReport />}
              ></Route>
              <Route
                path="/account/document-report-number"
                element={<DocumentReportNumber />}
              ></Route>
              <Route
                path="/account/comment-report-number"
                element={<CommentReportNumber />}
              ></Route>
              <Route
                path="/document/statistics-admin"
                element={<StatisticsAdmin />}
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
