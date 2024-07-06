import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import { getDocumentsByName } from "../../redux/actions/documentAction";
import DocumentService from "../../services/documentService";
import "./DocumentHome.css";
import { Tooltip } from "antd";
class SearchDocument extends Component {
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

    return (
      <div className="list_document">
        {documents.length === 0 ? (
          <div className="no-documents">Không tìm thấy tài liệu</div>
        ) : (
          documents.map((document) => (
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
