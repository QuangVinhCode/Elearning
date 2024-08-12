import React, { Component, createRef } from "react";
import { confirmDocument } from "../../redux/actions/documentAction";
import { Button, Form, Modal, Select, message } from "antd";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";

class DocumentNotes extends Component {
  form = createRef();
  constructor(props) {
    super(props);

    this.state = {
      selectedError: null,
      additionalContent: "",
    };
  }

  handleErrorChange = (value) => {
    this.setState({ selectedError: value });
  };

  handleConfirm = () => {
    const { selectedError, additionalContent } = this.state;
    const { document } = this.props;

    if (!selectedError) {
      message.error("Vui lòng chọn lỗi tài liệu.");
      return;
    }

    const content = `${selectedError}${
      additionalContent ? ": " + additionalContent : ""
    }`;
    const censorship = {
      ketqua: "Cần chỉnh sửa",
      lydo: content,
      matailieu: document.matailieu,
    };
    console.log("Tên tài liệu lỗi " + document.tentailieu);
    console.log("Tên tài liệu lỗi " + content);
    this.props.confirmDocument(censorship);
    this.setState({ selectedError: null, additionalContent: "" });
    this.props.onCancel();
  };

  render() {
    const { onCancel, open } = this.props;
    const { selectedError } = this.state;
    const errorOptions = [
      "Tài liệu không đầy đủ thông tin",
      "Tỷ lệ phân chia phần trăm quản trị còn thấp",
      "Tài liệu vi phạm bản quyền",
      "Nội dung không phù hợp",
      "Tài liệu không rõ ràng",
      "Tài liệu bị lỗi định dạng",
      "Tài liệu trùng lặp",
      "Tài liệu không thể tải xuống",
    ];

    return (
      <Modal
        title="Chi tiết tài liệu"
        visible={open}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleConfirm}>
            Xác nhận
          </Button>,
        ]}
      >
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
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  confirmDocument,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentNotes)
);
