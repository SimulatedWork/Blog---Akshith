import React from 'react';
import "./loginPage.css";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import ICON from "../Assests/google-icon.png";


export default function RegiPage() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
  return (
    <div className='regiPage-main'> 
       <Form
    name="normal_login"
    className="login-form"
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
  >
    <h1 className="login-heading">BLOGZEN</h1>
    <Form.Item
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your UserName!',
        },
      ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="UserName" />
    </Form.Item>
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your Email!',
        },
      ]}
    >
      <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },
      ]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item>
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox className='login-checkbox'>Remember me</Checkbox>
      </Form.Item>
      <Link className="login-form-link">
        Forgot password
      </Link>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        SignUp
      </Button>
    </Form.Item>
    <Form.Item>
        <button className='login-btn'> Continue with Google<img className='login-icon' src={ICON} alt=''/></button>
    </Form.Item>
  </Form></div>
  )
}

