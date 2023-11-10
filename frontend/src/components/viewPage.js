/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./viewPage.css";
import { useParams } from "react-router-dom";
import { Modal, Input, Button,  Comments  } from "antd";
export default function ViewPage() {
  const { id } = useParams();
  const [viewdata, setViewdata] = useState([]);
  const [bloglike, setBloglike] = useState([]);
  const [ viewlike,setViewlike] = useState("");
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);


  useEffect(() => {
    console.log("View data", viewdata);
  }, [viewdata]);
  useEffect(() => {
    fetch(`http://localhost:2004/blogview/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setViewdata(data);
      })
      .catch((error) => {
        console.log(error, " failed to fetch");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inside your BlogPage component
  const handleLikeClick = (id) => {
    fetch(`http://localhost:2004/like/${id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        setBloglike(data);
        console.log("Data", data);
      })
      .catch((error) => {
        console.error("Failed to like the blog post:", error);
      });
  };

  
  useEffect(() => {
    console.log("view likedata", viewlike);
  }, [viewlike]);
  useEffect(() => {
    fetch(`http://localhost:2004/displaylike/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("like data", data);
        setViewlike(data);
      })
      .catch((error) => {
        console.log(error, " failed to fetch");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = () => {
    setIsCommentModalVisible(true);
  };

  const handleOk = () => {
    setComments([...comments, { author: "User", content: comment }]);
    setIsCommentModalVisible(false);
    setComment(""); 
  };

  const handleCancel = () => {
    setIsCommentModalVisible(false);
  };

  return (
    <div className="viewPage-main">
      <div className="viewPage-sub1">
        <div className="img-div">
          <img className="viewPage-img" src={viewdata.Blogimg} alt="img" />
        </div>
        <div className="viewPage-divimg">
          <div className="viewpage-label">
            <h1 style={{ margin: "0" }} className="ViewPage-h1">
              {viewdata.BlogName}
              {" :-"}
            </h1>
          </div>
          <p className="ViewPage-para">{viewdata.BlogContent}</p>
        </div>
      </div>
      <div className="ViewPage-btn-div">
        <div className="ViewPage-like">
          <button className="like-btn" onClick={() => handleLikeClick(id)}>
            Like{viewlike.BlogLike}
          </button>
        </div>
        <div className="viewPage-comment">
          <button className="comment-btn" onClick={showModal}>Comment</button>
        </div>
      </div>
      <Modal
        title="Comments"
        visible={isCommentModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modalStyle"
        bodyStyle={{ padding: "20px" }}
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="commentStyle"
        />
        {comments.map((c, index) => (
          <div>
          {/* <Comments key={index} author={c.author} content={c.content}  className="commentStyle" /> */}
          {/* <p>Hi</p> */}
          </div>
        ))}
      </Modal>
    </div>
  );
}
