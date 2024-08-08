import { Comment, List } from "antd";
import React, { Component } from "react";

const buildCommentTree = (comments) => {
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

class ListComment extends Component {
  renderComments = (comments) =>
    comments.map((comment) => (
      <Comment
        key={comment.mabinhluan}
        author={comment.tendangnhap}
        content={<p>{comment.noidung}</p>}
        datetime={comment.thoigianbinhluan}
      >
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
    const nestedComments = buildCommentTree(comments);

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

export default ListComment;