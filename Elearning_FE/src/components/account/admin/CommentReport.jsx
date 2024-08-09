import React, { Component } from "react";
import { getReportComments } from "../../../redux/actions/reportAction";
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
    this.props.getReportComments();
  }

  render() {
    const { navigate } = this.props.router;
    const { reports, isLoading } = this.props;

    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="DS tố cáo bình luận"
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
          title="DS tố cáo bình luận"
          className="site-page-header"
        />
        <Table dataSource={reports} size="small" rowKey="mataikhoan">
          <Column
            title="Nội dung binh luận"
            key="binhluan"
            dataIndex="binhluan"
            width={40}
            align="center"
            render={(binhluan) => (
              <Tooltip
                placement="topLeft"
                title={binhluan ? binhluan.noidung : "N/A"}
              >
                {binhluan ? binhluan.noidung : "N/A"}
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
  getReportComments,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentReport)
);
