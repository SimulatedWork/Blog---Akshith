import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../Assests/Logo-p2.png";
import { jwtDecode } from "jwt-decode";
import { Avatar } from "antd";
export default function Navbar() {
 

  const [userDetail, setUserDetail] = useState([])

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
        fetch(`http://localhost:2004/userdata/${userId}`)
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
                   <Avatar className="Navbar-logo" style={{ backgroundColor: 'black' }}>{userDetail.Username?.charAt(0)}</Avatar>
              </div>
            }
            
          </div>
          </div>
    </div>
  );
}