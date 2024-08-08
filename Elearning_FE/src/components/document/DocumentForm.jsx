import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import DocumentService from "../../services/documentService";
import { getCategories } from "../../redux/actions/categoryAction";
import { getAccount } from "../../redux/actions/accountAction";
const { Option } = Select;

class DocumentForm extends Component {
  form = createRef();

  constructor(props) {
    super(props);

    this.state = {
      document: {
        matailieu: "",
        tentailieu: "",
        tacgia: "",
        mota: "",
        giaban: "",
        diachiluutru: "",
        tylephiquantri: "",
        tylethunhaptacgia: "",
        mataikhoan: "",
        danhmuc: { madanhmuc: "" },
      },
      isFileSizeValid: true,
      previewVisible: false,
      categories: [],
    };
  }

  componentDidMount() {
    const storedUserSession = sessionStorage.getItem("userSession");

    const userSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;
    this.props.getAccount(userSession.mataikhoan);
    this.props.getCategories();
  }

  componentWillUnmount() {
    // Check if form.current exists before trying to reset
    if (this.form.current) {
      this.form.current.resetFields();
    }
  }

  handlePreview = (file) => {
    if (file.thumbUrl) {
      this.setState({
        previewImage: file.thumbUrl,
        previewVisible: true,
      });
    }
  };

  handleRemove = (value) => {
    return false;
  };

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      return [e.fileList[1]];
    }
    return e && e.fileList;
  };

  handleSubjectChange = (value) => {
    this.setState({
      document: {
        ...this.state.document,
        danhmuc: { madanhmuc: value },
      },
    });
  };

  beforeUpload = (file) => {
    const isLt100M = file.size / 1024 / 1024 < 100; // Kiểm tra nếu kích thước tệp nhỏ hơn 100MB
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      message.error("Chỉ chấp nhận các tệp PDF!");
    }
    if (!isLt100M) {
      message.info({
        content: "Kích thước file pdf < 100MB!",
        style: { marginTop: "20vh" },
      });
    }
    this.setState({ isFileSizeValid: isLt100M && isPdf });
    return !isLt100M || !isPdf;
  };

  formatCurrency = (value) => {
    if (!value) return "";
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  parseCurrency = (value) => {
    return value.replace(/\đ\s?|(\,*)/g, "");
  };

  handlePercentageChange = (changedValue, allValues) => {
    const { tylephiquantri, tylethunhaptacgia } = allValues;
    if (changedValue.hasOwnProperty("tylephiquantri")) {
      this.form.current.setFieldsValue({
        tylethunhaptacgia: 10 - tylephiquantri,
      });
    } else if (changedValue.hasOwnProperty("tylethunhaptacgia")) {
      this.form.current.setFieldsValue({
        tylephiquantri: 10 - tylethunhaptacgia,
      });
    }
  };

  render() {
    const { open, onCreate, onCancel } = this.props;
    const { document } = this.props;
    const { categories, account } = this.props;
    const storedUserSession = sessionStorage.getItem("userSession");

    const userSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;

    let title = "Đăng tài liệu";
    let okText = "Đăng";
    if (document.matailieu) {
      title = "Cập nhật tài liệu";
      okText = "Cập nhật";
    }
    const pdfUrl = DocumentService.getDocumentPDFUrl(document.diachiluutru);
    const initialPDF = { url: pdfUrl, uid: document.diachiluutru };

    return (
      <Modal
        open={open}
        title={title}
        okText={okText}
        cancelText="Hủy"
        onCancel={() => {
          if (this.form.current) {
            this.form.current.resetFields(); // Reset form fields if form.current exists
          }
          onCancel();
        }}
        onOk={() => {
          if (!this.state.isFileSizeValid) {
            message.error({
              content: "Định danh file pdf và kích thước < 100MB",
              style: { marginTop: "20vh" },
            });
            return;
          }
          if (this.form.current) {
            this.form.current
              .validateFields()
              .then((values) => {
                this.form.current.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }
        }}
      >
        <Form
          ref={this.form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
          key={"f" + document.matailieu}
          onValuesChange={this.handlePercentageChange}
        >
          <Form.Item
            label="Mã tài liệu"
            name="matailieu"
            initialValue={document.matailieu}
            hidden={true}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="Tên tài liệu"
            name="tentailieu"
            initialValue={document.tentailieu}
            rules={[{ required: true, message: "Yêu cầu nhập tên tài liệu" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tác giả"
            name="tacgia"
            initialValue={document.tacgia}
            rules={[{ required: true, message: "Yêu cầu nhập tên tác giả" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="mota"
            initialValue={document.mota}
            rules={[
              { required: true, message: "Yêu cầu nhập mô tả" },
              { max: 255, message: "Mô tả không được vượt quá 255 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá bán"
            name="giaban"
            initialValue={document.giaban}
            rules={[{ required: true, message: "Yêu cầu nhập giá tiền" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              step={1000}
              formatter={this.formatCurrency}
              parser={this.parseCurrency}
            />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="madanhmuc"
            initialValue={
              document.danhmuc ? document.danhmuc.madanhmuc : undefined
            }
            rules={[{ required: true, message: "Yêu cầu chọn danh mục" }]}
          >
            <Select onChange={this.handleSubjectChange}>
              {categories.map((category) => (
                <Option key={category.tendanhmuc} value={category.madanhmuc}>
                  {category.tendanhmuc}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {account.quyenhan !== "Quản trị viên" ? (
            <>
              <Form.Item
                label="Tỷ lệ thu nhập tác giả (%)"
                name="tylethunhaptacgia"
                initialValue={document.tylethunhaptacgia}
                rules={[
                  {
                    required: true,
                    message: "Yêu cầu nhập tỷ lệ thu nhập tác giả",
                  },
                ]}
              >
                <InputNumber min={0} max={10} />
              </Form.Item>
              <Form.Item
                label="Tỷ lệ phí quản trị viên (%)"
                name="tylephiquantri"
                initialValue={document.tylephiquantri}
                rules={[
                  {
                    required: true,
                    message: "Yêu cầu nhập tỷ lệ phí quản trị viên",
                  },
                ]}
              >
                <InputNumber min={0} max={10} />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                label="Tỷ lệ thu nhập tác giả (%)"
                name="tylethunhaptacgia"
                initialValue={10}
                hidden={true}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Tỷ lệ phí quản trị viên (%)"
                name="tylephiquantri"
                initialValue={0}
                hidden={true}
              >
                <InputNumber />
              </Form.Item>
            </>
          )}
          <Form.Item
            label="Tài khoản đăng tài liệu"
            name="mataikhoan"
            initialValue={userSession.mataikhoan}
            hidden={true}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nội dung file PDF"
            name="diachiluutru"
            initialValue={[initialPDF]}
            valuePropName="fileList"
            rules={[{ required: true, message: "Yêu cầu chọn file pdf" }]}
            getValueFromEvent={this.normFile}
          >
            <Upload
              listType="text"
              onPreview={this.handlePreview}
              onRemove={this.handleRemove}
              beforeUpload={this.beforeUpload}
            >
              <Button type="primary">Tải file pdf lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.objects,
  account: state.accountReducer.account,
});

const mapDispatchToProps = {
  getCategories,
  getAccount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DocumentForm));