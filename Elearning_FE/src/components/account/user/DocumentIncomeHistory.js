import React, { Component } from "react";
import { getDocumentCollectionByAccount } from "../../../redux/actions/documentAction";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";
import { connect } from "react-redux";
import { Tooltip, Skeleton, Table } from "antd";
import Column from "antd/lib/table/Column";

class DocumentIncomeHistory extends Component {
  constructor() {
    super();
    this.state = {
      documents: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSesion = storedUserSession ? JSON.parse(storedUserSession) : null;
    this.props.getDocumentCollectionByAccount(UserSesion.mataikhoan);
  }

  render() {
    const { navigate } = this.props.router;
    const { documents, isLoading } = this.props;
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    };
    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Lịch sử doanh thu tài liệu"
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
          title="Lịch sử doanh thu tài liệu"
          className="site-page-header"
        />
        <Table dataSource={documents} size="small" rowKey="matailieu">
          <Column
            title="Tên tài liệu"
            key="tentailieu"
            dataIndex="tentailieu"
            width={40}
            align="center"
          />
          <Column
            title="Giá bán"
            key="giaban"
            dataIndex="giaban"
            width={40}
            align="center"
            render={(text) => (
              <Tooltip placement="topLeft" title={formatCurrency(text)}>
                {formatCurrency(text)}
              </Tooltip>
            )}
          />
          <Column
            title="Số lần thanh toán"
            key="solanthanhtoan"
            dataIndex="solanthanhtoan"
            width={40}
            align="center"
          />
          <Column
            title="Tổng thu nhập tác giả"
            key="tongthunhaptacgia"
            dataIndex="tongthunhaptacgia"
            width={40}
            align="center"
            render={(text) => (
              <Tooltip placement="topLeft" title={formatCurrency(text)}>
                {formatCurrency(text)}
              </Tooltip>
            )}
          />
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documentReducer.documents,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getDocumentCollectionByAccount,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentIncomeHistory)
);
