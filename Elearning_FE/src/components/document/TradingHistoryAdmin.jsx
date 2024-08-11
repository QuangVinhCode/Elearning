import React, { Component } from "react";
import { getTransactionsbyAccount } from "../../redux/actions/transactionAction";
import ContentHeader from "../common/ContentHeader";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import { Select, Button, message, Skeleton, Table, Space } from "antd";
import Column from "antd/lib/table/Column";

class TradingHistoryAdmin extends Component {
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
        <Table dataSource={transactions} size="small" rowKey="mataikhoan">
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
                {(record.lydo &&
                  record.lydo.startsWith("Thu nhập từ thu phí quản trị")) ||
                (record.lydo &&
                  record.lydo.startsWith("Thu nhập từ bán tài liệu")) ? (
                  <span style={{ color: "green" }}>+ {text}</span>
                ) : (
                  <span style={{ color: "red" }}>- {text}</span>
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
  connect(mapStateToProps, mapDispatchToProps)(TradingHistoryAdmin)
);
