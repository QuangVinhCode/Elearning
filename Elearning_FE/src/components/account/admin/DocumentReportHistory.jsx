import React, { Component } from "react";

import { Modal, Table, Tooltip } from "antd";

import {
  getReportsByDocument,
  clearReportDetailsState,
} from "../../../redux/actions/reportAction";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";

import Column from "antd/lib/table/Column";
class DocumentReportHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: {},
    };
  }

  componentDidMount() {
    this.props.getReportsByDocument(this.props.matailieu);
  }

  componentWillUnmount = () => {
  //  this.props.clearReportDetailsState();
  };

  render() {
    const { onCancel, open } = this.props;

    const { reports } = this.props;
    return (
      <Modal
        title="Chi tiết báo cáo tài liệu"
        visible={open}
        onCancel={onCancel}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
        width="100%"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <Table dataSource={reports} size="small" rowKey="matailieu">
          <Column
            title="Tên tài khoản báo cáo"
            key="taikhoan"
            dataIndex="taikhoan"
            width={40}
            align="center"
            render={(taikhoan) => (
              <Tooltip
                placement="topLeft"
                title={taikhoan ? taikhoan.tendangnhap : "N/A"}
              >
                {taikhoan ? taikhoan.tendangnhap : "N/A"}
              </Tooltip>
            )}
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
        </Table>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  reports: state.reportReducer.report_details,
});

const mapDispatchToProps = {
  getReportsByDocument,
  clearReportDetailsState,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentReportHistory)
);
