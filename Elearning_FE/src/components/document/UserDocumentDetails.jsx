import React, { Component } from "react";
import { connect } from "react-redux";
import Pdf from "@mikecousins/react-pdf";
import withRouter from "../../helpers/withRouter";
import {
  getDocument,
  payDocument,
  clearDocumentState,
} from "../../redux/actions/documentAction";
import { getAccount } from "../../redux/actions/accountAction";
import {
  getCommentsByDocument,
  insertComment,
} from "../../redux/actions/commentAction";
import DocumentService from "../../services/documentService";
import PayService from "../../services/payService";
import "./UserDocumentDetails.css";
import { Comment, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import CommentDocument from "./CommentDocument";
import ListComment from "./ListComment";
import { Navigate } from "react-router-dom";
import PDFViewer from "../../pages/PDFViewer";
class UserDocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      numPages: null,
      maxPages: null,
      status: null,
      isPaid: false, // Trạng thái kiểm tra đã thanh toán
      canDownload: false, // Trạng thái xác nhận có thể tải xuống
      mataikhoan: null,
      tendangnhap: "",
      login: false,
      reset: false,
      value: "",
      submitting: false,
      pdfUrl: null,
      goToPage: "",
      documentNotFound: false,
    };
    this.intervalId = null;
  }

  componentDidMount() {
    this.loadDocument();
  }
  componentDidUpdate(prevProps) {
    const { id } = this.props.router.params;
    if (prevProps.router.params.id !== id) {
      this.loadDocument();
    }
  }
  loadDocument = () => {
    const { id } = this.props.router.params;
    this.props.getDocument(id).then((result) => {
      if (result) {
        this.props.getCommentsByDocument(id);
        const storedUserSession = sessionStorage.getItem("userSession");
        const userSession = storedUserSession
          ? JSON.parse(storedUserSession)
          : null;
        const mataikhoan = userSession ? userSession.mataikhoan : 0;
        const tendangnhap = userSession ? userSession.tendangnhap : "";
        this.props.getAccount(mataikhoan);
        PayService.checkDocumentView(mataikhoan, id).then((status) => {
          console.log(status);
          this.setState({
            status,
            mataikhoan,
            tendangnhap,
            isPaid:
              status === "Đã thanh toán" ||
              status === "Chủ sở hữu" ||
              status === "Miễn phí",
            canDownload:
              status === "Đã thanh toán" ||
              status === "Chủ sở hữu" ||
              status === "Miễn phí",
            documentNotFound: false,
          });
        });
      } else {
        this.setState({ documentNotFound: true });
      }
    });
  };

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.props.clearDocumentState();
  }

  // Xử lý sự kiện khi nhấn vào nút Tải
  handleDownload = () => {
    const { canDownload } = this.state;
    console.log("isPaid: " + canDownload);
    // Nếu đã thanh toán, cho phép tải xuống
    if (canDownload) {
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
      message.warning({
        content: "Vui lòng thanh toán để tải về!",
        style: { marginTop: "10vh" },
      });
    }
  };
  onPayConfirm = () => {
    const { document, account } = this.props;
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(document.giaban);

    const sodu = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(account.sodu);
    const message = (
      <div>
        Bạn có muốn thanh toán với số tiền {formattedPrice},<br />
        số dư còn lại trong tài khoản của bạn {sodu}
      </div>
    );
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
    const { document, comments } = this.props;
    const {
      isPaid,
      value,
      submitting,
      documentNotFound,
      pageNumber,
      numPages,
      maxPages,
      goToPage,
      reset,
    } = this.state;
    if (documentNotFound) {
      return <Navigate to="/404" />;
    }
    const jwtToken = sessionStorage.getItem("jwtToken");
    const sessionToken = jwtToken ? JSON.parse(jwtToken) : null;
    // Format giá tiền thành tiền Việt Nam
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(document.giaban);
    return (
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
          <h5 className="document-description">Tác giả: {document.tacgia}</h5>
          <p className="document-description">
            <b>Mô tả:</b> {document.mota}
          </p>
          <p className="document-price">
            <b>Giá:</b> {document.giaban === 0 ? "Miễn phí" : formattedPrice}
          </p>
          <div className="action-buttons">
            <button className="button-download" onClick={this.handleDownload}>
              Tải về
            </button>
            {!isPaid && (
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
  account: state.accountReducer.account,
});

const mapDispatchToProps = {
  getAccount,
  getDocument,
  payDocument,
  insertComment,
  getCommentsByDocument,
  clearDocumentState,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDocumentDetails)
);
