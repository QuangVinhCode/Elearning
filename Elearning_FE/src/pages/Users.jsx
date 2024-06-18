import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Navbar from "../components/home/Navbar";
import Home from "./Home";
import Documents from "./Documents";
import DocumentForm from "../components/document/DocumentForm";
import { insertDocument, updateDocument } from "../redux/actions/documentAction";
import { setError, setMessage } from "../redux/actions/commonAction";
import { message } from "antd";

function Users({ insertDocument, updateDocument }) {
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
      message.success(msg);
    }

    if (err) {
      dispatch(setError(""));
      message.success(err);
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
      insertDocument(values);
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
      </Routes>

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
  insertDocument,
  updateDocument,
};

export default connect(null, mapDispatchToProps)(Users);
