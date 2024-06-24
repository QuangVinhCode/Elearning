import React, { Component } from "react";
import { connect } from "react-redux";
import Pdf from "@mikecousins/react-pdf";
import withRouter from "../../helpers/withRouter";
import { getDocument } from "../../redux/actions/documentAction";
import DocumentService from "../../services/documentService";
import PayService from "../../services/payService";
import "./UserDocumentDetals.css";

class UserDocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      numPages: null,
      maxPages: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.router.params;
    this.props.getDocument(id);
  }

  onLoadSuccess = (pdfDocument) => {
    console.log("PDF loaded successfully", pdfDocument);
    const { document } = this.props;
    const storedUserSession = sessionStorage.getItem("userSession");
    const userSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;
    const mataikhoan = userSession ? userSession.data.mataikhoan : 0;
    PayService.checkDocumentView(mataikhoan, document.matailieu).then(
      (result) => {
        console.log("Kết quả kiểm tra " + result);
        const numPages = pdfDocument.numPages;
        const maxPages =
          result === "Chưa thanh toán" ? Math.ceil(numPages * 0.2) : numPages;
        this.setState({ numPages, maxPages });
      }
    );
  };

  render() {
    const { document } = this.props;
    const pdfUrl = DocumentService.getDocumentPDFUrl(document.diachiluutru);
    const { page, maxPages } = this.state;
    return (
      <div className="container">
        <div className="left-panel">
          <div className="document-description">
            <div className="document-title">{document.tentailieu}</div>
            <div className="document-metadata">
              <div className="metadata-item">
                <span className="metadata-label">Mô tả:</span>
              </div>
            </div>
            <div className="document-text">{document.mota}</div>
          </div>
        </div>
        <div className="pdf-viewer-container">
          <Pdf
            file={pdfUrl}
            page={page}
            onDocumentLoadSuccess={this.onLoadSuccess}
          >
            {({ pdfDocument, pdfPage, canvas }) => (
              <>
                {!pdfDocument && <span>Loading...</span>}
                {canvas}
                {pdfDocument && (
                  <div className="nav-buttons">
                    <button
                      className="prev-button"
                      disabled={page === 1}
                      onClick={() =>
                        this.setState((prevState) => ({
                          page: prevState.page - 1,
                        }))
                      }
                    >
                      Trước
                    </button>
                    <button
                      className="next-button"
                      disabled={page === maxPages}
                      onClick={() =>
                        this.setState((prevState) => ({
                          page: prevState.page + 1,
                        }))
                      }
                    >
                      Sau
                    </button>
                    <p>
                      Trang {page} / {pdfDocument.numPages}
                    </p>
                  </div>
                )}
              </>
            )}
          </Pdf>
        </div>
        <div className="right-panel">
          <div className="action-buttons">
            <button className="action-button">Tải về</button>
            <button className="action-button">Thanh toán</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  document: state.documentReducer.document,
  permission: state.documentReducer.permission,
});

const mapDispatchToProps = {
  getDocument,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDocumentDetails)
);
