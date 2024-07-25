import React, { useState, Component } from "react";
import "./YourOrders.css";
import withRouter from "../../../helpers/withRouter";
import {
  getDocumentsByAccountSale,
  updateDocument,
} from "../../../redux/actions/documentAction";
import { connect } from "react-redux";
import { Button, Tooltip } from "antd";
import DocumentForm from "../../document/DocumentForm";
import { FaRegEye } from "react-icons/fa";
class DocumentsSold extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      document: {
        matailieu: "",
        tentailieu: "",
        mota: "",
        giaban: "",
        diachiluutru: "",
        mataikhoan: "",
        danhmuc: { madanhmuc: "" },
      },
    };
  }
  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSesion = storedUserSession ? JSON.parse(storedUserSession) : null;
    this.props.getDocumentsByAccountSale(UserSesion.data.mataikhoan);
  }
  onEdit = (value) => {
    this.setState({ ...this.state, document: value, open: true });
  };
   onCreate = (values) => {
    console.log("object in ListDocument");
    console.log(values);
    if (values.matailieu) {
      this.props.updateDocument(values);
    }
    this.setState({
      ...this.state,
      document: {},
      open: false,
    });
  };
  render() {
    const { documents } = this.props;
    const { open } = this.state;
    return (
      <div className="yourorders">
        <h1 className="mainhead1">Tài Liệu Đã Tải Lên</h1>
        <table className="yourorderstable">
          <thead>
            <tr>
              <th scope="col">Tên tài liệu</th>
              <th scope="col">Kiểm duyệt</th>
              <th scope="col">Mô tả</th>
              <th scope="col">Giá</th>
              <th scope="col">Thông báo lỗi</th>
              <th scope="col">Tác vụ</th>
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
                  {document.kiemduyet == "Đã kiểm duyệt" && (
                    <span>
                      {document.ghichu === null
                        ? "Tài liệu bình thường"
                        : document.ghichu}
                    </span>
                  )}
                  {document.kiemduyet == "Chưa kiểm duyệt" && (
                    <span>
                      {document.ghichu === null
                        ? "Tài liệu chưa kiểm duyệt"
                        : document.ghichu}
                    </span>
                  )}
                  {document.kiemduyet == "Lỗi kiểm duyệt" && (
                    <span>
                      {document.ghichu === null ? "Không lỗi" : document.ghichu}
                    </span>
                  )}
                </td>
                <td data-label="tacvu">
                  <Button
                    type="primary"
                    size="big"
                    onClick={() => this.onEdit(document)}
                  >
                    <FaRegEye style={{ marginRight: 8 }} />
                    Cập nhật
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DocumentForm
          document={this.state.document}
          open={open}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState({ ...this.state, document: {}, open: false });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documentReducer.documents,
});

const mapDispatchToProps = {
  getDocumentsByAccountSale,
  updateDocument,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentsSold)
);
