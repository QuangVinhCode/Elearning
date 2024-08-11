import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import {
  getCommentsAdmin,
  blockCommentAndReplies,
} from "../../redux/actions/commentAction";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { FaBan } from "react-icons/fa";
import { Modal, Button } from "antd";
import { Tooltip, Skeleton, Table, Space } from "antd";
import Column from "antd/lib/table/Column";
import ContentHeader from "../common/ContentHeader";

class CommentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: {},
      object: null, // Initialize the object state
    };
  }

  componentDidMount() {
    this.props.getCommentsAdmin();
  }

  blockCommentAndReplies = () => {
    const { object } = this.state;
    if (object) {
      this.props.blockCommentAndReplies(object.mabinhluan);
      console.log("ban comment:", object);
    }
  };

  onBanConfirm = (record) => {
    this.setState({ object: record });
    console.log(record);
    const message = "Bạn có chắc chắn muốn cấm bình luận: " + record.noidung;

    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.blockCommentAndReplies,
      okText: "Cấm",
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
        <Table dataSource={comments} size="small" rowKey="mabinhluan">
          <Column
            title="Tên tài khoản"
            key="tendangnhap"
            dataIndex="tendangnhap"
            width={20}
            align="center"
          />
          <Column
            title="Nội dung"
            key="noidung"
            dataIndex="noidung"
            width={80}
            align="center"
          />
          <Column
            title="Tài liệu"
            key="tentailieu"
            dataIndex="tentailieu"
            width={40}
            align="center"
          />
          <Column
            title="Thời gian bình luận"
            key="thoigianbinhluan"
            dataIndex="thoigianbinhluan"
            width={20}
            align="center"
          />
          <Column
            title="Trạng thái "
            key="trangthai"
            dataIndex="trangthai"
            width={20}
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
            width={40}
            align="center"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  key={record.key}
                  type="primary"
                  danger
                  size="small"
                  onClick={() => this.onBanConfirm(record)}
                >
                  <FaBan style={{ marginRight: 8 }} />
                  Cấm
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
  getCommentsAdmin,
  blockCommentAndReplies,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentHistory)
);
