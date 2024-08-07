import React, { Component } from "react";
import "./YourOrders.css";
import withRouter from "../../../helpers/withRouter";
import {
  getDocumentsByAccountPay,
  updateDocument,
} from "../../../redux/actions/documentAction";
import { connect } from "react-redux";
import { Tooltip, Button } from "antd";
import { FaRegEye } from "react-icons/fa";
class YourOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSesion = storedUserSession ? JSON.parse(storedUserSession) : null;
    this.props.getDocumentsByAccountPay(UserSesion.mataikhoan);
    const { id } = this.props.router.params;
    this.props.getDocumentsByAccountPay(id);
  }
  onDocument = (id) => {
    const { navigate } = this.props.router;
    navigate("/users/detail/" + id);
  };
  render() {
    const { documents } = this.props;

    return (
      <div className="yourorders">
        <h1 className="mainhead1">Tài Liệu Đã Thanh Toán</h1>
        <table className="yourorderstable">
          <thead>
            <tr>
              <th scope="col">Tên tài liệu</th>
              <th scope="col">Mô tả</th>
              <th scope="col">Tác vụ</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((document) => (
              <tr>
                <td data-label="tentailieu" className="tentailieu">
                  <Tooltip placement="topLeft" title={document.tentailieu}>
                    {document.tentailieu}
                  </Tooltip>
                </td>

                <td data-label="mota" className="mota">
                  <Tooltip placement="topLeft" title={document.mota}>
                    {document.mota}
                  </Tooltip>
                </td>
                <td data-label="tacvu">
                  <Button
                    type="primary"
                    size="big"
                    onClick={() => this.onDocument(document.matailieu)}
                  >
                    <FaRegEye style={{ marginBottom: 8 }} />
                  </Button>
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
  getDocumentsByAccountPay,
  updateDocument,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(YourOrders)
);
