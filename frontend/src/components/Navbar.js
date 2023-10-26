// import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../Assests/Logo-p2.png";

export default function Navbar() {
 
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
              <Link className="About-btn">
                About 
              </Link>
              </div>
             
          <div className="nav-title" id="nav-check">
            <Link >
              Login
            </Link>
          </div>
          </div>
    </div>
  );
}