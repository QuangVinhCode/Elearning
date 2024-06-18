import React, { Component } from "react";
import PropTypes from "prop-types";
import ContentHeader from "../common/ContentHeader";
import ErrorDocumentList from "./ErrorDocumentList";
import withRouter from "../../helpers/withRouter";
import { Button, Col, Modal, Row } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { confirmDocument,getDocumentByCensorship } from "../../redux/actions/documentAction";
import DocumentDetails from "./DocumentDetails";
class ErrorCensorship extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      document: {
        matailieu: "",
        tentailieu: "",
        mota: "",
        giaban: "",
        diachiluutru: "",
        mataikhoan: "",
        danhmuc: { madanhmuc: "" },
      },
      details: false,
    };
  }
  componentDidMount = () => {
    this.props.getDocumentByCensorship("Lỗi kiểm duyệt");
    console.log("object in did mount");
  };

  confirmDocument = () => {
    this.props.confirmDocument(this.state.document.matailieu);
  };

  onConfirm = (value) => {
    this.setState({ ...this.state, document: value });

    const message = "Bạn có chắc chắn xác nhận lại tài liệu có tên " + value.tentailieu;

    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.confirmDocument,
      okText: "Xác nhận",
      cancelText: "Hủy",
    });
  };
  onDetails = (value) => {
    this.setState({ ...this.state, document: value, details: true });
  };
  render() {
    const { navigate } = this.props.router;
    const { details } = this.state;
    const { documents } = this.props;
    const { document } = this.state;
    console.log(document);
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Danh sách tài liệu lỗi"
          className="site-page-header"
        ></ContentHeader>

        <ErrorDocumentList
          dataSource={documents}
          onConfirm={this.onConfirm}
          onDetails={this.onDetails}
        />
        {this.state.details && (
          <DocumentDetails
            document={this.state.document}
            open={details}
            onCancel={() => {
              this.setState({ ...this.state, document: {}, details: false });
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documentReducer.documents,
});

const mapDispatchToProps = {
  confirmDocument,
  getDocumentByCensorship,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ErrorCensorship));
