import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { Col, Divider, Row, Form, Input, Button, Popconfirm } from "antd";
import ContentHeader from "../common/ContentHeader";
import {
  insertCategory,
  getCategory,
  clearCategory,
  updateCategory,
} from "../../redux/actions/categoryAction";
import { connect } from "react-redux";
class AddOrEditCategory extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      object: { madanhmuc: "", tendanhmuc: "" },
    };
  }
  componentDidMount = () => {
    if (this.props.router.params.madanhmuc) {
      this.props.getCategory(this.props.router.params.madanhmuc);
    } else {
      this.props.clearCategory();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Kiểm tra xem nextProps có object không và object có thay đổi không
    if (nextProps.object && prevState.object.madanhmuc !== nextProps.object.madanhmuc) {
      // Nếu có thay đổi, cập nhật state với dữ liệu từ nextProps.object
      return {
        ...prevState,
        object: nextProps.object,
      };
    } else if (!nextProps.object) {
      // Nếu không có nextProps.object, reset state với giá trị mặc định
      return {
        ...prevState,
        object: { madanhmuc: "", tendanhmuc: "" },
      };
    }
    // Không cần cập nhật state
    return null;
  }
  confirmUpdate = () => {
    console.log("Cập nhật  danh mục");
    this.formRef.current.submit();
  };

  onSubmitForm = (values) => {
    console.log(values);

    const { navigate } = this.props.router;
    const { madanhmuc } = this.state.object;
    //this.state.object.madanhmuc
    if (!madanhmuc) {
      this.props.insertCategory(values, navigate);
    } else {
      this.props.updateCategory(madanhmuc, values, navigate);
    }
  };

  render() {
    const { navigate } = this.props.router;
    const { isLoading } = this.props;
    const { object } = this.state;
    console.log("oject in this.state:");
    console.log(object);
    let title = "Thêm danh mục mới";
    if (object.madanhmuc) {
      title = "Cập nhật danh mục";
    }
    return (
      <div>
        <ContentHeader
          navigate={navigate}
          title={title}
          className="site-page-header"
        ></ContentHeader>

        <Form
          layout="vertical"
          className="form"
          onFinish={this.onSubmitForm}
          key={object.madanhmuc}
          ref={this.formRef}
        >
          <Row>
            <Col md={12}>
              <Form.Item
                label="Mã danh mục"
                name="madanhmuc"
                initialValue={object.madanhmuc}
              >
                <Input readOnly></Input>
              </Form.Item>
              <Form.Item
                label="Tên danh mục"
                name="tendanhmuc"
                initialValue={object.tendanhmuc}
                rules={[{ required: true, min: 2 }]}
              >
                <Input></Input>
              </Form.Item>

              <Divider></Divider>
              {!object.madanhmuc && (
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ float: "right" }}
                  loading={isLoading}
                >
                  Thêm mới
                </Button>
              )}
              {object.madanhmuc && (
                <Popconfirm
                  title="Bạn muốn cập nhật không ?"
                  onConfirm={this.confirmUpdate}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ float: "right" }}
                    loading={isLoading}
                  >
                    Cập nhật
                  </Button>
                </Popconfirm>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  object: state.categoryReducer.object,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  insertCategory,
  getCategory,
  clearCategory,
  updateCategory,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddOrEditCategory)
);
