import React from "react";
import "./footer.css";
import logo from "../Assests/Logo2-p2.png";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

function Footer() {
    return (
      <div className="footer-container">
        <footer className="footer">
          <div className="logo-footer">
            <div className="logo-text">
              <img className="logo" src={logo} alt="" />
              <p className="logo-description">
              " In the tapestry of life, every word we write is a thread, and every sentence we craft is a stitch. 
              Together, they form the intricate design of our narratives, weaving tales of wisdom, adventure, and inspiration for those who dare to read."
              </p>
            </div>
          </div>
          <div className="logo-footer2">
            <div>
              <div className="options">
                <div className="link-div">
                  <div className="important-links">
                    <h2><span className="links">Important Links</span></h2>
                    <li><Link to={"/"} onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
                    <li><Link to={""} onClick={() => window.scrollTo(0, 0)}>Create</Link></li>
                    <li><Link to={""} onClick={() => window.scrollTo(0, 0)}>About</Link></li>
                  </div>
                  <div className="policies">
                    <h2><span className="links">Policies and FAQ's</span></h2>
                    <li><Link to={""} onClick={() => window.scrollTo(0, 0)}>T&C</Link></li>
                    <li><Link to={""} onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
                  </div>
                </div>
                <div>
                  <h1 className="sub-heading"><span>Socials,</span></h1>
                  <div className="social-icons">
                    <Link to={"https://www.linkedin.com"} target="_blank">
                      <FaLinkedin className="login" />
                    </Link>
                    <Link to={"https://www.instagram.com"}>
                      <FaInstagram className="login" />
                    </Link>
                    <Link to={"https://twitter.com"}>
                      <FaTwitter className="login" />
                    </Link>
                    <Link to={"https://github.com"}>
                      <FaGithub className="login" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <h2 style={{margin:"0"}} className="copyright">
          © CopyRight 2023 BlogZen
        </h2>
      </div>
    );
  }
  
  export default Footer;