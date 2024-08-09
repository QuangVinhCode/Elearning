import React, { Component } from "react";
import DocumentService from "../../services/documentService";
import { message, Modal } from "antd";
import Pdf from "@mikecousins/react-pdf";
import {
  getDocument,
  payDocument,
  clearDocumentState,
} from "../../redux/actions/documentAction";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import "./UserDocumentDetails.css";
class DocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      numPages: null,
      maxPages: null,
      pdfUrl: null,
      goToPage: "",
    };
    this.scrollableDivRef = React.createRef();
  }

  componentDidMount() {
    this.props.getDocument(this.props.tailieu);
  }

  handleNextPage = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => {
        if (this.scrollableDivRef.current) {
          this.scrollableDivRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    );
  };

  handlePrevPage = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      () => {
        if (this.scrollableDivRef.current) {
          this.scrollableDivRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
    );
  };

  handleGoToPage = () => {
    const { goToPage } = this.state;
    const pageNumber = parseInt(goToPage, 10);
    if (pageNumber > 0 && pageNumber <= this.state.numPages) {
      this.setState({ page: pageNumber }, () => {
        if (this.scrollableDivRef.current) {
          this.scrollableDivRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    } else {
      message.warning({
        content: "Số trang không hợp lệ",
        style: { marginTop: "10vh" },
      });
    }
  };

  onLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  onPageLoadSuccess = ({ pageNumber }) => {
    this.setState({ page: pageNumber });
  };

  render() {
    const { document, onCancel, open } = this.props;
    const { page, maxPages, goToPage } = this.state;
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(document.giaban);
    return (
      <Modal
        title="Chi tiết tài liệu"
        visible={open}
        onCancel={onCancel}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
        width="100%"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="container">
          <div className="pdf-viewer-container" ref={this.scrollableDivRef}>
            <Pdf
              file={DocumentService.getDocumentPDFUrl(document.diachiluutru)}
              page={page}
              onDocumentLoadSuccess={this.onLoadSuccess}
              onPageLoadSuccess={this.onPageLoadSuccess}
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
                        onClick={this.handlePrevPage}
                      >
                        Trước
                      </button>
                      <button
                        className="next-button"
                        disabled={page === maxPages}
                        onClick={this.handleNextPage}
                      >
                        Sau
                      </button>
                      <h3 className="pagenumber">
                        Trang {page} / {pdfDocument.numPages}
                      </h3>
                      <div className="page-navigation">
                        <input
                          type="number"
                          min="1"
                          max={pdfDocument.numPages}
                          value={goToPage}
                          onChange={(e) =>
                            this.setState({ goToPage: e.target.value })
                          }
                          placeholder="Nhập số "
                        />
                        <button
                          onClick={this.handleGoToPage}
                          className="go-page"
                        >
                          Đi đến trang
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </Pdf>
          </div>
          <div className="divInformation">
            <h1 className="document-title">{document.tentailieu}</h1>
            <h2 className="document-title">{document.tacgia}</h2>
            <p className="document-description">
              <b>Mô tả:</b> {document.mota}
            </p>
            <p className="document-price">
              <b>Giá:</b> {document.giaban === 0 ? "Miễn phí" : formattedPrice}
            </p>
            <p className="document-description">
              <b>Tỷ lệ phân chia (Thu nhập tác giả/Phí quản trị)</b>{" "}
              {document.tylephiquantri} / {document.tylethunhaptacgia}
            </p>
            <div></div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  document: state.documentReducer.document,
});

const mapDispatchToProps = {
  getDocument,
  payDocument,
  clearDocumentState,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentDetails)
);
