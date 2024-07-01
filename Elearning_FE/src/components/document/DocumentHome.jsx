import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import { getDocumentsByCategory } from "../../redux/actions/documentAction";
import { FaRegHeart } from "react-icons/fa";
import DocumentService from "../../services/documentService";
import Pdf from "@mikecousins/react-pdf";
import "./DocumentHome.css";

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

  render() {
    const { documents } = this.props;

    return (
      <div className="container">
        {documents.map((document) => (
          <div key={document.madanhmuc} className="productList">
            <div className="productCard">
              <Pdf
                file={DocumentService.getDocumentPDFUrl(document.diachiluutru)}
                scale={0.45}
                page={1}
              />
              <FaRegHeart className="productCard__cart" />
              <div className="productCard__content">
                <h3 className="productName">{document.tentailieu}</h3>
                <h4 className="productTitle">{document.mota}</h4>
                <div className="displayStack__1">
                  <div className="productPrice">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(document.giaban)}
                  </div>
                </div>
                <div className="displayStack__2">
                  <div className="productTime"></div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentHome));
