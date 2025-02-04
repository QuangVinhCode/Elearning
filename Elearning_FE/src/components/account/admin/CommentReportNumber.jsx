import React, { Component } from "react";
import { getReportCommentMonitor } from "../../../redux/actions/reportAction";
import "./UserManage.css";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import {  Button, Skeleton, Table, Space } from "antd";
import Column from "antd/lib/table/Column";
import { IoEyeSharp } from "react-icons/io5";
import CommentNumberHistory from "./CommentNumberHistory";
class CommentReportNumber extends Component {
  constructor() {
    super();
    this.state = {
      selectedDates: {},
      open: false,
      reports: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getReportCommentMonitor();
  }
  openReportDetails = (object) => {
    this.setState({ ...this.state, report: object, open: true });
  };
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
          <Column
            title="Tác vụ"
            key="action"
            dataIndex="action"
            width={40}
            align="center"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.openReportDetails(record)}
                >
                  <IoEyeSharp style={{ marginRight: 8 }} />
                  Xem
                </Button>
              </Space>
            )}
          ></Column>
        </Table>
        {this.state.open && (
          <CommentNumberHistory
            mataikhoan={this.state.report.mataikhoan}
            open={this.state.open}
            onCancel={() => {
              this.setState({ ...this.state, report: {}, open: false });
            }}
          />
        )}
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
