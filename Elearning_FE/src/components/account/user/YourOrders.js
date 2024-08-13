import React, { Component } from "react";
import { getDocumentPayByAccount } from "../../../redux/actions/documentAction";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Select, Button, Tooltip, Skeleton, Table, Space, message } from "antd";
import Column from "antd/lib/table/Column";
import {
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
class YourOrders extends Component {
  constructor() {
    super();
    this.state = {
      documents: {},
      object: null, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSesion = storedUserSession ? JSON.parse(storedUserSession) : null;
    this.props.getDocumentPayByAccount(UserSesion.mataikhoan);
  }
  onDocument = (object) => {
    const { navigate } = this.props.router;
    if (object.trangthaitailieu === "Cấm") {
      message.error({
        content: "Tài liệu đã vi phạm nội quy hệ thống nên không thể xem",
        style: { marginTop: "10vh" },
      });
    } else if (object.trangthaitailieu === "Cần chỉnh sửa") {
      message.warning({
        content: "Tài liệu đang được chỉnh sửa, Vui lòng quay lại sau!",
        style: { marginTop: "10vh" },
      });
    } else {
      navigate("/users/detail/" + object.matailieu);
    }
  };

  render() {
    const { navigate } = this.props.router;
    const { documents, isLoading } = this.props;
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    };
    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Tài liệu đã thanh toán"
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
          title="Tài liệu đã thanh toán"
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
            title="Giá bán"
            key="giaban"
            dataIndex="giaban"
            width={40}
            align="center"
            render={(text) => (
              <Tooltip placement="topLeft" title={formatCurrency(text)}>
                {formatCurrency(text)}
              </Tooltip>
            )}
          />
          <Column
            title="Thời gian thanh toán"
            key="thoigianthanhtoan"
            dataIndex="thoigianthanhtoan"
            width={40}
            align="center"
          />
          <Column
            title="Trạng thái"
            key="trangthai"
            dataIndex="trangthai"
            width={40}
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
                  onClick={() => this.onDocument(record)}
                >
                  <EyeOutlined style={{ marginRight: 8 }} />
                  Xem
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
  documents: state.documentReducer.documents,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getDocumentPayByAccount,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(YourOrders)
);
