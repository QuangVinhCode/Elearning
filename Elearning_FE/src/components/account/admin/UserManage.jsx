import React, { Component } from "react";
import { getAccountsByStatus,updateAccountStatus } from "../../../redux/actions/accountAction";
import "./UserManage.css";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Select, Button, message } from "antd";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDates: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getAccountsByStatus();
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
      this.props.updateAccountStatus(accountId,selectedDate);
      // Perform your send logic here
    } else {
      message.warning({
        content: "Chọn thời hạn",
        style: { marginTop: "20vh" },
      });
    }
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

              <th scope="col">Trạng thái</th>
              <th scope="col">Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.mataikhoan}>
                <td data-label="manguoidung">{account.tendangnhap}</td>
                <td data-label="trangthai">{account.trangthaidangtai}</td>
                <td data-label="tacvu">
                  <div className="action-container">
                    <Select
                      showSearch
                      placeholder="Chọn ngày"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={options}
                      onChange={(value) =>
                        this.handleDateChange(account.mataikhoan, value)
                      }
                    />
                    <Button
                      type="primary"
                      onClick={() => this.handleSendDate(account.mataikhoan)}
                    >
                      Xác nhận
                    </Button>
                  </div>
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
  getAccountsByStatus,
  updateAccountStatus,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserManage)
);
