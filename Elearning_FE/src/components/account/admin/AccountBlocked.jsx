import React, { Component } from "react";
import { getAccountsByStateless } from "../../../redux/actions/accountAction";
import "./UserManage.css";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Select, Button, message } from "antd";

class AccountBlocked extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDates: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getAccountsByStateless();
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
  calculateRemainingDays = (endDateStr) => {
    const parts = endDateStr.split("-"); // Tách chuỗi theo dấu '-'
    const endDate = new Date(parts[2], parts[1] - 1, parts[0]); // Tạo đối tượng Date từ ngày, tháng, năm

    const currentDate = new Date(); // Ngày hiện tại

    const differenceMs = endDate - currentDate; // Đếm số mili giây giữa ngày hiện tại và ngày kết thúc
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24)); // Chuyển đổi mili giây sang số ngày

    return differenceDays;
  };
  render() {
    const { accounts } = this.props;
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

    return (
      <div className="usermanage">
        <h1 className="mainhead2">Tài khoản người dùng</h1>
        <table className="yourorderstable1">
          <thead>
            <tr>
              <th scope="col">Tên tài khoản</th>

              <th scope="col">Thời hạn</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.mataikhoan}>
                <td data-label="manguoidung">{account.tendangnhap}</td>
                <td data-label="trangthai">
                  {this.calculateRemainingDays(account.trangthai)} ngày
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accounts: state.accountReducer.accounts,
});

const mapDispatchToProps = {
  getAccountsByStateless,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccountBlocked)
);
