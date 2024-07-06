import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Navbar from "../components/home/Navbar";
import Home from "./Home";
import UserProfile from "./UserProfile";
import Documents from "./Documents";
import DocumentForm from "../components/document/DocumentForm";
import UserDocumentDetals from "../components/document/UserDocumentDetals";
import SearchDocument from "../components/document/SearchDocument";
import {
  insertDocumentUser,
  updateDocument,
} from "../redux/actions/documentAction";
import { setError, setMessage } from "../redux/actions/commonAction";
import { message } from "antd";
import DocumentHome from "../components/document/DocumentHome";
import Footer from "../components/home/Footer";

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
        <Route path="/document" element={<Documents />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/documents/:id" element={<DocumentHome />} />
        <Route path="/detail/:id" element={<UserDocumentDetals />} /> 
        <Route path="/search/:name" element={<SearchDocument />} />
        <Route path="/profile/:activepage" element={<UserProfile />} />
      </Routes>
      <Footer />

      {showDocumentForm && (
        <DocumentForm
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
