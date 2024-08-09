import React, { Component } from "react";
import { getReportDocuments } from "../../../redux/actions/reportAction";
import "./UserManage.css";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Select, Button, message, Skeleton, Table, Space, Tooltip } from "antd";
import Column from "antd/lib/table/Column";

class DocumentReport extends Component {
  constructor() {
    super();
    this.state = {
      selectedDates: {},
      reports: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getReportDocuments();
  }

  render() {
    const { navigate } = this.props.router;
    const { reports, isLoading } = this.props;

    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="DS tố cáo tài liệu"
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
          title="DS tố cáo tài liệu"
          className="site-page-header"
        />
        <Table dataSource={reports} size="small" rowKey="mabaocaotailieu">
          <Column
            title="Tên tài liệu"
            key="tailieu"
            dataIndex="tailieu"
            width={40}
            align="center"
            render={(tailieu) => (
              <Tooltip
                placement="topLeft"
                title={tailieu ? tailieu.tentailieu : "N/A"}
              >
                {tailieu ? tailieu.tentailieu : "N/A"}
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
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  reports: state.reportReducer.reports,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getReportDocuments,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentReport)
);
