import React, { Component } from "react";
import PropTypes from "prop-types";
import ContentHeader from "../common/ContentHeader";
import DocumentList from "./DocumentList";
import withRouter from "../../helpers/withRouter";
import { Button, Col, Modal, Row } from "antd";
import DocumentForm from "./DocumentForm";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  insertDocumentAdmin,
  getDocuments,
  deleteDocument,
  updateDocument,
} from "../../redux/actions/documentAction";
import DocumentDetails from "./DocumentDetails";
class ListDocument extends Component {
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
        mataikhoan : "",
        danhmuc: { madanhmuc: "" },
      },
      details: false,
    };
  }
  componentDidMount = () => {
    this.props.getDocuments();
    console.log("object in did mount");
  };

  onCreate = (values) => {
    console.log("object in ListDocument");
    console.log(values);
    if (values.matailieu) {
      this.props.updateDocument(values);
    } else {
      this.props.insertDocumentAdmin(values);
    }

    this.setState({
      ...this.state,
      document: {},
      open: false,
    });
  };

  deleteDocument = () => {
    this.props.deleteDocument(this.state.document.matailieu);
    console.log("Delete lesson in ListLesson");
  };

  onDeleteConfirm = (value) => {
    this.setState({ ...this.state, document: value });

    const message = "Bạn có muốn xóa bài học có tên " + value.tentailieu;

    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.deleteDocument,
      okText: "Xóa",
      cancelText: "Hủy",
    });
  };
  onEdit = (value) => {
    this.setState({ ...this.state, document: value, open: true });
  };
  onDetails = (value) => {
    this.setState({ ...this.state, document: value, details: true });
  };
  render() {
    const { navigate } = this.props.router;
    const { open } = this.state;
    const { details } = this.state;
    const { documents } = this.props;
    const { document } = this.state;
    console.log(document);
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Danh sách tài liệu"
          className="site-page-header"
        ></ContentHeader>

        <Row>
          <Col md={24}>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ ...this.state, open: true });
              }}
            >
              Thêm bài học mới
            </Button>
          </Col>
        </Row>
        <DocumentList
          dataSource={documents}
          onDeleteConfirm={this.onDeleteConfirm}
          onEdit={this.onEdit}
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
        <DocumentForm
          document={this.state.document}
          open={open}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState({ ...this.state, document: {}, open: false });
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documentReducer.documents,
});

const mapDispatchToProps = {
  insertDocumentAdmin,
  getDocuments,
  deleteDocument,
  updateDocument,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListDocument));
