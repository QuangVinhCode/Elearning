import React, { Component } from "react";
import { getRevenues } from "../../../redux/actions/transactionAction";

import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Select, Button, message, Skeleton, Table, Space } from "antd";
import Column from "antd/lib/table/Column";

class Statistics extends Component {
  constructor() {
    super();
    this.state = {
      transactions: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSesion = storedUserSession ? JSON.parse(storedUserSession) : null;
    this.props.getRevenues(UserSesion.mataikhoan);
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
            title="Thống kê"
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
          title="Thống kê"
          className="site-page-header"
        />
        <Table dataSource={transactions} size="small" rowKey="mataikhoan">
          <Column
            title="Tiền nạp"
            key="tiennap"
            dataIndex="tiennap"
            width={40}
            align="center"
            render={(text) => (
              <div>
                {text === "Nạp tiền" || "Thu nhập" ? (
                  <span style={{ color: "green" }}>+ {this.formatCurrency(text)}</span>
                ) : (
                  <span style={{ color: "red" }}>- {this.formatCurrency(text)}</span>
                )}
              </div>
            )}
          />
          <Column
            title="Thanh toán"
            key="thanhtoan"
            dataIndex="thanhtoan"
            width={40}
            align="center"
            render={(text) => (
              <div>
                {text === "Thanh toán" ? (
                  <span style={{ color: "red" }}>- {this.formatCurrency(text)}</span>
                ) : (
                  <span style={{ color: "red" }}>- {this.formatCurrency(text)}</span>
                )}
              </div>
            )}
          />
          <Column
            title="Thu nhập"
            key="thunhap"
            dataIndex="thunhap"
            width={80}
            align="center"
            render={(text) => (
              <div>
                {text === "Nạp tiền" || "Thu nhập" ? (
                  <span style={{ color: "green" }}>+ {this.formatCurrency(text)}</span>
                ) : (
                  <span style={{ color: "red" }}>- {this.formatCurrency(text)}</span>
                )}
              </div>
            )}
          />
          <Column
            title="Thời gian"
            key="thangnam"
            dataIndex="thangnam"
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
  getRevenues,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Statistics)
);
