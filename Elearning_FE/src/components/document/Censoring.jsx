import React, { Component } from "react";
import ContentHeader from "../common/ContentHeader";
import ListOfDocumentsBeingCensored from "./ListOfDocumentsBeingCensored";
import DocumentNotes from "./DocumentNotes";
import withRouter from "../../helpers/withRouter";
import { Button, Form, message, Modal, Select } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  confirmDocument,
  getDocumentByCensorship,
  updateStatusBan,
} from "../../redux/actions/documentAction";
import DocumentDetails from "./DocumentDetails";
class Censoring extends Component {
  constructor(props) {
    super(props);

    this.state = {
      document: {
        matailieu: "",
        tentailieu: "",
        thoigiandangtai: "",
        trangthai: "",
        mataikhoan: "",
        tentaikhoan: "",
      },
      details: false,
      open: false,
      openBan: false,
      object: null,
      selectedError: "",
      additionalContent: "",
    };
  }
  componentDidMount = () => {
    this.props.getDocumentByCensorship();
    console.log("object in did mount");
  };

  confirmDocument = () => {
    const censorship = {
      ketqua: "Đã duyệt",
      matailieu: this.state.document.matailieu,
    };
    this.props.confirmDocument(censorship);
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
  handleErrorChange = (value) => {
    this.setState({ selectedError: value });
  };
  onBan = (value) => {
    this.setState({ ...this.state, document: value, openBan: true });
  };
  showReportModal = () => {
    const { selectedError, additionalContent, mataikhoan, document } =
      this.state;

    if (!selectedError) {
      message.error("Vui lòng chọn lỗi tài liệu.");
      return;
    }

    const content = `${selectedError}${
      additionalContent ? ": " + additionalContent : ""
    }`;
    console.log("mataikhoan " + mataikhoan);
    console.log("matailieu " + document.matailieu);
    console.log("content " + content);
    const report = {
      lydo: content,
      matailieu: document.matailieu,
      ketqua: "Chặn",
    };

    this.props.updateStatusBan(report);
    this.setState({
      selectedError: null,
      additionalContent: "",
      openBan: false,
    });
  };
  render() {
    const { navigate } = this.props.router;
    const { details } = this.state;
    const { open, openBan } = this.state;
    const { documents } = this.props;
    const { document } = this.state;
    const { selectedError } = this.state;
    const errorOptions = [
      "Tài liệu vi phạm bản quyền",
      "Nội dung không phù hợp",
      "Tài liệu không rõ ràng",
      "Tài liệu bị lỗi định dạng",
      "Tài liệu trùng lặp",
      "Tài liệu không thể tải xuống",
      "Tài liệu chứa thông tin sai lệch",
      "Tài liệu có chất lượng hình ảnh kém",
      "Tài liệu có nội dung đồi trụy",
      "Tài liệu tuyên truyền chống phá đất nước",
    ];
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
          onBan={this.onBan}
        />
        {this.state.details && (
          <DocumentDetails
            tailieu={document.matailieu}
            open={details}
            onCancel={() => {
              this.setState({ ...this.state, document: {}, details: false });
            }}
          />
        )}
        {this.state.open && (
          <DocumentNotes
            document={document}
            open={open}
            onCancel={() => {
              this.setState({ ...this.state, document: {}, open: false });
            }}
          />
        )}
        <Modal
          title="Báo cáo vi phạm"
          visible={openBan}
          onCancel={() => {
            this.setState({ openBan: false, selectedError: "" });
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                this.setState({ openBan: false, selectedError: "" });
              }}
            >
              Đóng
            </Button>,
            <Button key="submit" type="primary" onClick={this.showReportModal}>
              Xác nhận
            </Button>,
          ]}
        >
          <p>Vui lòng chọn loại vi phạm:</p>
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item label="Lỗi tài liệu">
              <Select
                placeholder="Chọn lỗi tài liệu"
                value={selectedError}
                onChange={this.handleErrorChange}
              >
                {errorOptions.map((error, index) => (
                  <Select.Option key={index} value={error}>
                    {error}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
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
  updateStatusBan,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Censoring));
