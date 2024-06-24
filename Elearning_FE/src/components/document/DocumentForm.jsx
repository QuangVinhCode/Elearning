import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Upload,
} from "antd";
import React, { Component } from "react";
import { createRef } from "react";
import { getCategories } from "../../redux/actions/categoryAction";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import DocumentService from "../../services/documentService";
const { Option } = Select;
class DocumentForm extends Component {
  form = createRef();
  constructor(props) {
    super(props);

    this.state = {
      document: {
        matailieu: "",
        tentailieu: "",
        mota: "",
        giaban: "",
        diachiluutru: "",
        mataikhoan: "",
        danhmuc: { madanhmuc: "" },
      },
      previewImage: "",
      previewVisible: false,
      categories: [],
    };
  }

  async componentDidMount() {
   
    try {
      // Assuming getSubjects is a Redux action
      await this.props.getCategories();
      const categories = this.props.categories;
      this.setState({ categories });
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }

  handlePreview = (file) => {
    console.log("object in before file pdf");
    console.log(file);
    console.log(file.thumbUrl);
    if (file.thumbUrl) {
      this.setState({
        ...this.state,
        previewImage: file.thumbUrl,
        previewVisible: true,
      });
    }
  };

  handleRemove = (value) => {
    console.log("object in upload pdf");
    return false;
  };

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      return [e.fileList[1]];
    }
    const originalFileObj = e.fileList[0].originFileObj;
    console.log("Original File Object:", originalFileObj);
    return e && e.fileList;
  };

  handleSubjectChange = (value) => {
    console.log("first in handleSubjectChange");

    // Cập nhật giá trị subject_id trong state
    this.setState({
      document: {
        ...this.state.document,
        danhmuc: { madanhmuc: value },
      },
    });
  };
 
  render() {
    
    const { open, onCreate, onCancel } = this.props;
    const { document } = this.props;
    const { categories } = this.props;
    const storedUserSession = sessionStorage.getItem("userSession");
    const userSession = storedUserSession
      ? JSON.parse(storedUserSession)
      : null;
     
    let title = "Thêm tài liệu";
    let okText = "Thêm";
    if (document.matailieu) {
      title = "Cập nhật tài liệu";
      okText = "Sửa";
    }
    const pdfUrl = DocumentService.getDocumentPDFUrl(document.diachiluutru);
    const initialPDF = {
      url: pdfUrl,
      uid: document.diachiluutru,
    };

    return (
      <Modal
        open={open}
        title={title}
        okText={okText}
        cancelText="Hủy"
        onCancel={() => {
          this.form.current.resetFields(); // Reset form fields
          onCancel();        
        }}
        onOk={() => {
          this.form.current
            .validateFields()
            .then((values) => {
              this.form.current.resetFields();

              console.log("-------object in values form--------");
              console.log(values);
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          ref={this.form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
          key={"f" + document.matailieu}
        >
          <Form.Item
            label="Mã tài liệu"
            name="matailieu"
            initialValue={document.matailieu}
          >
            <Input readOnly></Input>
          </Form.Item>
          <Form.Item
            label="Tên tài liệu"
            name="tentailieu"
            initialValue={document.tentailieu}
            rules={[{ required: true, message: "Yêu cầu nhập tên tài liệu" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="mota"
            initialValue={document.mota}
            rules={[{ required: true, message: "Yêu cầu nhập tên tài liệu" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Giá bán"
            name="giaban"
            initialValue={document.giaban}
            rules={[{ required: true, message: "Yêu cầu nhập tên tài liệu" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="madanhmuc"
            initialValue={
              document.danhmuc ? document.danhmuc.madanhmuc : undefined
            }
            rules={[{ required: true, message: "Yêu cầu chọn môn học" }]}
          >
            <Select onChange={this.handleSubjectChange}>
              {categories.map((category) => (
                <Option key={category.tendanhmuc} value={category.madanhmuc}>
                  {category.tendanhmuc}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Tài khoản đăng tài liệu"
            name="mataikhoan"
            initialValue={userSession ? userSession.data.mataikhoan : ""}
            style={{ paddingLeft: 20 }}
            hidden={true}
          >
            <Input></Input>
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
              accept=".pdf"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button type="primary">Tải lên</Button>
            </Upload>
          </Form.Item>
          <Divider></Divider>
          {this.state.previewVisible && (
            <Image
              src={this.state.previewImage}
              style={{ with: 200 }}
              preview={{ visible: false }}
            ></Image>
          )}
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  categories: state.categoryReducer.objects,
});

const mapDispatchToProps = {
  getCategories,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentForm)
);
