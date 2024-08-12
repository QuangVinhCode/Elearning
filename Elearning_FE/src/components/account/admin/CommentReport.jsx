import React, { Component } from "react";
import { getReportedCommentsInfo } from "../../../redux/actions/reportAction";
import "./UserManage.css";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Select, Button, message, Skeleton, Table, Space, Tooltip } from "antd";
import Column from "antd/lib/table/Column";
import { IoEyeSharp } from "react-icons/io5";
import CommentReportHistory from "./CommentReportHistory";

class DocumentReport extends Component {
  constructor() {
    super();
    this.state = {
      selectedDates: {},
      reports: {},
      open: false, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getReportedCommentsInfo();
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
            title="Tên tài khoản bị báo cáo"
            key="tentaikhoanbitocao"
            dataIndex="tentaikhoanbitocao"
            width={40}
            align="center"
            render={(tentaikhoanbitocao) => (
              <Tooltip placement="topLeft" title={tentaikhoanbitocao}>
                {tentaikhoanbitocao}
              </Tooltip>
            )}
          />
          <Column
            title="Nội dung binh luận"
            key="noidungbinhluan"
            dataIndex="noidungbinhluan"
            width={40}
            align="center"
            render={(noidungbinhluan) => (
              <Tooltip placement="topLeft" title={noidungbinhluan}>
                {noidungbinhluan}
              </Tooltip>
            )}
          />

          <Column
            title="Số lần báo cáo"
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
          <CommentReportHistory
            mabinhluan={this.state.report.mabinhluan}
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
  getReportedCommentsInfo,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentReport)
);
