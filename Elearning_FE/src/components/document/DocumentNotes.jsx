import React, { Component, createRef } from "react";
import { errorDocument } from "../../redux/actions/documentAction";
import { Button, Form, Modal, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";

class DocumentNotes extends Component {
  form = createRef();
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  handleContentChange = (e) => {
    this.setState({ content: e.target.value });
  };

  handleConfirm = () => {
    const { content } = this.state;
    const { document } = this.props;
    console.log("Tên tài liệu lỗi " + document.tentailieu);
    console.log("Tên tài liệu lỗi " + content);
    this.props.errorDocument(document.matailieu, content);
    this.setState({ content: "" });
    this.props.onCancel();
  };

  render() {
    const { onCancel, open } = this.props;
    const { content } = this.state;

    return (
      <Modal
        title="Chi tiết tài liệu"
        visible={open}
        onCancel={onCancel}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
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
          <Form.Item label="Nội dung">
            <TextArea
              rows={4}
              value={content}
              onChange={this.handleContentChange}
            />
          </Form.Item>

          <Form.Item label=">>>">
            <Button onClick={this.handleConfirm}>Xác nhận</Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.objects,
});

const mapDispatchToProps = {
  errorDocument,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentNotes)
);
