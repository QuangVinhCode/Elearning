import React, { useState, Component } from "react";
import "./YourOrders.css";
import withRouter from "../../../helpers/withRouter";
import { getDocuments } from "../../../redux/actions/documentAction";
import { connect } from "react-redux";
import { Tooltip } from "antd";
class YourOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getDocuments();
  }
  render() {
    const { documents } = this.props;

    return (
      <div className="yourorders">
        <h1 className="mainhead1">Tài Liệu</h1>
        <table className="yourorderstable">
          <thead>
            <tr>
              <th scope="col">Tên tài liệu</th>
              <th scope="col">Kiểm duyệt</th>
              <th scope="col">Mô tả</th>
              <th scope="col">Giá</th>
              <th scope="col">Thông báo lỗi</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((document) => (
              <tr>
                <td data-label="tentailieu">{document.tentailieu}</td>
                <td data-label="kiemduyet">
                  <div>
                    {document.kiemduyet == "Đã kiểm duyệt" && (
                      <span className="greendot"></span>
                    )}
                    {document.kiemduyet == "Chưa kiểm duyệt" && (
                      <span className="yellowdot"></span>
                    )}
                    {document.kiemduyet == "Lỗi kiểm duyệt" && (
                      <span className="reddot"></span>
                    )}
                    {document.kiemduyet}
                  </div>
                </td>
                <td data-label="mota" className="mota">
                  <Tooltip placement="topLeft" title={document.mota}>
                    {document.mota}
                  </Tooltip>
                </td>
                <td data-label="giaban">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(document.giaban)}
                </td>
                <td data-label="ghichu">
                  {document.ghichu === null ? "Không lỗi" : document.ghichu}
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
  getDocuments,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(YourOrders)
);
