import React, { Component } from "react";
import { connect } from "react-redux";
import Pdf from "@mikecousins/react-pdf";
import withRouter from "../../helpers/withRouter";
import { getDocument, payDocument } from "../../redux/actions/documentAction";
import {
  getCommentsByDocument,
  insertComment,
} from "../../redux/actions/commentAction";
import DocumentService from "../../services/documentService";
import PayService from "../../services/payService";
import "./UserDocumentDetals.css";
import { Comment, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import CommentDocument from "./CommentDocument";
import ListComment from "./ListComment";
class UserDocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      numPages: null,
      maxPages: null,
      status: null,
      showPaymentMessage: false,
      isPaid: false, // Trạng thái kiểm tra đã thanh toán
      canDownload: false, // Trạng thái xác nhận có thể tải xuống
      mataikhoan: null,
      tendangnhap: "",
      login: false,
      reset: false,
      value: "",
      submitting: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.router.params;
    this.props.getDocument(id);
    this.props.getCommentsByDocument(id);
    const storedUserSession = sessionStorage.getItem("userSession");
    const userSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;
    const mataikhoan = userSession ? userSession.data.mataikhoan : 0;
    const tendangnhap = userSession ? userSession.data.tendangnhap : "";
    PayService.checkDocumentView(mataikhoan, id).then((result) => {
      console.log("Kết quả kiểm tra " + result);
      const status = result;
      this.setState({ status, mataikhoan, tendangnhap });
      if (status === "Đã thanh toán" || status === "Chủ sở hữu") {
        this.setState({ isPaid: true, canDownload: true });
      }
    });
  }

  onLoadSuccess = (pdfDocument) => {
    console.log("PDF loaded successfully", pdfDocument);
    const numPages = pdfDocument.numPages;
    const maxPages =
      this.state.status === "Chưa thanh toán"
        ? Math.ceil(numPages * 0.2)
        : numPages;
    this.setState({ numPages, maxPages });
  };
  onPageLoadSuccess = () => {
    if (
      this.state.page === this.state.maxPages &&
      this.state.page !== this.state.numPages
    ) {
      this.setState({ showPaymentMessage: true });
    }
  };
  handleNextPage = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    );
  };
  handlePrevPage = () => {
    this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
  };
  // Xử lý sự kiện khi nhấn vào nút Tải
  handleDownload = () => {
    const { isPaid } = this.state;
    console.log("isPaid: " + isPaid);
    // Nếu đã thanh toán, cho phép tải xuống
    if (isPaid) {
      // Thực hiện tải xuống
      const { document } = this.props;
      const pdfUrl = DocumentService.getDocumentPDFUrl(document.diachiluutru);
      const link = window.document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute("download", document.tentailieu || "document.pdf");
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    } else {
      // Nếu chưa thanh toán, hiển thị thông báo yêu cầu thanh toán trước khi tải
      this.setState({ showPaymentMessage: true });
    }
  };
  onPayConfirm = () => {
    const { document } = this.props;
    const message = "Bạn có chắt chắn muốn thanh toán " + document.tentailieu;

    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.payDocument,
      okText: "Xác nhận",
      cancelText: "Hủy",
    });
  };
  payDocument = () => {
    console.log("Xác nhận thanh toán");
    console.log(this.state.mataikhoan);
    console.log(this.props.router.params.id);
    this.props
      .payDocument(this.state.mataikhoan, this.props.router.params.id)
      .then((success) => {
        if (success) {
          // Payment successful, set reset message state
          console.log("success " + success);
          if (success) {
            this.setState({ reset: true });
          }
        }
      });
  };
  handleResetWebsite = () => {
    // Reload the entire page
    window.location.reload();
  };

  handleChange = (e) => {
    console.log("Comment: " + e.target.value);
    this.setState({ value: e.target.value });
  };
  handleSubmit = () => {
    if (this.state.mataikhoan === 0) {
      this.setState({ login: true });
    } else {
      const currentDateTime = new Date();
      const day = String(currentDateTime.getDate()).padStart(2, "0");
      const month = String(currentDateTime.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
      const year = currentDateTime.getFullYear();
      const hours = String(currentDateTime.getHours()).padStart(2, "0");
      const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
      const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;

      console.log("Comment state: " + this.state.value);
      console.log("Current Date and Time: " + formattedDateTime);
      const { document } = this.props;
      const comment = {
        matailieu: document.matailieu,
        mataikhoan: this.state.mataikhoan,
        tendangnhap: this.state.tendangnhap,
        noidung: this.state.value,
        thoigianbinhluan: formattedDateTime,
      };
      if (this.state.value) {
        console.log(comment);
        this.props.insertComment(comment);
        this.setState({ value: "" });
      }
    }
  };
  render() {
    const { document, comments } = this.props;
    const pdfUrl = DocumentService.getDocumentPDFUrl(document.diachiluutru);
    const {
      page,
      maxPages,
      showPaymentMessage,
      canDownload,
      reset,
      login,
      value,
      submitting,
    } = this.state;
    // Format giá tiền thành tiền Việt Nam
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(document.giaban);
    return (
      <div className="container">
        <div className="pdf-viewer-container">
          <Pdf
            file={pdfUrl}
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
                    <p>
                      Trang {page} / {pdfDocument.numPages}
                    </p>
                    {showPaymentMessage && (
                      <div className="message-notification">
                        <p>
                          Để xem toàn bộ nội dung và tải về, vui lòng thanh
                          toán.
                        </p>
                        <button
                          onClick={() =>
                            this.setState({ showPaymentMessage: false })
                          }
                        >
                          Đóng
                        </button>
                      </div>
                    )}
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
                    {login && (
                      <div className="message-notification">
                        <p>Hãy nhấn đăng nhập để có thể bình luận</p>
                        <button
                          onClick={() => {
                            this.setState({ login: false });
                          }}
                        >
                          Đóng
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </Pdf>
        </div>
        <div className="divInformation">
          <h1 className="document-title">{document.tentailieu}</h1>
          <p className="document-description">
            <b>Mô tả:</b> {document.mota}
          </p>
          <p className="document-price">
            <b>Giá:</b> {document.giaban===0 ? "Miễn phí" : formattedPrice}
          </p>
          <div className="action-buttons">
            <button className="button-download" onClick={this.handleDownload}>
              Tải về
            </button>
            {!canDownload && (
              <button className="button-pay" onClick={this.onPayConfirm}>
                Thanh toán
              </button>
            )}
          </div>
          <div>
            <div className="comment-section">
              <ListComment comments={comments} />
            </div>
            <div>
              <Comment
                content={
                  <CommentDocument
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={submitting}
                    value={value}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  document: state.documentReducer.document,
  comments: state.commentReducer.comments,
  permission: state.documentReducer.permission,
});

const mapDispatchToProps = {
  getDocument,
  payDocument,
  insertComment,
  getCommentsByDocument,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDocumentDetails)
);
