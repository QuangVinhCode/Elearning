import React, { Component } from "react";
import { getDocumentAllPayAmin } from "../../redux/actions/documentAction";
import ContentHeader from "../common/ContentHeader";
import withRouter from "../../helpers/withRouter";

import { connect } from "react-redux";
import { Select, Button, message, Skeleton, Table, Space } from "antd";
import Column from "antd/lib/table/Column";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      documents: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getDocumentAllPayAmin();
  }

  render() {
    const { navigate } = this.props.router;
    const { documents, isLoading } = this.props;

    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Doanh thu"
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
          title="Doanh thu"
          className="site-page-header"
        />
        <Table dataSource={documents} size="small" rowKey="mataikhoan">
          <Column
            title="Thời gian"
            key="thangnam"
            dataIndex="thangnam"
            width={80}
            align="center"
          />
          <Column
            title="Thu nhập tác giả"
            key="thunhaptacgia"
            dataIndex="thunhaptacgia"
            width={80}
            align="center"
            render={(text) => (
              <div>
                <span style={{ color: "green" }}>+ {text}</span>
              </div>
            )}
          />
          <Column
            title="Thu nhập phí quản trị"
            key="thunhapquantri"
            dataIndex="thunhapquantri"
            width={80}
            align="center"
            render={(text) => (
              <div>
                <span style={{ color: "green" }}>+ {text}</span>
              </div>
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
  getDocumentAllPayAmin,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
