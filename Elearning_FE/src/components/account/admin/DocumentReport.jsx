import React, { Component } from "react";
import { getReportedDocumentInfo } from "../../../redux/actions/reportAction";
import "./UserManage.css";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import {  Button, Skeleton, Table, Space, Tooltip } from "antd";
import Column from "antd/lib/table/Column";
import { IoEyeSharp } from "react-icons/io5";
import DocumentReportHistory from "./DocumentReportHistory";
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
    this.props.getReportedDocumentInfo();
  }
  openReportDocumentDetails = (object) => {
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
        <Table dataSource={reports} size="small" rowKey="mataikhoan">
          <Column
            title="Tên tài liệu"
            key="tentailieu"
            dataIndex="tentailieu"
            width={40}
            align="center"
            render={(tentailieu) => (
              <Tooltip placement="topLeft" title={tentailieu}>
                {tentailieu}
              </Tooltip>
            )}
          />

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
                  onClick={() => this.openReportDocumentDetails(record)}
                >
                  <IoEyeSharp style={{ marginRight: 8 }} />
                  Xem
                </Button>
              </Space>
            )}
          ></Column>
        </Table>
        {this.state.open && (
          <DocumentReportHistory
            matailieu={this.state.report.matailieu}
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
  getReportedDocumentInfo,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentReport)
);
