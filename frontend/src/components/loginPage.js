import React, { useState, useEffect } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import ICON from "../Assests/google-icon.png";

import "./loginPage.css";
export default function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const ID=process.env.REACT_APP_ID;
  const handleUseremailChange = (event) => {
    setemail(event.target.value);
  };

  const handleUserpasswordChange = (event) => {
    setpassword(event.target.value);
  };



  function handlecallbackresponse(response){
    
    fetch("http://localhost:2004/token", {
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


  const onFinish = async (values) => {
    console.log("Value :", values);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:2004/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Useremail: email,
          Userpassword: password,
        }),
      });

      const data = await response.json();
      console.log({ LoginData: data, response: response.ok });
      if (data.user) {
        localStorage.setItem("token", data.user);
        message.success(data.status);
        window.location.href = "/";
      } else {
        message.error(data.status);
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Failed to login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage-main">
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
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={handleUseremailChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
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
            <Checkbox className="login-checkbox">Remember me</Checkbox>
          </Form.Item>
          <Link className="login-form-link">Forgot password</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
        <h4 style={{ margin: "0" }} className="login-h1">
          Do you have Account ?{" "}
          <Link to={"/regiPage"} className="login-form-link">
            {" "}
            Register now!
          </Link>
        </h4>
        <Form.Item>
          <button id="signindiv" type="submit">
            {" "}
            Continue with Google
            <img className="login-icon" src={ICON} alt="" />
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
