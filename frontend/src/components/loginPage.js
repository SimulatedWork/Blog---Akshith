import React,{useState} from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link}  from "react-router-dom";
import ICON from "../Assests/google-icon.png"

import "./loginPage.css"
export default function LoginPage() {
  const [email, setemail] = useState('');
  const [password,setpassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUseremailChange=(event)=>{
    setemail(event.target.value)
  }

  
  const handleUserpasswordChange=(event)=>{
    setpassword(event.target.value)
  }
    // const onFinish = (values) => {
    //     console.log('Received values of form: ', values);
    //   };

      const onFinish = async (values) => {
        setLoading(true);
    
        try {
          const response = await fetch('http://localhost:2004/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Useremail:email,
              Userpassword:password
            }),
          });
    
          const data = await response.json();
          console.log("Login Data :",data)
          if (response.ok) {
            localStorage.setItem('token', data.user); 
    
            message.success(data.status);
            // window.location.href = "/";
          } else {
            message.error(data.status);
          }
        } catch (error) {
          console.error('Login error:', error);
          message.error('Failed to login. Please try again later.');
        } finally {
          setLoading(false);
        }
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
      <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" onChange={handleUseremailChange}/>
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
        onChange={handleUserpasswordChange}
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
      <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
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

