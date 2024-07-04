import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDocumentsByCategory } from "../../redux/actions/documentAction";
import DocumentService from "../../services/documentService";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import "./DocumentHome.css";

const DocumentHome = ({ documents, getDocumentsByCategory }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDocumentsByCategory(id);
  }, [id, getDocumentsByCategory]);

  const onDocument = (id) => {
    navigate("/users/detail/" + id);
  };

  const thumbnailPluginInstance = thumbnailPlugin();
  const { Thumbnails } = thumbnailPluginInstance;

  return (
    <div className="list_document">
      {documents.map((document) => (
        <div
          key={document.matailieu}
          className="productCard"
          onClick={() => onDocument(document.matailieu)}
        >
          <div className="productPdf">
            <img src={DocumentService.getPDFPreview(
                    document.diachiluutru
                  )} alt="" width={100} height={100} />
          </div>
          <div className="productCard__content">
            <h3 className="productName">{document.tentailieu}</h3>
            <h4 className="productTitle">{document.mota}</h4>
            <div className="displayStack__1">
              <div className="productPrice">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(document.giaban)}
              </div>
            </div>
            <div className="displayStack__2">
              <div className="productTime"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  documents: state.documentReducer.documents,
});

const mapDispatchToProps = {
  getDocumentsByCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentHome);
