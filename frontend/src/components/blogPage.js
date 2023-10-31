import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from 'antd';
import "./blogPage.css";
// import IMG from "../Assests/image-1.jpeg";

export default function BlogPage() {
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;


  useEffect(() => {
    fetch("http://localhost:3000/blogdata")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setdata(data);
      })
      .catch((error) => {
        console.log(error, " failed to fetch");
      });
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = data.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="blog-main">
      <div className="blog-sub1">
        <div className="blog-wrap">
          <input
            type="text"
            name="text"
            class="input"
            placeholder="Search here..."
          ></input>
        </div>
        <div className="blog-div-btn">
          <Link to="/createrPage">
            <button className="blog-btn1">+ CREATE</button>
          </Link>
        </div>
      </div>

      {currentBlogs.map((abc) => {
        console.log(abc);
        return (
          <div className="blog-main2">
          <div className="blog-sub2">
            <div className="blog-img">
              <img className="IMG" src={abc.Blogimg} alt="img"></img>
            </div>
            <div className="blog-hp">
              <h1 className="blog-h1" style={{ margin: "0" }}>
                {abc.BlogName}
              </h1>
              <p style={{ margin: "0" }} className="blog-para">
                {/* Photography is the art, application, and practice of creating
                images by recording light, either electronically by means of an
                image sensor, or chemically by means of a light-sensitive
                material such as photographic film. */}
                {abc.BlogContent}
              </p>
              <div className="blog-btn">
                <Link to={`/viewPage/${abc._id}`}>
                  <button className="btn-2">VIEW--{">"}</button>
                  {/* <h2 className='btn-2'>VIEW--{'>'}</h2> */}
                </Link>
              </div>
            </div>
          </div>
          </div>
        );
      })}
     {/* Pagination */}
     <div className="pagination">
              <Pagination onChange={(e)=>setCurrentPage(e)} defaultCurrent={currentPage} total={(data.length*10)/5} />
      </div>
    </div>
  );
}
