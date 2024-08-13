import React, { Component } from "react";
import { getDocumentUploadAdmin } from "../../../redux/actions/documentAction";
import ContentHeader from "../../common/ContentHeader";
import withRouter from "../../../helpers/withRouter";

import { connect } from "react-redux";
import {
  Select,
  Button,
  message,
  Skeleton,
  Table,
  Space,
  Tooltip,
  Input,
} from "antd";
import Column from "antd/lib/table/Column";

class UploadAll extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      documents: {},
      // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getDocumentUploadAdmin();
  }
  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
  };
  render() {
    const { navigate } = this.props.router;
    const { documents, isLoading } = this.props;
    const { searchText } = this.state;
    const filteredDocuments = documents.filter(
      (document) =>
        (document.tendangnhap && // Check if tentailieu exists
          document.tendangnhap
            .toLowerCase()
            .includes(searchText.toLowerCase())) ||
        (document.tentailieu && // Check if tentailieu exists
          document.tentailieu.toLowerCase().includes(searchText.toLowerCase()))
    );

    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Lịch sử đăng tài liệu"
          className="site-page-header"
        />
        <Space style={{ marginBottom: 16, marginTop: 10 }}>
          <Input
            placeholder="Tìm kiếm theo tên tài liệu "
            value={searchText}
            onChange={this.handleSearch}
            style={{ width: 300 }}
          />
        </Space>
        <Table dataSource={filteredDocuments} size="small">
          <Column
            title="Tên tài khoản"
            key="tendangnhap"
            dataIndex="tendangnhap"
            width={80}
            align="center"
          />
          <Column
            title="Tên tài liệu"
            key="tentailieu"
            dataIndex="tentailieu"
            width={80}
            align="center"
          />
          <Column
            title="Thời gian tải lên"
            key="thoigiantailen"
            dataIndex="thoigiantailen"
            width={80}
            align="center"
          />
          <Column
            title="Thời gian được duyệt"
            key="thoigianduocduyet"
            dataIndex="thoigianduocduyet"
            width={80}
            align="center"
          />
          <Column
            title="Trạng thái"
            key="trangthai"
            dataIndex="trangthai"
            width={80}
            align="center"
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
  getDocumentUploadAdmin,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UploadAll)
);
