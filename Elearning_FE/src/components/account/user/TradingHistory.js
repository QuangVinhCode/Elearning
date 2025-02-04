import React, { Component } from "react";
import { getTransactionsbyAccount } from "../../../redux/actions/transactionAction";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import {  Skeleton, Table } from "antd";
import Column from "antd/lib/table/Column";

class TradingHistory extends Component {
  constructor() {
    super();
    this.state = {
      transactions: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSesion = storedUserSession ? JSON.parse(storedUserSession) : null;
    this.props.getTransactionsbyAccount(UserSesion.mataikhoan);
  }

  formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  render() {
    const { navigate } = this.props.router;
    const { transactions, isLoading } = this.props;

    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Lịch sử giao dịch"
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
          title="Lịch sử giao dịch"
          className="site-page-header"
        />
        <Table dataSource={transactions} size="small">
          <Column
            title="Mã giao dịch"
            key="magiaodich"
            dataIndex="magiaodich"
            width={40}
            align="center"
          />
          <Column
            title="Số tiền"
            key="sotien"
            dataIndex="sotien"
            width={40}
            align="center"
            render={(text, record) => (
              <div>
                {record.lydo === "Nạp tiền vào tài khoản" ||
                (record.lydo &&
                  record.lydo.startsWith("Thu nhập từ bán tài liệu")) ? (
                  <span style={{ color: "green" }}>
                    + {this.formatCurrency(text)}
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    - {this.formatCurrency(text)}
                  </span>
                )}
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
            title="Thời gian"
            key="thoigiangiaodich"
            dataIndex="thoigiangiaodich"
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
  getTransactionsbyAccount,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TradingHistory)
);
