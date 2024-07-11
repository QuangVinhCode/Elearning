import React, { Component } from "react";
import { getAccounts } from "../../redux/actions/accountAction";
import "./UserManage.css";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";

class UserManage extends Component {
  componentDidMount() {
    this.props.getAccounts();
  }

  render() {
    const { accounts } = this.props;
    return (
      <div className="usermanage">
        <h1 className="mainhead2">Tài khoản người dùng</h1>
        <table className="yourorderstable1">
          <thead>
            <tr>
              <th scope="col">Mã tài khoản</th>
              <th scope="col">Tên tài khoản</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}> {/* Đảm bảo bạn có một thuộc tính id hoặc một giá trị duy nhất cho mỗi account */}
                <td data-label="manguoidung">{account.tendangnhap}</td>
                <td data-label="tennguoidung">{account.gmail}</td>
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
  getAccounts,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserManage)
);
