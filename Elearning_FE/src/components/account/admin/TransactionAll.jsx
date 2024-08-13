import React, { Component } from "react";
import { getTransactions } from "../../../redux/actions/transactionAction";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";

import { connect } from "react-redux";
import {
  Select,
  Button,
  message,
  Skeleton,
  Table,
  Space,
  Tooltip,
  Input,
} from "antd";
import Column from "antd/lib/table/Column";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      transactions: {},
      // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getTransactions();
  }
  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { navigate } = this.props.router;
    const { transactions, isLoading } = this.props;
    const { searchText } = this.state;
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    };
    const filteredTransactions = transactions.filter(
      (transactions) =>
        transactions.tentaikhoangiaodich && // Check if tentailieu exists
        transactions.tentaikhoangiaodich
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Lịch sử giao dịch người dùng "
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
          title="Lịch sử giao dịch người dùng"
          className="site-page-header"
        />
        <Space style={{ marginBottom: 16, marginTop: 10 }}>
          <Input
            placeholder="Tìm kiếm theo tên tài khoản "
            value={searchText}
            onChange={this.handleSearch}
            style={{ width: 300 }}
          />
        </Space>
        <Table
          dataSource={filteredTransactions}
          size="small"
          rowKey="mataikhoan"
        >
          <Column
            title="Tên tài khoản giao dịch"
            key="tentaikhoangiaodich"
            dataIndex="tentaikhoangiaodich"
            width={80}
            align="center"
          />
          <Column
            title="Số tiền"
            key="sotien"
            dataIndex="sotien"
            width={80}
            align="center"
            render={(text) => (
              <div>
                <span style={{ color: "green" }}>+ {text}</span>
              </div>
            )}
          />
          <Column
            title="Lý do"
            key="lydo"
            dataIndex="lydo"
            width={80}
            align="center"
          />
          <Column
            title="Thời gian giao dịch"
            key="thoigiangiaodich"
            dataIndex="thoigiangiaodich"
            width={80}
            align="center"
          />
          <Column
            title="Trạng thái"
            key="trangthai"
            dataIndex="trangthai"
            width={80}
            align="center"
          />
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactionReducer.transactions,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getTransactions,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
