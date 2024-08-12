import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import {
  getCommentsAdmin,
  blockCommentAndReplies,
} from "../../redux/actions/commentAction";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { FaBan } from "react-icons/fa";
import { Modal, Button, Input, Space, Table, Skeleton } from "antd";
import Column from "antd/lib/table/Column";
import ContentHeader from "../common/ContentHeader";

class CommentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      object: null,
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
    const message = "Bạn có chắc chắn muốn cấm bình luận: " + (record.noidung || "N/A");

    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.blockCommentAndReplies,
      okText: "Cấm",
      cancelText: "Hủy",
    });
  };

  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { navigate } = this.props.router;
    const { comments, isLoading } = this.props;
    const { searchText } = this.state;

    // Filter comments based on search text
    const filteredComments = comments.filter(
      (comment) =>
        (comment.tendangnhap && comment.tendangnhap.toLowerCase().includes(searchText.toLowerCase())) ||
        (comment.tentailieu && comment.tentailieu.toLowerCase().includes(searchText.toLowerCase()))
    );

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
        <Space style={{ marginBottom: 16, marginTop: 10 }}>
          <Input
            placeholder="Tìm kiếm theo tên tài khoản hoặc tên tài liệu"
            value={searchText}
            onChange={this.handleSearch}
            style={{ width: 300 }}
          />
        </Space>
        <Table dataSource={filteredComments} size="small" rowKey="mabinhluan">
          <Column
            title="Tên tài khoản"
            key="tendangnhap"
            dataIndex="tendangnhap"
            width={20}
            align="center"
            render={(text) => text || "N/A"} // Render default value if undefined
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
            render={(text) => text || "N/A"} // Render default value if undefined
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
  isLoading: state.commentReducer.isLoading,
});

const mapDispatchToProps = {
  getCommentsAdmin,
  blockCommentAndReplies,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentHistory)
);
