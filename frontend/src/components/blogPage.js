import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, Tooltip } from 'antd';
import "./blogPage.css";

// import IMG from "../Assests/image-1.jpeg";

export default function BlogPage() {
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBlogQuery, setSearchBlogQuery] = useState("");
  const blogsPerPage = 5;

  const token = localStorage.getItem('token');

  useEffect(() => {
    // console.log(process.env.REACT_APP_URL)
    fetch(`${process.env.REACT_APP_URL}/blogdata`)
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
// console.log(currentBlogs);
  const filteredBlogs = currentBlogs.filter((Blogs) =>
    (Blogs.BlogName.toLowerCase().includes(searchBlogQuery.toLowerCase())  && Blogs.BlogName.toLowerCase().startsWith(searchBlogQuery.toLowerCase()) )
  );

  return (
    <div className="blog-main">
      <div className="blog-sub1">
        <div className="blog-wrap">
          <input
            type="text"
            name="text"
            class="input"
            placeholder="Search here..."
            value={searchBlogQuery}
            onChange={(e)=>setSearchBlogQuery(e.target.value)}
          ></input>
        </div>
        <div className="blog-div-btn">
          {
          token?(
            <Link to="/createrPage">
            <button className="blog-btn1">+ CREATE</button>
          </Link>
          ):(
            <Tooltip placement="topLeft" title={"You Need To login first to view blog"} > 
          <Link to="/loginPage">
            <button className="blog-btn1">+ CREATE</button>
          </Link>
          </Tooltip>
          )
        }
        </div>
      </div>
      {
        filteredBlogs.length>0 ? (
          <div>
          {filteredBlogs.map((abc) => {
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
                    {abc.BlogContent}
                  </p>
                  <div className="blog-btn">
                    {
                      token?(
                        <Link to={`/viewPage/${abc._id}`}>
                            <button className="btn-2">VIEW--{">"}</button>
                            {/* <h2 className='btn-2'>VIEW--{'>'}</h2> */}
                          </Link>
                      ):(
                        <Tooltip placement="top" title={"You Need To login first to view blog"} >           
                        <Link to={`/viewPage/${abc._id}`}>
                            <button className="btn-2">VIEW--{">"}</button>
                            {/* <h2 className='btn-2'>VIEW--{'>'}</h2> */}
                          </Link>
                          </Tooltip>
                      )
                    }
                 
                  </div>
                </div>
              </div>
              </div>
            );
          })}
          </div>
        ):(
          <div>
            <h1>Sorry No such Blogs !!!</h1>
            </div>
        )
      }

    
     {/* Pagination */}
     <div className="pagination">
              <Pagination onChange={(e)=>setCurrentPage(e)} defaultCurrent={currentPage} total={(data.length*10)/5} />
      </div>
    </div>
  );
}
