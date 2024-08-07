import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryAction";
import { getDocuments } from "../../redux/actions/documentAction";
import Column from "antd/lib/table/Column";
import ContentHeader from "../common/ContentHeader";
import { Table } from "antd";
class Home extends Component {
  componentDidMount = () => {
    this.props.getCategories();
    this.props.getDocuments();
    console.log("Did Mount");
  };
  render() {
    const { navigate } = this.props.router;
    const { objects, documents } = this.props;
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Danh sách danh mục"
          className="site-page-header"
        ></ContentHeader>
        <Table dataSource={objects} size="small" rowKey="madanhmuc">
          <Column
            title="Mã danh mục"
            key="madanhmuc"
            dataIndex="madanhmuc"
            width={40}
            align="center"
          ></Column>
          <Column
            title="Tên danh mục"
            key="tendanhmuc"
            dataIndex="tendanhmuc"
            width={80}
            align="center"
          ></Column>
        </Table>
        <Table dataSource={documents} size="small" rowKey="matailieu">
          <Column
            title="Mã tài liệu"
            key="matailieu"
            dataIndex="matailieu"
            width={40}
            align="center"
          ></Column>
          <Column
            title="Tên tài liệu"
            key="tentailieu"
            dataIndex="tentailieu"
            width={80}
            align="center"
          ></Column>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  objects: state.categoryReducer.objects,
  documents: state.documentReducer.documents,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getCategories,
  getDocuments,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
