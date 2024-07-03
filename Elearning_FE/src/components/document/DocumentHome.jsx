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
              <Pdf
                file={DocumentService.getDocumentPDFUrl(document.diachiluutru)}
                page={1}
                scale={0.3}
              ></Pdf>
            </div>
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