import "./Statistics.css";
import React, { Component } from "react";
import withRouter from "../../../helpers/withRouter";
import { getAllDocumentRevenueByAccount } from "../../../redux/actions/documentAction";

import { connect } from "react-redux";

import { Tooltip } from "antd";
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      object: {},
    };
  }
  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSesion = storedUserSession ? JSON.parse(storedUserSession) : null;
    this.props.getAllDocumentRevenueByAccount(UserSesion.mataikhoan);
  }

  render() {
    const { documents } = this.props;

    return (
      <div className="statistics">
        <h1 className="mainhead1">Thống Kê Doanh Thu</h1>
        <table className="statisticstable">
          <thead>
            <tr>
              <th scope="col">Tên tài liệu</th>
              <th scope="col">Số tiền thanh toán</th>
              <th scope="col">Phí quản trị</th>
              <th scope="col">Thu nhập tác giả</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((document) => (
              <tr>
                <td data-label="tentailieu" className="tentailieu">
                  {" "}
                  <Tooltip placement="topLeft" title={document.tentailieu}>
                    {document.tentailieu}
                  </Tooltip>
                </td>

                <td data-label="sotienthanhtoan">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(document.sotienthanhtoan)}
                </td>
                <td data-label="phiquantri">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(document.phiquantri)}
                </td>
                <td data-label="thunhaptacgia">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(document.thunhaptacgia)}
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
  documents: state.documentReducer.documents,
});

const mapDispatchToProps = {
  getAllDocumentRevenueByAccount,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Statistics)
);
