import { Comment, List, Button, Input } from "antd";
import React, { Component } from "react";
import { insertComment } from "../../redux/actions/commentAction";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
class ListComment extends Component {
  state = {
    replyTo: null, // Track which comment is being replied to
    replyContent: "", // Track the reply content
    binhluan: "",
  };

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
    console.log("Reported comment with ID:", commentId);
  };

  handleReplyChange = (e) => {
    this.setState({ replyContent: e.target.value });
  };

  handleSubmitReply = () => {
    const { replyContent, replyTo } = this.state;
    const storedUserSession = sessionStorage.getItem("userSession");
    const userSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;
    const { documnet } = this.props;
    console.log(
      "Reply submitted to comment ID:",
      replyTo,
      "Content:",
      replyContent
    );
    const comment = {
      mataikhoan: userSession.mataikhoan,
      matailieu: documnet.matailieu,
      matbinhluandatraloi: replyTo,
      noidung: replyContent,
    };
    this.props.insertComment(comment);
    this.setState({ replyTo: null, replyContent: "" }); // Reset the reply state
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
    const nestedComments = this.buildCommentTree(comments);

    return (
      <List
        dataSource={nestedComments}
        header={`${comments.length} ${
          comments.length > 1 ? "Lượt bình luận" : "Lượt bình luận"
        }`}
        itemLayout="horizontal"
        renderItem={(item) => this.renderComments([item])}
      />
    );
  }
}

const mapDispatchToProps = {
  insertComment,
};

export default withRouter(connect(null, mapDispatchToProps)(ListComment));
