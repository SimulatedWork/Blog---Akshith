import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../Assests/Logo-p2.png";
import { jwtDecode } from "jwt-decode";
import { Avatar,Button,Dropdown,Menu } from "antd";
import {PoweroffOutlined} from '@ant-design/icons'
export default function Navbar() {
 

  const [userDetail, setUserDetail] = useState([])
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const Token=localStorage.getItem("token");
  console.log("Token :",Token)

  useEffect(()=>{
    console.log(userDetail);
  },[userDetail])
  useEffect(() => {
    if (Token) {
      try {
        const decodedToken = jwtDecode(Token);
        const userId = decodedToken._id;
        fetch(`${process.env.REACT_APP_URL}/userdata/${userId}`)
          .then(res => res.json())
          .then(data => {
            setUserDetail(data);
            console.log("userdata:",data);
          });
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  }, [Token]);

  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  const menu=(
    <Menu>
      <Menu.Item>
      <Button style={{color:"black"}} type="link" icon={<PoweroffOutlined/>} onClick={logout}>LogOut</Button>
      </Menu.Item>
    </Menu>
  )
  const showModal = () => {
    setIsCommentModalVisible(!isCommentModalVisible);
  };
  return (
    <div className="nav">
      <Link to="/">
        <img className="Logo" src={Logo} alt=""></img>
        {/* <h1 className="Logo">Blog</h1> */}
      </Link>

              <div className='Sub-btn '>
              <div>
              <Link to="/" className="home">
                Home
              </Link>
              </div>
              <div>
              <Link to={"/blogPage"} className="Create-btn">
                Blog
              </Link>
              </div>
              {/* <div>
              <Link  className="Create-btn">
                Create
              </Link>
              </div> */}
              <div>
              <Link to={"/aboutPage"} className="About-btn">
                About 
              </Link>
              </div>
             
          <div className="nav-title" id="nav-check">
            {
              !Token?
                <Link to={"/loginpage"}>
                Login
              </Link>:
              <div>
                <Dropdown
                   overlay={menu}
                    title="LogOut"
                    trigger={['click']}
                    visible={isCommentModalVisible}
                    className="modalStyle"
                   >
                    <Avatar className="Navbar-logo" style={{ backgroundColor: 'black' }} onClick={showModal}>{userDetail.Username?.charAt(0)}</Avatar>

                    
                   </Dropdown>
              </div>
            }
            
          </div>
          </div>
    </div>
  );
}