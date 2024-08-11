import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import { getDocumentsByCategory } from "../../redux/actions/documentAction";
import DocumentService from "../../services/documentService";
import { Tooltip, Pagination } from "antd";
import "./DocumentHome.css";

class DocumentHome extends Component {
  state = {
    currentPage: 1,
    pageSize: 12, // Số lượng tài liệu mỗi trang
  };

  componentDidMount() {
    const { id } = this.props.router.params;
    this.props.getDocumentsByCategory(id);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.router.params;
    if (id !== prevProps.router.params.id) {
      this.props.getDocumentsByCategory(id);
    }
  }

  onDocument = (id) => {
    const { navigate } = this.props.router;
    navigate("/users/detail/" + id);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { documents } = this.props;
    const { currentPage, pageSize } = this.state;

    // Phân trang dữ liệu
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedDocuments = documents.slice(startIndex, endIndex);

    return (
      <div className="document-home">
        <div className="list_document">
          {paginatedDocuments.map((document) => (
            <div
              key={document.matailieu}
              className="productCard"
              onClick={() => this.onDocument(document.matailieu)}
            >
              <div className="productPdf">
                <img
                  src={DocumentService.getPDFPreview(document.diachiluutru)}
                  alt=""
                />
              </div>
              <div className="productCard__content">
                <h3 className="productName">
                  <Tooltip placement="topLeft" title={document.tentailieu}>
                    {document.tentailieu}
                  </Tooltip>
                </h3>
                <h4 className="productTitle">
                  <Tooltip placement="topLeft" title={document.mota}>
                    {document.mota}
                  </Tooltip>
                </h4>
              </div>
              <div className="displayStack__1">
                <div className="productPrice">
                  {document.giaban === 0
                    ? "Miễn phí"
                    : new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(document.giaban)}
                </div>
                <div className="productStatus">
                  {document.kiemduyet === "Đã kiểm duyệt" && (
                    <span className="kd1">{document.kiemduyet}</span>
                  )}
                  {document.kiemduyet === "Chưa kiểm duyệt" && (
                    <span className="kd2">{document.kiemduyet}</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Container */}
        </div>
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={documents.length}
            onChange={this.handlePageChange}
            showSizeChanger={false} // Nếu bạn không muốn cho phép người dùng thay đổi số lượng tài liệu mỗi trang
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documentReducer.documents,
});

const mapDispatchToProps = {
  getDocumentsByCategory,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentHome)
);
