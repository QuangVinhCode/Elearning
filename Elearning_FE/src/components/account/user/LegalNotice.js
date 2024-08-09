import "./LegalNotice.css";
import React, { Component } from "react";
import withRouter from "../../../helpers/withRouter";
import {
  getCommentsByAccount,
  deleteComment,
} from "../../../redux/actions/commentAction";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Modal, Button } from "antd";
import { Tooltip, Skeleton, Table, Space } from "antd";
import Column from "antd/lib/table/Column";
import ContentHeader from "../../common/ContentHeader";

class LegalNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: {},
      object: null, // Initialize the object state
    };
  }

  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;
    this.props.getCommentsByAccount(UserSession.mataikhoan);
  }

  deleteComment = () => {
    const { object } = this.state;
    if (object) {
      this.props.deleteComment(
        object.mabinhluan,
        object.mataikhoan,
        object.matailieu
      );
      console.log("Deleted comment:", object);
    }
  };

  onDeleteConfirm = (record) => {
    this.setState({ object: record });
    console.log(record);
    const message = "Bạn có chắc chắn muốn xóa bình luận: " + record.noidung;

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
    const { navigate } = this.props.router;
    const { comments, isLoading } = this.props;

    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Lịch sử bình luận"
            className="site-page-header"
          />
          <Skeleton active />
        </>
      );
    }

    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Lịch sử bình luận"
          className="site-page-header"
        />
        <Table dataSource={comments} size="small">
          <Column
            title="Mã bình luận"
            key="mabinhluan"
            dataIndex="mabinhluan"
            width={40}
            align="center"
          />
          <Column
            title="Nội dung"
            key="noidung"
            dataIndex="noidung"
            width={40}
            align="center"
          />
          <Column
            title="Thời gian bình luận"
            key="thoigianbinhluan"
            dataIndex="thoigianbinhluan"
            width={80}
            align="center"
          />
          <Column
            title="Trạng thái "
            key="trangthai"
            dataIndex="trangthai"
            width={80}
            align="center"
            render={(text) => (
              <div>
                {text === "Thành công" ? (
                  <span style={{ color: "green" }}>{text}</span>
                ) : (
                  <span style={{ color: "red" }}>{text}</span>
                )}
              </div>
            )}
          />
          <Column
            title="Tác vụ"
            key="action"
            dataIndex="action"
            width={80}
            align="center"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  key={record.key}
                  type="primary"
                  danger
                  size="small"
                  onClick={() => this.onDeleteConfirm(record)}
                >
                  <DeleteOutlined style={{ marginRight: 8 }} />
                  Xóa
                </Button>
              </Space>
            )}
          />
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.commentReducer.comments,
  isLoading: state.commentReducer.isLoading, // Make sure to include isLoading in your reducer
});

const mapDispatchToProps = {
  getCommentsByAccount,
  deleteComment,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LegalNotice)
);
