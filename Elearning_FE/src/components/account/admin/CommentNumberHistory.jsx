import React, { Component } from "react";

import { Modal, Table } from "antd";

import { getReportCommentByAccount } from "../../../redux/actions/reportAction";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";

import Column from "antd/lib/table/Column";
class CommentNumberHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: {},
    };
  }

  componentDidMount() {
    this.props.getReportCommentByAccount(this.props.mataikhoan);
  }

  render() {
    const { onCancel, open } = this.props;

    const { reports } = this.props;
    return (
      <Modal
        title="Chi tiết báo cáo bình luận"
        visible={open}
        onCancel={onCancel}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
        width="100%"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <Table dataSource={reports} size="small" rowKey="mataikhoan">
          <Column
            title="Tên tài khoản báo cáo"
            key="tentaikhoanbaocao"
            dataIndex="tentaikhoanbaocao"
            width={40}
            align="center"
          />

          <Column
            title="Lý do"
            key="lydo"
            dataIndex="lydo"
            width={40}
            align="center"
          />

          <Column
            title="Thời gian báo cáo"
            key="thoigianbaocao"
            dataIndex="thoigianbaocao"
            width={40}
            align="center"
          />
          <Column
            title="Trạng thái"
            key="trangthai"
            dataIndex="trangthai"
            width={40}
            align="center"
          />
        </Table>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  reports: state.reportReducer.report_details,
});

const mapDispatchToProps = {
  getReportCommentByAccount,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentNumberHistory)
);
