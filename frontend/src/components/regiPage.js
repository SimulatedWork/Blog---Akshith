import React,{useState, useEffect} from 'react';
import "./loginPage.css";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message} from 'antd';
import { jwtDecode } from "jwt-decode";
// import { useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import ICON from "../Assests/google-icon.png";


export default function RegiPage() {

  const ID=process.env.REACT_APP_ID;
  const[username,setUsername]=useState('');
  const[useremail,setUseremail]=useState('');
  const[Userpassword,setUserpassword]=useState('');

  const handleUsernameChange=(event)=>{
    setUsername(event.target.value)
  }

  const handleUseremailChange=(event)=>{
    setUseremail(event.target.value)
  }

  
  const handleUserpasswordChange=(event)=>{
    setUserpassword(event.target.value)
  }
  
  function handlecallbackresponse(response){
    
    fetch(`${process.env.REACT_APP_URL}/token`, {
      method: "POST",
      body: JSON.stringify({
        "tokenold":response.credential
    }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
  .then(response => response.json())
  .then(json => {
    console.log("json :", json)
    const decode = jwtDecode(json.user);
    console.log("decode :", decode)
    localStorage.setItem("username",decode.name);
    localStorage.setItem("token",json.user);
    window.location.href = '/';
  }
     
  );
  }


  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:ID,
      callback: handlecallbackresponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signindiv"),
      {size:"medium"}
    );


  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  


    const onFinish = async(values) => {
        console.log('Received values of form: ', values);
        try {
          const response = await fetch(`${process.env.REACT_APP_URL}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
              Username: username,
              Useremail: useremail,
              Userpassword: Userpassword,
            }),
          });
    
          if (response.ok) {
            const json = await response.json();
            console.log(json);
            // localStorage.setItem("token", json.user);
            message.success(json.status);
            window.location.href = '/loginpage';
          } else {
            const errorJson = await response.json();
            console.log(errorJson);
            message.error(errorJson.status);
          }
        } catch (error) {
          console.error(error);
          message.error('Failed to register. Please try again later.');
        }
        
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
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="UserName" onChange={handleUsernameChange}/>
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
      <Button type="primary" htmlType="submit" className="login-form-button">
        SignUp
      </Button>
    </Form.Item>
    <Form.Item>
        <button id="signindiv"  type="submit"> Continue with Google<img className='login-icon' src={ICON} alt=''/></button>
    </Form.Item>
  </Form></div>
  )
}

