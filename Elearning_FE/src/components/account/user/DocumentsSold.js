import React, { Component } from "react";
import { getDocumentUploadByCategory } from "../../../redux/actions/documentAction";
import DocumentForm from "../../document/DocumentForm";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Button, Skeleton, Table, Space, Modal } from "antd";
import Column from "antd/lib/table/Column";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import CensorshipHistory from "../../document/CensorshipHistory";
class DocumentsSold extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      documents: {
        matailieu: "",
        tentailieu: "",
        mota: "",
        giaban: "",
        diachiluutru: "",
        mataikhoan: "",
        danhmuc: { madanhmuc: "" },
      }, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSesion = storedUserSession ? JSON.parse(storedUserSession) : null;
    this.props.getDocumentUploadByCategory(UserSesion.mataikhoan);
  }

  onEdit = (value) => {
    this.setState({ ...this.state, document: value, open1: true });
  };
  onCreate = (values) => {
    console.log("object in ListDocument");
    console.log(values);
    if (values.matailieu) {
      this.props.updateDocument(values);
    }
    this.setState({
      ...this.state,
      document: {},
      open1: false,
    });
  };

  deleteDocument = () => {
    this.props.deleteDocument(this.state.document.matailieu);
    console.log("Delete lesson in ListLesson");
  };

  onDeleteConfirm = (value) => {
    this.setState({ ...this.state, document: value });

    const message = "Bạn có muốn xóa bài học có tên " + value.tentailieu;

    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.deleteDocument,
      okText: "Xóa",
      cancelText: "Hủy",
    });
  };

  onDetails = (value) => {
    this.setState({ ...this.state, document: value, details: true });
  };

  openHistory = (object) => {
    this.setState({ ...this.state, document: object, open: true });
  };

  render() {
    const { navigate } = this.props.router;
    const { documents, isLoading } = this.props;

    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Tài liệu đã tải lên"
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
          title="Tài liệu đã tải lên"
          className="site-page-header"
        />
        <Table dataSource={documents} size="small" rowKey="matailieu">
          <Column
            title="Tên tài liệu"
            key="tentailieu"
            dataIndex="tentailieu"
            width={40}
            align="center"
          />
          <Column
            title="Trạng thái"
            key="trangthai"
            dataIndex="trangthai"
            width={40}
            align="center"
            render={(text, record) => (
              <div>
                {record.trangthai === "Đã kiểm duyệt" && (
                  <span style={{ color: "green" }}>{text}</span>
                )}
                {record.trangthai === "Chưa kiểm duyệt" && (
                  <span style={{ color: "yellow" }}>{text}</span>
                )}
                {record.trangthai === "Lỗi kiểm duyệt" && (
                  <span style={{ color: "red" }}>{text}</span>
                )}
              </div>
            )}
          />
          <Column
            title="Thời gian tải lên "
            key="thoigiantailen"
            dataIndex="thoigiantailen"
            width={40}
            align="center"
          />

          <Column
            title="Thời gian được duyệt"
            key="thoigianduocduyet"
            dataIndex="thoigianduocduyet"
            width={40}
            align="center"
          />
          <Column
            title="Tác vụ "
            key="action"
            dataIndex="action"
            width={40}
            align="center"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.onDetails(record)}
                >
                  <EditOutlined style={{ marginRight: 8 }} />
                  Xem
                </Button>
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.onEdit(record)}
                >
                  <EditOutlined style={{ marginRight: 8 }} />
                  Sửa
                </Button>
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
                <Button
                  key={record.key}
                  type="primary"
                  danger
                  size="small"
                  onClick={() => this.openHistory(record)}
                >
                  <DeleteOutlined style={{ marginRight: 8 }} />
                  Lịch sử
                </Button>
              </Space>
            )}
          />
        </Table>
        {this.state.open && (
          <CensorshipHistory
            matailieu={this.state.document.matailieu}
            open={this.state.open}
            onCancel={() => {
              this.setState({ ...this.state, document: {}, open: false });
            }}
          />
        )}
        {this.state.open1 && (
          <DocumentForm
            document={this.state.document.matailieu}
            open={this.state.open1}
            onCreate={this.onCreate}
            onCancel={() => {
              this.setState({ ...this.state, document: {}, open1: false });
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documentReducer.documents,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getDocumentUploadByCategory,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentsSold)
);
