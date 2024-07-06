import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import { getDocumentsByCategory } from "../../redux/actions/documentAction";
import DocumentService from "../../services/documentService";
import "./DocumentHome.css";
import { Tooltip } from "antd";
class DocumentHome extends Component {
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
  render() {
    const { documents } = this.props;

    return (
      <div className="list_document">
        {documents.map((document) => (
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
                {document.giaban===0
                  ? "Miễn phí"
                  : new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(document.giaban)}
              </div>
            </div>
          </div>
        ))}
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
