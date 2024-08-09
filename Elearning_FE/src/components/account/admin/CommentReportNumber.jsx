import React, { Component } from "react";
import { getReportCommentMonitor } from "../../../redux/actions/reportAction";
import "./UserManage.css";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Select, Button, message, Skeleton, Table, Space, Tooltip } from "antd";
import Column from "antd/lib/table/Column";

class CommentReportNumber extends Component {
  constructor() {
    super();
    this.state = {
      selectedDates: {},
      reports: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getReportCommentMonitor();
  }

  render() {
    const { navigate } = this.props.router;
    const { reports, isLoading } = this.props;

    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="DS số lần bình luận bị tố cáo"
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
          title="DS số lần bình luận bị tố cáo"
          className="site-page-header"
        />
        <Table dataSource={reports} size="small" rowKey="mabaocaotailieu">
          <Column
            title="Tên tài khoản bị báo cáo"
            key="tentaikhoanbitocao"
            dataIndex="tentaikhoanbitocao"
            width={40}
            align="center"
          />
          <Column
            title="Số lần bị báo cáo"
            key="solanbaocao"
            dataIndex="solanbaocao"
            width={40}
            align="center"
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
  getReportCommentMonitor,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentReportNumber)
);
