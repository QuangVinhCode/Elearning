import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Navbar from "../components/home/Navbar";
import Home from "./Home";
import UserProfile from "./UserProfile";
import VNPayForm from "./VNPayForm";
import OtpVerification from "./OtpVerification";
import ForgotPassword from "./ForgotPassword";
import OtpForgotPassword from "./OtpForgotPassword";
import ResetPassword from "./ResetPassword";
import DocumentFormUser from "../components/document/DocumentFormUser";
import UserDocumentDetails from "../components/document/UserDocumentDetails";
import SearchDocument from "../components/document/SearchDocument";
import {
  insertDocumentUser,
  updateDocument,
} from "../redux/actions/documentAction";
import { setError, setMessage } from "../redux/actions/commonAction";
import { message } from "antd";
import DocumentHome from "../components/document/DocumentHome";
import Footer from "../components/home/Footer";
import NotFound from "./NotFound";
import OtpChangeGmail from "./OtpChangeGmail";

function Users({ insertDocumentUser, updateDocument }) {
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [document, setDocument] = useState({
    matailieu: "",
    tentailieu: "",
    mota: "",
    giaban: "",
    diachiluutru: "",
    danhmuc: { madanhmuc: "" },
  });
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.commonReducer.message);
  const err = useSelector((state) => state.commonReducer.error);
  useEffect(() => {
    if (msg) {
      dispatch(setMessage(""));
      message.success({
        content: msg,
        style: { marginTop: "20vh" },
      });
    }

    if (err) {
      dispatch(setError(""));
      message.error({
        content: err,
        style: { marginTop: "20vh" },
      });
    }
  }, [msg, err]);
  const handleUploadClick = () => {
    setShowDocumentForm(true);
  };

  const handleDocumentFormClose = () => {
    setShowDocumentForm(false);
  };

  const onCreate = (values) => {
    console.log("object in Users");
    console.log(values);
    if (values.matailieu) {
      updateDocument(values);
    } else {
      insertDocumentUser(values);
    }
    setDocument({
      matailieu: "",
      tentailieu: "",
      mota: "",
      giaban: "",
      diachiluutru: "",
      danhmuc: { madanhmuc: "" },
    });
    setShowDocumentForm(false);
  };

  return (
    <>
      <Navbar onUploadClick={handleUploadClick} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/documents/:id" element={<DocumentHome />} />
        <Route path="/detail/:id" element={<UserDocumentDetails />} />
        <Route path="/search/:name" element={<SearchDocument />} />
        <Route path="/profile/:activepage" element={<UserProfile />} />
        <Route path="/vnpay-form" element={<VNPayForm />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/forget" element={<ForgotPassword />} />
        <Route path="/otp-forget" element={<OtpForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/otp-change-gmail" element={<OtpChangeGmail />} />
        <Route path="*" element={<NotFound />} />{" "}
        {/* Route cho các đường dẫn không hợp lệ */}
      </Routes>
      <Footer />

      {showDocumentForm && (
        <DocumentFormUser
          open={showDocumentForm}
          onCreate={onCreate}
          onCancel={handleDocumentFormClose}
          document={document}
        />
      )}
    </>
  );
}

const mapDispatchToProps = {
  insertDocumentUser,
  updateDocument,
};

export default connect(null, mapDispatchToProps)(Users);
