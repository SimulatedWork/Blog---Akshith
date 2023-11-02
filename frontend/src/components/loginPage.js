import React from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import ICON from "../Assests/google-icon.png"

import "./loginPage.css"
export default function loginPage() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
  return (
    <div className='loginPage-main'>
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
        Login
      </Button>
    </Form.Item>
    <h4 style={{ margin: "0" }} className='login-h1'>Do you have Account ? <Link to={"/regiPage"} className='login-form-link' > Register now!</Link></h4>
    <Form.Item>
        <button className='login-btn'> Continue with Google<img className='login-icon' src={ICON} alt=''/></button>
    </Form.Item>
  </Form>
  </div>
  )
}

