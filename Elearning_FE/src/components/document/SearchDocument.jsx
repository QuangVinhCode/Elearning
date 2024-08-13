import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import { getDocumentsByName } from "../../redux/actions/documentAction";
import DocumentService from "../../services/documentService";
import "./DocumentHome.css";
import { Pagination, Tooltip } from "antd";
class SearchDocument extends Component {
  state = {
    currentPage: 1,
    pageSize: 12, // Số lượng tài liệu mỗi trang
  };
  componentDidMount() {
    const { name } = this.props.router.params;
    this.props.getDocumentsByName(name);
  }
  componentDidUpdate(prevProps) {
    const { name } = this.props.router.params;
    if (name !== prevProps.router.params.name) {
      this.props.getDocumentsByName(name);
    }
  }
  onDocument = (id) => {
    const { navigate } = this.props.router;
    navigate("/users/detail/" + id);
  };
  render() {
    const { documents } = this.props;
    const { currentPage, pageSize } = this.state;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedDocuments = documents.slice(startIndex, endIndex);

    return (
      <div className="document-home">
        <div className="list_document">
          {paginatedDocuments.length === 0 ? (
            <div className="no-documents">Không tìm thấy tài liệu</div>
          ) : (
            paginatedDocuments.map((document) => (
              <div
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
                  <h3 className="productName">{document.tentailieu}</h3>
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
                </div>
              </div>
            ))
          )}
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
  getDocumentsByName,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchDocument)
);
