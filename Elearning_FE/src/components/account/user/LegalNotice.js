import "./LegalNotice.css";
import React, { Component } from "react";
import withRouter from "../../../helpers/withRouter";
import {
  getCommentsByAccount,
  deleteComment,
} from "../../../redux/actions/commentAction";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Modal, Button } from "antd";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "antd";
class LegalNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      object: {},
    };
  }
  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSesion = storedUserSession ? JSON.parse(storedUserSession) : null;
    this.props.getCommentsByAccount(UserSesion.data.mataikhoan);
  }
  deleteComment = () => {
    this.props.deleteComment(
      this.state.object.mabinhluan,
      this.state.object.mataikhoan,
      this.state.object.matailieu
    );
    console.log("Delete lesson in ListLesson");
  };

  onDeleteConfirm = (object) => {
    this.setState({ ...this.state, object: object });
    console.log(object);
    const message = "Bạn có chắt chắn muốn xóa bình luận: " + object.noidung;

    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.deleteComment,
      okText: "Xóa",
      cancelText: "Hủy",
    });
  };
  render() {
    const { comments } = this.props;

    return (
      <div className="legalnotice">
        <h1 className="mainhead1">Nội Dung Đã Bình Luận</h1>
        <table className="yourorderstable">
          <thead>
            <tr>
              <th scope="col">Tên tài liệu</th>
              <th scope="col">Nội dung đã bình luận</th>
              <th scope="col">Thời gian bình luận</th>
              <th scope="col">Tác vụ</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((comment) => (
              <tr>
                <td data-label="tentailieu">
                  <Tooltip placement="topLeft" title={comment.tentailieu}>
                    {comment.tentailieu}
                  </Tooltip>
                </td>
                <td data-label="ndbinhluan">{comment.noidung}</td>
                <td data-label="thoigianbl">{comment.thoigianbinhluan}</td>
                <td data-label="tacvu">
                  <Button
                    type="primary"
                    danger
                    size="big"
                    onClick={() => this.onDeleteConfirm(comment)}
                  >
                    <MdOutlineDelete style={{ marginBottom: 8 }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  comments: state.commentReducer.comments,
});

const mapDispatchToProps = {
  getCommentsByAccount,
  deleteComment,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LegalNotice)
);
