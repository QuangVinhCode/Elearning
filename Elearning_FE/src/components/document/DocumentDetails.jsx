import React, { Component } from "react";
import DocumentService from "../../services/documentService";
import { message, Modal } from "antd";
import Pdf from "@mikecousins/react-pdf";
import PayService from "../../services/payService";
import {
  getDocument,
  payDocument,
  clearDocumentState,
} from "../../redux/actions/documentAction";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
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
          this.scrollableDivRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
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
          this.scrollableDivRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          }); // Sử dụng tham chiếu
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

    return (
      <Modal
        title="Chi tiết tài liệu"
        visible={open}
        onCancel={onCancel}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
        width="100%"
      >
        <div
          style={{ height: "100%", overflow: "auto" }}
          ref={this.scrollableDivRef}
        >
          <Pdf
            file={DocumentService.getDocumentPDFUrl(document.diachiluutru)}
            page={page}
            onDocumentLoadSuccess={this.onLoadSuccess}
            onPageLoadSuccess={this.onPageLoadSuccess}
          >
            {({ pdfDocument, canvas }) => (
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
                    <div className="page-navigation">
                      <input
                        type="number"
                        min="1"
                        max={pdfDocument.numPages}
                        value={goToPage}
                        onChange={(e) =>
                          this.setState({ goToPage: e.target.value })
                        }
                        placeholder="Nhập số trang"
                      />
                      <button onClick={this.handleGoToPage}>
                        Đi đến trang
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Pdf>
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
