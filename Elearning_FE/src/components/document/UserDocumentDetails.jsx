import React, { Component } from "react";
import { connect } from "react-redux";
import Pdf from "@mikecousins/react-pdf";
import withRouter from "../../helpers/withRouter";
import {
  getDocumentInfo,
  payDocument,
  clearDocumentState,
} from "../../redux/actions/documentAction";
import { PDFDocument, rgb } from "pdf-lib";

import fontkit from "@pdf-lib/fontkit";
import { getAccount } from "../../redux/actions/accountAction";
import {
  getCommentsByDocument,
  insertComment,
} from "../../redux/actions/commentAction";
import {
  insertReportDocument,
} from "../../redux/actions/reportAction";

import DocumentService from "../../services/documentService";
import PayService from "../../services/payService";
import "./UserDocumentDetails.css";
import { Comment, message, Modal, Form, Select, Button } from "antd";

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
      selectedError: "",
      additionalContent: "",
      documentNotFound: false,
      open: false,
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
    this.props.getDocumentInfo(id).then((result) => {
      if (result) {
        this.props.getCommentsByDocument(id);
        const storedUserSession = sessionStorage.getItem("userSession");
        const userSession = storedUserSession
          ? JSON.parse(storedUserSession)
          : null;
        const mataikhoan = userSession ? userSession.mataikhoan : 0;
        const tendangnhap = userSession ? userSession.tendangnhap : "";
        console.log("mataikhoan in loadDocument" + mataikhoan);
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

  openDownloadConfirmModal = () => {
   
    const message = "Bạn có chắt chắn muốn tải về";

    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.handleDownload,
      okText: "Đồng ý",
      cancelText: "Hủy",
    });
  };
  // Xử lý sự kiện khi nhấn vào nút Tải
  handleDownload = async () => {
    const { canDownload, tendangnhap } = this.state;

    if (canDownload) {
      const { document } = this.props;
      const pdfUrl = DocumentService.getDocumentPDFUrl(document.diachiluutru);

      try {
        // Fetch the existing PDF file
        const existingPdfBytes = await fetch(pdfUrl).then((res) =>
          res.arrayBuffer()
        );

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Register `fontkit` to enable custom fonts
        pdfDoc.registerFontkit(fontkit);

        // Embed the custom font
        const fontBytes = await fetch("/assets/Roboto-Black.ttf").then((res) =>
          res.arrayBuffer()
        );

        // Embed the custom font
        const customFont = await pdfDoc.embedFont(fontBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        const { width, height } = firstPage.getSize();

        // Add watermark to each page with the custom font
        pages.forEach((page) => {
          page.drawText(`${tendangnhap} đã tải về!`, {
            x: 50,
            y: height - 50,
            size: 15,
            font: customFont, // Use the custom font
            color: rgb(0.95, 0.1, 0.1),
            opacity: 0.5,
          });
        });

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // Create a blob from the pdfBytes
        const blob = new Blob([pdfBytes], { type: "application/pdf" });

        // Create a download link
        const link = window.document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", document.tentailieu || "document.pdf");

        // Append the link to the document and trigger the download
        window.document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        window.document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading the PDF:", error);
      }
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
      const storedUserSession = sessionStorage.getItem("userSession");
      const userSession = storedUserSession
        ? JSON.parse(storedUserSession)
        : null;
      const trangthaibinhluan = userSession ? userSession.trangthaibinhluan : "";
      if (trangthaibinhluan === "Bình thường")
      {
        if (this.state.value) {
          console.log(comment);
          this.props.insertComment(comment);
          this.setState({ value: "" });
        }
      }else{
        message.warning({
          content: "Bạn đã bị tính năng bình luận",
          style: { marginTop: "10vh" },
        });
      }
     
    }
  };

  handleConfirmReport = () => {
    const { selectedError, additionalContent,mataikhoan } = this.state;
    const { document } = this.props;
    if (!selectedError) {
      message.error("Vui lòng chọn lỗi tài liệu.");
      return;
    }

    const content = `${selectedError}${
      additionalContent ? ": " + additionalContent : ""
    }`;
    const report = {
      lydo: content,
      matailieu: document.matailieu,
      mataikhoan: mataikhoan,
    };
    console.log("mataikhoan " + mataikhoan);
    console.log("matailieu " + document.matailieu);
    console.log("content " + content);
    this.props.insertReportDocument(report);
    this.setState({ selectedError: null, additionalContent: "", open: false });
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
  showReportModal = (value) => {
    this.setState({ ...this.state, document: value, open: true });
  };
  handleErrorChange = (value) => {
    this.setState({ selectedError: value });
  };

  handleCancelReport = () => {
    this.setState({ reportModalVisible: false, selectedViolation: null });
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
    const errorOptions = [
      "Tài liệu không đầy đủ thông tin",
      "Tài liệu vi phạm bản quyền",
      "Nội dung không phù hợp",
      "Tài liệu không rõ ràng",
      "Tài liệu bị lỗi định dạng",
      "Tài liệu trùng lặp",
      "Tài liệu không thể tải xuống",
      "Tài liệu chứa thông tin sai lệch",
      "Tài liệu có chất lượng hình ảnh kém",
    ];
    const { selectedError, open } = this.state;
    if (documentNotFound) {
      return <Navigate to="/404" />;
    }
    const jwtToken = sessionStorage.getItem("jwtToken");
    const sessionToken = jwtToken ? JSON.parse(jwtToken) : null;
    if (!sessionToken) {
      return <Navigate to="/users/login" />;
    }
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
          <p className="document-description">
            <b>Tài khoản đăng tải:</b> <i>{document.tentaikhoandangtai}</i>
          </p>
          <p className="document-price">
            <b>Giá:</b> {document.giaban === 0 ? "Miễn phí" : formattedPrice}
          </p>
          <div className="action-buttons">
            <button className="button-download" onClick={this.openDownloadConfirmModal}>
              Tải về
            </button>
            {!isPaid && (
              <button className="button-pay" onClick={this.onPayConfirm}>
                Thanh toán
              </button>
            )}
            <button className="button-report" onClick={this.showReportModal}>
              Báo cáo
            </button>
          </div>
          <div>
            <div className="comment-section">
              <ListComment document={document} comments={comments} />
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
          <Modal
            title="Báo cáo vi phạm"
            visible={open}
            onCancel={() => {
              this.setState({ open: false, selectedError: "" });
            }}
            footer={[
              <Button
                key="back"
                onClick={() => {
                  this.setState({ open: false, selectedError: "" });
                }}
              >
                Đóng
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={this.handleConfirmReport}
              >
                Xác nhận
              </Button>,
            ]}
          >
            <p>Vui lòng chọn loại vi phạm:</p>
            <Form
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
            >
              <Form.Item label="Lỗi tài liệu">
                <Select
                  placeholder="Chọn lỗi tài liệu"
                  value={selectedError}
                  onChange={this.handleErrorChange}
                >
                  {errorOptions.map((error, index) => (
                    <Select.Option key={index} value={error}>
                      {error}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  document: state.documentReducer.document,
  comments: state.commentReducer.comments,
  account: state.accountReducer.account,
  reports: state.reportReducer.reports,
});

const mapDispatchToProps = {
  getAccount,
  getDocumentInfo,
  payDocument,
  insertComment,
  getCommentsByDocument,
  clearDocumentState,
  insertReportDocument,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDocumentDetails)
);
