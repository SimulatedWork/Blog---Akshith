/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./viewPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { HeartTwoTone } from "@ant-design/icons";
import { Modal, Input, Button, Comments, message } from "antd";
import { CommentOutlined } from '@ant-design/icons';

import { jwtDecode } from "jwt-decode";

export default function ViewPage() {
  const { id } = useParams();
  const [viewdata, setViewdata] = useState([]);
  const [bloglike, setBloglike] = useState([]);
  const navigate = useNavigate();
  const [viewlike, setViewlike] = useState("");
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [showComments, setShowComments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  let Username;
  let userId;

  useEffect(() => {
    console.log("View data", viewdata);
  }, [viewdata]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const UserToken = localStorage.getItem("token");
      console.log("User_Token :", UserToken);
      const decodedToken = jwtDecode(token);
      console.log("decoded:", decodedToken);
      userId = decodedToken._id;
      console.log("userid", userId);

      Username = decodedToken.name;
      console.log("Username:", Username);
      fetch(`${process.env.REACT_APP_URL}/blogview/${id}`, {
        headers: {
          Authorization: `Bearer ${UserToken}`,
          //   name:`${Username}`,
          // email:`${UserToken.email}`
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          setViewdata(data);
        })
        .catch((error) => {
          console.log(error, " failed to fetch");
        });
    } else {
      navigate("/loginPage");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inside your BlogPage component
  const handleLikeClick = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${process.env.REACT_APP_URL}/like/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setBloglike(data);
          console.log("Data", data);
        })
        .catch((error) => {
          console.error("Failed to like the blog post:", error);
        });
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    console.log("view likedata", viewlike);
  }, [viewlike]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/displaylike/${id}`)
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

 
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/displayComments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Comments data", data);
        setShowComments(data);
      })
      .catch((error) => {
        console.log(error, " failed to fetch");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const showCommentsModal = () => {
    setIsModalOpen(true);
  };
  const handleCommentsOk = () => {
    setIsModalOpen(false);
  };
  const handleCommentsCancel = () => {
    setIsModalOpen(false);
  };

  const Commentsubmit = async () => {
    // e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("decoded:", decodedToken);
      userId = decodedToken._id;
      console.log("userid", userId);

      Username = decodedToken.name;
      console.log("Username:", Username);
      const submit = await fetch(`${process.env.REACT_APP_URL}/addComment/${id}`, {
        method: "PUT",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },

        body: JSON.stringify({
          userId: userId,
          text: comment,
          username: Username,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          message.success("Thanks for commenting");
        })
        .catch((err) => {
          console.log(err);
          message.error("Something went Wrong");
        });

      // console.log("BLOG Comment :", submit);
    } else {
      console.log("Failed to comment");
    }
    // console.log("Bolg Image",BlogIMG);
  };

  const showModal = () => {
    setIsCommentModalVisible(true);
  };

  const handleOk = () => {
    setComments([...comments, { author: "User", content: comment }]);
    setIsCommentModalVisible(false);
    setComment("");
    Commentsubmit();
  };

  const handleCancel = () => {
    setIsCommentModalVisible(false);
  };

  return (
    <div className="viewPage-main">
      <div className="viewPage-main-2">
        <div className="viewPage-sub1">
          <div className="img-div">
            <img className="viewPage-img" src={viewdata.Blogimg} alt="img" />
          </div>
          <div className="viewPage-divimg">
            <div className="ViewPage-likes">
              <div className="ViePage-like-view">
                {/* <p> */}
                  <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '4vmin' }} />
                  {viewlike.BlogLike}
                {/* </p> */}
              </div>
              <div className="ViewPage-comments-view">
                <p className="Viewpage-btn3" onClick={showCommentsModal}><CommentOutlined style={{ fontSize: '5vmin', color: 'black', cursor:'pointer' }}/></p>
                <Modal
                  title="Comments"
                  open={isModalOpen}
                  onOk={handleCommentsOk}
                  onCancel={handleCommentsCancel}
                  footer={null}
                >
                 {
                  showComments.BlogComments?.length > 0 ? (
                    showComments.BlogComments
                    .map((data)=>(
                      <div>
                      <h1>{data.username}</h1>
                      <p>{data.text}</p>
                      </div>
                    ))
                  ):(
                    <div>There are no Comments !!!</div>
                  )
                 }
                </Modal>
              </div>
            </div>
            <div className="viewpage-label">
              <h1 style={{ margin: "0" }} className="ViewPage-h1">
                {viewdata.BlogName}
                {" :-"}
              </h1>
            </div>
            <p className="ViewPage-para">{viewdata.BlogContent}</p>
          </div>
        </div>
        {/* <div>
        <p>{viewlike.BlogLike}</p>
      </div> */}
      </div>
      <div className="ViewPage-btn-div">
        <div className="ViewPage-like">
          <button className="like-btn" onClick={() => handleLikeClick(id)}>
            Like
            {/* {viewlike.BlogLike} */}
          </button>
        </div>
        <div className="viewPage-comment">
          <button className="comment-btn" onClick={showModal}>
            Comment
          </button>
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
        {/* {comments.map((c, index) => ( */}
        {/* <div> */}
        {/* <Comments key={index} author={c.author} content={c.content}  className="commentStyle" /> */}
        {/* <p>Hi</p> */}
        {/* </div> */}
        {/* ))} */}
      </Modal>
    </div>
  );
}
