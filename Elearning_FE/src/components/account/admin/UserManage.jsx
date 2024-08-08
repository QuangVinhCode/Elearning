import React, { Component } from "react";
import {
  getAccountsByPostingStatus,
  updateAccountStatus,
  updateAccountStatusBL,
} from "../../../redux/actions/accountAction";
import "./UserManage.css";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Select, Button, message, Skeleton, Table, Space } from "antd";
import Column from "antd/lib/table/Column";

class UserManage extends Component {
  constructor() {
    super();
    this.state = {
      selectedDates: {},
      accounts: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getAccountsByPostingStatus();
  }

  calculateDate = (daysToAdd) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const dd = String(date.getDate()).padStart(2, "0");
    return `${dd}-${mm}-${yyyy}`;
  };

  handleDateChange = (accountId, value) => {
    this.setState((prevState) => ({
      selectedDates: {
        ...prevState.selectedDates,
        [accountId]: value,
      },
    }));
  };

  handleSendDate = (accountId) => {
    const selectedDate = this.state.selectedDates[accountId];
    if (selectedDate) {
      console.log(`Sending date ${selectedDate} for account ${accountId}`);
      this.props.updateAccountStatus(accountId, selectedDate);
      // Perform your send logic here
    } else {
      message.warning({
        content: "Chọn thời hạn",
        style: { marginTop: "20vh" },
      });
    }
  };

  handleSendDateBL = (accountId) => {
    const selectedDate = this.state.selectedDates[accountId];
    if (selectedDate) {
      console.log(`Sending date ${selectedDate} for account ${accountId}`);
      this.props.updateAccountStatusBL(accountId, selectedDate);
      // Perform your send logic here
    } else {
      message.warning({
        content: "Chọn thời hạn",
        style: { marginTop: "20vh" },
      });
    }
  };

  calculateRemainingDays = (endDateStr) => {
    if (!endDateStr) {
      console.error("Invalid endDateStr:", endDateStr);
      return 0; // Or any default value or behavior you want
    }

    const parts = endDateStr.split("-");
    if (parts.length !== 3) {
      console.error("Invalid date format:", endDateStr);
      return 0;
    }

    const endDate = new Date(parts[2], parts[1] - 1, parts[0]); // Create a Date object from day, month, year

    const currentDate = new Date(); // Current date

    const differenceMs = endDate - currentDate; // Difference in milliseconds
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return differenceDays;
  };

  render() {
    const { navigate } = this.props.router;
    const { accounts, isLoading } = this.props;
    const options = [
      {
        value: this.calculateDate(3),
        label: "3 Ngày (" + this.calculateDate(3) + ")",
      },
      {
        value: this.calculateDate(7),
        label: "7 Ngày (" + this.calculateDate(7) + ")",
      },
      {
        value: this.calculateDate(30),
        label: "30 Ngày (" + this.calculateDate(30) + ")",
      },
    ];

    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Quản lý chặn"
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
          title="Quản lý chặn"
          className="site-page-header"
        />
        <Table dataSource={accounts} size="small" rowKey="mataikhoan">
          <Column
            title="Tên tài khoản"
            key="tendangnhap"
            dataIndex="tendangnhap"
            width={40}
            align="center"
          />
          <Column
            title="Trạng thái đăng tài liệu"
            key="trangthaidangtai"
            dataIndex="trangthaidangtai"
            width={80}
            align="center"
            render={(text) => (
              <div>
                {text === "Bình thường" ? (
                  <span className="trangthai1">{text}</span>
                ) : (
                  <span className="trangthai1">
                    Bị chặn {this.calculateRemainingDays(text)} ngày
                  </span>
                )}
              </div>
            )}
          />
          <Column
            title="Trạng thái bình luận"
            key="trangthaibinhluan"
            dataIndex="trangthaibinhluan"
            width={80}
            align="center"
            render={(text) => (
              <div>
                {text === "Bình thường" ? (
                  <span className="trangthai1">{text}</span>
                ) : (
                  <span className="trangthai1">
                    Bị chặn {this.calculateRemainingDays(text)} ngày
                  </span>
                )}
              </div>
            )}
          />
          <Column
            title="Tác vụ"
            key="action"
            dataIndex="action"
            width={140}
            align="center"
            render={(_, record) => (
              <Space size="middle">
                <Select
                  showSearch={false}
                  placeholder="Chọn ngày"
                  options={options}
                  onChange={(value) =>
                    this.handleDateChange(record.mataikhoan, value)
                  }
                />
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.handleSendDate(record.mataikhoan)}
                >
                  Chặn đăng tài liệu
                </Button>
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.handleSendDateBL(record.mataikhoan)}
                >
                  Chặn bình luận
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
  accounts: state.accountReducer.accounts,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getAccountsByPostingStatus,
  updateAccountStatus,
  updateAccountStatusBL,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserManage)
);
