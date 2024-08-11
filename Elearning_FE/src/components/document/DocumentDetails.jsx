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
import PDFViewer from "../../pages/PDFViewer";
class DocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      numPages: null,
      maxPages: null,
      pdfUrl: null,
      goToPage: "",
      documentNotFound: false,
    };
    this.scrollableDivRef = React.createRef();
  }

  componentDidMount() {
    this.props.getDocument(this.props.tailieu);
  }

  handleGoToPage = () => {
    const { goToPage } = this.state;
    const pageNumber = parseInt(goToPage, 10);
    if (pageNumber > 0 && pageNumber <= this.state.numPages) {
      if (pageNumber <= this.state.maxPages) {
        this.setState({ pageNumber: pageNumber }, () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      } else {
        message.warning({
          content: "Số trang nằm trong phạm vi phải thanh toán để có thể xem!",
          style: { marginTop: "10vh" },
        });
      }
    } else {
      message.warning({
        content: "Số trang không hợp lệ",
        style: { marginTop: "10vh" },
      });
    }
  };
  handleNextPage = () => {
    const { pageNumber, maxPages, status } = this.state;
    if (pageNumber >= maxPages && status === "Chưa thanh toán") {
      message.warning({
        content: "Bạn cần thanh toán để xem thêm trang.",
        style: { marginTop: "10vh" },
      });
    } else {
      this.setState(
        (prevState) => ({ pageNumber: prevState.pageNumber + 1 }),
        () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      );
    }
  };
  handlePrevPage = () => {
    this.setState(
      (prevState) => ({
        pageNumber: prevState.pageNumber - 1,
      }),
      () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    );
  };
  onLoadSuccess = ({ numPages }) => {
    console.log("PDF loaded successfully numPages", numPages);
    const maxPages =
      this.state.status === "Chưa thanh toán"
        ? Math.ceil(numPages * 0.2)
        : numPages;
    this.setState({ maxPages, numPages });
  };

  render() {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const sessionToken = jwtToken ? JSON.parse(jwtToken) : null;
    const { document, onCancel, open } = this.props;
    const { pageNumber, numPages, goToPage, reset } = this.state;
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
          <div className="pdf-viewer-container">
            <PDFViewer
              token={sessionToken.token}
              filename={document.diachiluutru}
              pageNumber={pageNumber}
              onLoadSuccess={this.onLoadSuccess}
            />
            <div className="navigation-buttons">
              <button
                className="buttontruoc"
                disabled={pageNumber <= 1}
                onClick={this.handlePrevPage}
              >
                Trước
              </button>
              <button
                className="buttonsau"
                //    disabled={pageNumber >= maxPages}
                onClick={this.handleNextPage}
              >
                Sau
              </button>
              <p>
                Trang {pageNumber} / {numPages}
              </p>
              <div className="page-navigation">
                <input
                  type="number"
                  min="1"
                  max={numPages}
                  value={goToPage}
                  onChange={(e) => this.setState({ goToPage: e.target.value })}
                  placeholder="Nhập số "
                />
                <button onClick={this.handleGoToPage} className="go-page">
                  Đi đến trang
                </button>
              </div>
            </div>
            {reset && (
              <div className="message-notification">
                <p>Hãy nhấn reset website để có thể xem hoặc tải về</p>
                <button
                  onClick={() => {
                    this.setState({ reset: false });
                    this.handleResetWebsite();
                  }}
                >
                  Đóng
                </button>
              </div>
            )}
          </div>
          <div className="divInformation">
            <h1 className="document-title">{document.tentailieu}</h1>
            <h2 className="document-title">Tác giả: {document.tacgia}</h2>
            <p className="document-description">
              <b>Mô tả:</b> {document.mota}
            </p>
            <p className="document-price">
              <b>Giá:</b> {document.giaban === 0 ? "Miễn phí" : formattedPrice}
            </p>
            <p className="document-description">
              <b>Tỷ lệ phân chia (Thu nhập tác giả/Phí quản trị)</b>{" "}
              {document.tylethunhaptacgia} / {document.tylephiquantri}
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
