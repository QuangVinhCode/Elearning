import {
  Comment,
  List,
  Button,
  Input,
  Modal,
  Form,
  Select,
  message,
} from "antd";

import React, { Component } from "react";
import { insertComment } from "../../redux/actions/commentAction";
import {
  insertReportComment,
  getReportComments,
} from "../../redux/actions/reportAction";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
class ListComment extends Component {
  state = {
    replyTo: null, // Track which comment is being replied to
    replyContent: "", // Track the reply content
    open: false,
    selectedError: "",
    additionalContent: "",
  };
  componentDidMount() {
    this.props.getReportComments();
  }

  buildCommentTree = (comments) => {
    const map = new Map();
    const roots = [];

    comments.forEach((comment) => {
      const commentCopy = { ...comment, children: [] };
      map.set(comment.mabinhluan, commentCopy);

      if (comment.matbinhluandatraloi !== null) {
        const parent = map.get(comment.matbinhluandatraloi);
        if (parent) {
          parent.children = [...parent.children, commentCopy];
        }
      } else {
        roots.push(commentCopy);
      }
    });

    return roots;
  };

  handleReplyClick = (commentId) => {
    this.setState({ replyTo: commentId });
  };

  handleReportClick = (commentId) => {
    this.setState({ commentId: commentId, open: true });
    console.log("Reported comment with ID:", commentId);
  };

  handleReplyChange = (e) => {
    this.setState({ replyContent: e.target.value });
  };

  handleConfirmReport = () => {
    const { selectedError, additionalContent, commentId } = this.state;
    const storedUserSession = sessionStorage.getItem("userSession");
    const userSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;

    if (!selectedError) {
      message.error("Vui lòng chọn lỗi tài liệu.");
      return;
    }

    const content = `${selectedError}${
      additionalContent ? ": " + additionalContent : ""
    }`;
    const report = {
      lydo: content,
      mabinhluan: commentId,
      mataikhoan: userSession.mataikhoan,
    };
    this.props.insertReportComment(report);
    this.setState({ selectedError: null, additionalContent: "", open: false });
  };

  handleSubmitReply = () => {
    const { replyContent, replyTo } = this.state;
    const storedUserSession = sessionStorage.getItem("userSession");
    const userSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;
    const { document } = this.props;
    console.log(
      "Reply submitted to comment ID:",
      replyTo,
      "Content:",
      replyContent
    );
    const comment = {
      mataikhoan: userSession.mataikhoan,
      matailieu: document.matailieu,
      matbinhluandatraloi: replyTo,
      noidung: replyContent,
    };
    this.props.insertComment(comment);
    this.setState({ replyTo: null, replyContent: "" }); // Reset the reply state
  };
  handleErrorChange = (value) => {
    this.setState({ selectedError: value });
  };

  renderComments = (comments) =>
    comments.map((comment) => (
      <Comment
        key={comment.mabinhluan}
        author={comment.tendangnhap}
        content={<p>{comment.noidung}</p>}
        datetime={comment.thoigianbinhluan}
        actions={[
          <Button
            type="link"
            onClick={() => this.handleReplyClick(comment.mabinhluan)}
          >
            Trả lời
          </Button>,
          <Button
            type="link"
            onClick={() => this.handleReportClick(comment.mabinhluan)}
          >
            Báo cáo
          </Button>,
        ]}
      >
        {this.state.replyTo === comment.mabinhluan && (
          <div style={{ marginTop: 10 }}>
            <Input.TextArea
              rows={3}
              value={this.state.replyContent}
              onChange={this.handleReplyChange}
              placeholder="Nhập nội dung trả lời..."
            />
            <Button
              type="primary"
              onClick={this.handleSubmitReply}
              style={{ marginTop: 10 }}
            >
              Gửi
            </Button>
          </div>
        )}
        {comment.children.length > 0 && (
          <List
            dataSource={comment.children}
            itemLayout="horizontal"
            renderItem={(childComment) => this.renderComments([childComment])}
          />
        )}
      </Comment>
    ));

  render() {
    const { comments } = this.props;
    const { open, selectedError } = this.state;
    const errorOptions = [
      "Bình luận không liên quan đến chủ đề",
      "Bình luận có nội dung xúc phạm hoặc khiêu khích",
      "Bình luận chứa nội dung vi phạm bản quyền",
      "Bình luận có ngôn ngữ thô tục",
      "Bình luận chứa thông tin sai sự thật",
      "Bình luận spam hoặc quảng cáo không liên quan",
      "Bình luận có nội dung không phù hợp",
      "Bình luận chứa thông tin cá nhân của người khác",
      "Bình luận kích động thù địch hoặc bạo lực",
      "Bình luận sao chép hoặc trùng lặp",
    ];
    const nestedComments = this.buildCommentTree(comments);

    return (
      <>
        <List
          dataSource={nestedComments}
          header={`${comments.length} ${
            comments.length > 1 ? "Lượt bình luận" : "Lượt bình luận"
          }`}
          itemLayout="horizontal"
          renderItem={(item) => this.renderComments([item])}
        />
        <Modal
          title="Báo cáo vi phạm"
          visible={open}
          onCancel={() => {
            this.setState({ open: false, selectedError: "" });
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                this.setState({ open: false, selectedError: "" });
              }}
            >
              Đóng
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={this.handleConfirmReport}
            >
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

const mapDispatchToProps = {
  insertComment,
  insertReportComment,
  getReportComments,
};

export default withRouter(connect(null, mapDispatchToProps)(ListComment));
