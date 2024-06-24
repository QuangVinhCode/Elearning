import React, { Component } from "react";
import DocumentService from "../../services/documentService";
import { Modal } from "antd";
import Pdf from "@mikecousins/react-pdf";

class DocumentDetails extends Component {
  render() {
    const { document, onCancel, open } = this.props;
    const pdfUrl = DocumentService.getDocumentPDFUrl(document.diachiluutru);

    return (
      <Modal
        title="Chi tiết tài liệu"
        visible={open}
        onCancel={onCancel}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
        width="80%"
        bodyStyle={{ padding: 0, height: '80vh' }}
      >
        <div style={{ height: '100%', overflow: 'auto' }}>
          <Pdf file={pdfUrl} scale={1.5} />
        </div>
      </Modal>
    );
  }
}

export default DocumentDetails;
