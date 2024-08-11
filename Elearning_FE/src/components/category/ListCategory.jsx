import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import ContentHeader from "../common/ContentHeader";
import { Button, Space, Table, Modal, Skeleton } from "antd";
import Column from "antd/lib/table/Column";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import {
  getCategories,
  clearCategoryState,
  deleteCategory,
} from "../../redux/actions/categoryAction";

class ListCategory extends Component {
  constructor() {
    super();

    this.state = {
      object: {},
    };
  }
  componentDidMount = () => {
    this.props.getCategories();

    console.log("Did Mount");
  };

  componentWillUnmount = () => {
    this.props.clearCategoryState();
    console.log("Will Unmount");
  };

  editCategory = (object) => {
     console.log(object);

     const { navigate } = this.props.router;
    console.log("EditClas is " + object.madanhmuc);
     navigate("/dashboard/category/update/" + object.madanhmuc);
  };
  deleteCategory = () => {
    this.props.deleteCategory(this.state.object.madanhmuc);
   
  };

  openDeleteConfirmModal = (object) => {
    this.setState({ ...this.state, object: object });
    console.log(object);
    const message = "Bạn có chắt chắn muốn xóa danh mục " + object.tendanhmuc;

    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: this.deleteCategory,
      okText: "Xóa",
      cancelText: "Hủy",
    });
  };

  render() {
    const { navigate } = this.props.router;
    const { objects, isLoading } = this.props;
    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Danh sách danh mục"
            className="site-page-header"
          ></ContentHeader>
          <Skeleton active />
        </>
      );
    }
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
          <Column
            title="Tác vụ"
            key="action"
            dataIndex="action"
            width={140}
            align="center"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.editCategory(record)}
                >
                  <EditOutlined style={{ marginRight: 8 }} />
                  Sửa
                </Button>
                <Button
                  key={record.key}
                  type="primary"
                  danger
                  size="small"
                  onClick={() => this.openDeleteConfirmModal(record)}
                >
                  <DeleteOutlined style={{ marginRight: 8 }} />
                  Xóa
                </Button>
              </Space>
            )}
          ></Column>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  objects: state.categoryReducer.objects,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getCategories,
  clearCategoryState,
  deleteCategory,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListCategory)
);
