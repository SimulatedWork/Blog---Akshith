import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./createrPage.css";
// import IMG from "../Assests/image-1.jpeg";
import { Button, message, Popconfirm } from "antd";
import { jwtDecode } from "jwt-decode";
import { Pagination } from "antd";

export default function CreaterPage() {
  const [userBlog, setUserBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  const UserToken = localStorage.getItem("token");
  console.log("User_Token :", UserToken);
  const decodedToken = jwtDecode(UserToken);
  // console.log("decoded:",decodedToken)
  const userId = decodedToken._id;
  console.log("userid", userId);

  useEffect(() => {
    console.log("UserBlogdata :", userBlog);
  }, [userBlog]);
  useEffect(() => {
    fetch("http://localhost:2004/Userblog")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "datas");
        const UserBlogdata = data.filter((Blog) => Blog.User_ID === userId);
        console.log("Blogdata", UserBlogdata);
        setUserBlog(UserBlogdata);
      })
      .catch((error) => {
        console.log(" failed to listout:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = userBlog.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleDelete = async (blogId) => {
    // const Blog_id=currentBlogs._id;
    console.log("id", blogId);
    try {
      const response = await fetch(`http://localhost:2004/blog/${blogId._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      if (response) {
        setUserBlog(userBlog.filter((blog) => blog._id !== blogId._id));
        message.success("Blog is deleted");
      } else {
        // Handle error response
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const cancel = (e) => {
    console.log(e);
    // message.error('Click on No');
  };

  return (
    <div className="creater-main">
      <div className="creater-sub1">
        <div className="creater-wrap">
          <input
            type="text"
            name="text"
            class="input"
            placeholder="Search here..."
          ></input>
        </div>
        <div className="creater-div-btn">
          <Link to="/addPage">
            <button className="creater-btn1">+ ADD</button>
          </Link>
        </div>
      </div>
      <div className="creater-sub3">
        <h1 className="creater-name">Hello {decodedToken.name}!!</h1>
      </div>
      {currentBlogs.length > 0 ? (
        currentBlogs.map((data) => (
          <div className="creater-main2">
            <div className="creater-sub2">
              <div className="creater-img">
                <img className="creater-IMG" src={data.Blogimg} alt="img"></img>
              </div>
              <div className="creater-hp">
                <h1 className="creater-h1" style={{ margin: "0" }}>
                  {data.BlogName}
                </h1>
                <p style={{ margin: "0" }} className="creater-para">
                  {data.BlogContent}
                </p>
                <div className="creater-div-btn">
                  <Popconfirm
                    title="Delete the Blog"
                    description="Are you sure to delete this Blog?"
                    onConfirm={() => {
                      handleDelete(data);
                    }}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger className="creater-btn-3">
                      Delete
                    </Button>
                  </Popconfirm>
                  <div className="creater-btn">
                    <Link to={`/editPage/${data._id}`}>
                    <button className="creater-btn-2">EDIT</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h1>No Blogs are present !!!</h1>
          <h2>Start Creating Blogs here {":)"} !!</h2>
        </div>
      )}
      <Pagination
        onChange={(e) => setCurrentPage(e)}
        defaultCurrent={currentPage}
        total={(userBlog.length * 10) / 5}
      />
    </div>
  );
}
