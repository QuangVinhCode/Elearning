import React, { Component } from "react";
import { getOutstandingDocuments } from "../../redux/actions/documentAction";
import "./Card.css";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import DocumentService from "../../services/documentService";
import { Tooltip } from "antd";
class Card extends Component {
  componentDidMount() {
    this.props.getOutstandingDocuments();
  }
  onDocument = (id) => {
    const { navigate } = this.props.router;
    navigate("/users/detail/" + id);
  };
  render() {
    const { documents } = this.props;
    return (
      <div className="cards">
        <h1>TÀI LIỆU NỔI BẬT</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
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
                    <h3 className="productName">
                      {" "}
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
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documentReducer.documents,
});

const mapDispatchToProps = {
  getOutstandingDocuments,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Card));
