import React, { Component } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import LessonService from "../../services/documentService";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Modal } from "antd";

class DocumentDetails extends Component {
  render() {
    const { document, onCancel, open } = this.props;
    const pdfUrl = LessonService.getDocumentPDFUrl(document.diachiluutru);

    return (
      <Modal
        title="Chi tiết tài liệu"
        open={open} // Correct prop is "visible" instead of "open"
        onCancel={onCancel}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
      >
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </Modal>
    );
  }
}

export default DocumentDetails;