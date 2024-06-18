import React, { Component } from "react";
import ContentHeader from "../common/ContentHeader";
import ListOfDocumentsBeingCensored from "./ListOfDocumentsBeingCensored";
import DocumentNotes from "./DocumentNotes";
import withRouter from "../../helpers/withRouter";
import { Button, Col, Modal, Row } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  confirmDocument,
  getDocumentByCensorship,
} from "../../redux/actions/documentAction";
import DocumentDetails from "./DocumentDetails";
class Censoring extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      open: false,
    };
  }
  componentDidMount = () => {
    this.props.getDocumentByCensorship("Chưa kiểm duyệt");
    console.log("object in did mount");
  };

  confirmDocument = () => {
    this.props.confirmDocument(this.state.document.matailieu);
    console.log("Delete lesson in ListLesson");
  };

  onConfirm = (value) => {
    this.setState({ ...this.state, document: value });

    const message = "Bạn có chắc chắn xác nhận có tên " + value.tentailieu;

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
  onNote = (value) => {
    this.setState({ ...this.state, document: value, open: true });
  };
  render() {
    const { navigate } = this.props.router;
    const { details } = this.state;
    const { open } = this.state;
    const { documents } = this.props;
    const { document } = this.state;
    console.log(document);
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Danh sách đang kiểm duyệt"
          className="site-page-header"
        ></ContentHeader>

        <ListOfDocumentsBeingCensored
          dataSource={documents}
          onConfirm={this.onConfirm}
          onDetails={this.onDetails}
          onNote={this.onNote}
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
        {this.state.open && (
          <DocumentNotes
            document={this.state.document}
            open={open}
            onCancel={() => {
              this.setState({ ...this.state, document: {}, open: false });
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
)(withRouter(Censoring));
