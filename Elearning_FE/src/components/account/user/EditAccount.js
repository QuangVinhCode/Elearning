import React, { useEffect, useState } from "react";
import "./AccountSettings.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber, message } from "antd";
import { connect } from "react-redux";
import {
  updateAccount,
  getAccount,
} from "../../../redux/actions/accountAction";

const useUserSession = () => {
  const storedUserSession = sessionStorage.getItem("userSession");
  return storedUserSession ? JSON.parse(storedUserSession) : null;
};
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const EditAccount = ({ updateAccount, getAccount, account }) => {
  const [form] = Form.useForm();
  const userSession = useUserSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (userSession) {
      const { mataikhoan } = userSession;
      getAccount(mataikhoan);
    }
  }, []);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const data = {
      mataikhoan: values.mataikhoan,
      tendangnhap: values.tendangnhap,
      matkhau: values.matkhau,
      sodienthoai: values.sodienthoai,
      gmail: values.gmail,
      quyenhan: values.quyenhan,
      sodu: values.sodu,
      trangthaidangtai: values.trangthaidangtai,
      trangthaibinhluan: values.trangthaibinhluan,
    };
    console.log("Received values of formdata: ", data);
    updateAccount(account.mataikhoan, data, navigate);
  };
  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Sửa Thông Tin Cá Nhân</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="updateAccount"
        onFinish={onFinish}
      >
        <Form.Item
          name="maitaikhoan"
          style={{ display: "none" }}
          initialValue={account.mataikhoan}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tendangnhap"
          label="Tên đăng nhập "
          initialValue={account.tendangnhap}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đăng nhập",
            },
            {
              min: 4,
              message: "Tên đăng nhập cần ít nhất 4 ký tự",
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          name="matkhau"
          style={{ display: "none" }}
          initialValue={account.matkhau}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gmail"
          label="Gmail"
          initialValue={account.gmail}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
              whitespace: true,
            },
            {
              type: "email",
              message: "Email không hợp lệ!",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              message: "Vui lòng nhập địa chỉ Gmail hợp lệ",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sodienthoai"
          label="Số điện thoại"
          initialValue={account.sodienthoai}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
            {
              max: 10,
              message: "Số điện thoại chỉ có 10 số",
            },
            {
              pattern: /^[0-9]{10}$/,
              message: "Số điện thoại chỉ có 10 số và phải là chữ số!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="sodu"
          style={{ display: "none" }}
          initialValue={account.sodu}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="quyenhan"
          label="Người dùng"
          initialValue={account.quyenhan}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="trangthaidangtai"
          label="Trạng thái đăng tải"
          initialValue={account.trangthaidangtai}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="trangthaibinhluan"
          label="Trạng thái bình luận"
          initialValue={account.trangthaibinhluan}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item {...tailFormItemLayout} className="button-container">
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.accountReducer.account,
});

const mapDispatchToProps = {
  updateAccount,
  getAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
