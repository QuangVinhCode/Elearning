import { Comment, List } from "antd";
import React, { Component } from "react";
class ListComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello, World!",
    };
  }

  render() {
    const { comments } = this.props;
    return (
      <>
        <List
          dataSource={comments || {}}
          header={`${comments.length} ${
            comments.length > 1 ? "Lượt bình luận" : "Lượt bình luận"
          }`}
          itemLayout="horizontal"
          renderItem={(comment) => (
            <Comment
              author={comment.tendangnhap} // Thay thế bằng tên tác giả nếu có
              content={<p>{comment.noidung}</p>} // Hiển thị nội dung bình luận
              datetime={comment.thoigianbinhluan}
            />
          )}
        />
      </>
    );
  }
}

export default ListComment;
