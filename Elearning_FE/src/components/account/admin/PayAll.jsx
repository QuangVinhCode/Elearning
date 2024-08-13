import React, { Component } from "react";
import { getPays } from "../../../redux/actions/payAction";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Table, Space, Input } from "antd";
import Column from "antd/lib/table/Column";

class PayAll extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      documents: {},
      // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getPays();
  }
  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { navigate } = this.props.router;
    const { documents, isLoading } = this.props;
    const { searchText } = this.state;
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    };
    const filteredDocuments = documents.filter(
      (document) =>
        (document.tentailieu && // Check if tentailieu exists
          document.tentailieu
            .toLowerCase()
            .includes(searchText.toLowerCase())) ||
        (document.tendangnhap &&
          document.tendangnhap.toLowerCase().includes(searchText.toLowerCase()))
    );
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Lịch sử thanh toán"
          className="site-page-header"
        />
        <Space style={{ marginBottom: 16, marginTop: 10 }}>
          <Input
            placeholder="Tìm kiếm theo tên tài liệu "
            value={searchText}
            onChange={this.handleSearch}
            style={{ width: 300 }}
          />
        </Space>
        <Table dataSource={filteredDocuments} size="small">
          <Column
            title="Tài khoản thanh toán"
            key="tentaidangnhapthanhtoan"
            dataIndex="tentaidangnhapthanhtoan"
            width={80}
            align="center"
          />
          <Column
            title="Tên tài liệu"
            key="tentailieu"
            dataIndex="tentailieu"
            width={80}
            align="center"
          />
          <Column
            title="Tài khoản đăng tải"
            key="tendangnhapchusohuu"
            dataIndex="tendangnhapchusohuu"
            width={80}
            align="center"
          />
          <Column
            title="Giá"
            key="giaban"
            dataIndex="giaban"
            width={80}
            align="center"
          />
          <Column
            title="Thu nhập tác giả"
            key="tongthunhaptacgia"
            dataIndex="tongthunhaptacgia"
            width={80}
            align="center"
          />
          <Column
            title="Phí quản trị"
            key="tongphiquantri"
            dataIndex="tongphiquantri"
            width={80}
            align="center"
          />
          <Column
            title="Thời gian"
            key="thoigianthanhtoan"
            dataIndex="thoigianthanhtoan"
            width={80}
            align="center"
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
  getPays,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PayAll));
