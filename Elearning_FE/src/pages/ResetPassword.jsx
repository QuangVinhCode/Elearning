import React from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './ResetPassword.css';
import {resetPassword} from "../redux/actions/accountAction"
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;

const ResetPassword = ({resetPassword}) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Received values from form: ', values);
    resetPassword(values.newPassword,navigate);
  };

  return (
    <div className="reset-password-container">
      <Space direction="vertical" size="large" align="center" className="reset-password-content">
        <Title level={2} style={{ color: '#1890ff' }}>Đặt Lại Mật Khẩu</Title>
        <Text>Vui lòng nhập mật khẩu mới của bạn.</Text>
        <Form
          name="reset_password"
          onFinish={onFinish}
          className="reset-password-form"
        >
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Mật khẩu mới" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="reset-password-button">
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

const mapDispatchToProps = {
  resetPassword,
};

export default connect(null, mapDispatchToProps)(ResetPassword);
