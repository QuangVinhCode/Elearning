import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Navbar from "../components/home/Navbar";
import Home from "./Home";
import Documents from "./Documents";
import DocumentForm from "../components/document/DocumentForm";
import { insertDocument, updateDocument } from "../redux/actions/documentAction";

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
