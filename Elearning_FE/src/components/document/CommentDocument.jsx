import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';
const { TextArea } = Input;
class CommentDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello, World!'
    };
  }
  
  render() {
    const { onChange, submitting, onSubmit,value } = this.props;
    return (
        <>
        <Form.Item>
          <TextArea rows={1} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            Đăng bình luận
          </Button>
        </Form.Item>
      </>
    );
  }
}

export default CommentDocument;
