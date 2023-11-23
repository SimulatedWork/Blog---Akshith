/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./editPage.css";
import { useParams } from "react-router-dom";

export default function EditPage() {
  const { id } = useParams();
  const [blogdata, setBlogdata] = useState({
    BlogName: "",
    Blogimg: "",
    Blogtags: "",
    BlogContent: "",
  });
  const [Img, setImg] = useState("");
  const [ImageUrl, setImageUrl] = useState([]);

  const [Tagdata, setTagdata] = useState([]);
  const [blogtag, setBlogtag] = useState("");

  const [selectedTag, setSelectedTag] = useState("");

  const handleBlogtagchange = (event) => {
    setBlogtag(event.target.value);
  };
  const handleImageChange = (event) => {
    setImg([...event.target.files]);
    console.log(Img, "Doc Image");
  };

  useEffect(() => {
    console.log("View data", blogdata);
  }, [blogdata]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`http://localhost:2004/editedBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          setBlogdata(data);
          setImageUrl(data.Blogimg)
        })
        .catch((error) => {
          console.log(error, " failed to fetch");
        });
    } else {
      console.log("error found");
    }
  }, [id]);

  useEffect(() => {
    console.log("Tags", Tagdata);
  }, [Tagdata]);

  useEffect(() => {
    fetch("http://localhost:2004/blogtags")
      .then((response) => response.json())
      .then((data) => {
        console.log("Tagdata", data);
        setTagdata(data);
      })
      .catch((error) => {
        console.log(error, " failed to fetch");
      });
  }, []);

  const arrayUniqueTags = [
    ...new Map(Tagdata.map((item) => [item["Blogtags"], item])).values(),
  ];

  console.log("UniqueTags", arrayUniqueTags);

  const handleTagClick = (tag) => {
    setBlogdata({ ...blogdata, Blogtags: tag });
    setSelectedTag(tag);
  };

  
  useEffect(() => {
    if (Img.length < 1) return;
    const NewImageUrls = [];
    Img.forEach((Img) => NewImageUrls.push(URL.createObjectURL(Img)));
    setImageUrl(NewImageUrls);
  },[Img]);


  const EditBlogsubmit= async(e)=>{
    e.preventDefault();
  
    const data = new FormData();
    data.append("file", Img[0]);
    data.append("upload_preset", "BlogZen");
    data.append("cloud_name", "dyywazdj1");
  
    const respone = await fetch(
      "https://api.cloudinary.com/v1_1/dyywazdj1/image/upload",
      {
        method: "POST",
        body: data,
      }
    ).then((res)=>res.json())
    .then(async (res)=>{
      console.log("hello",res)
      const BlogIMG = res.url;
      // blogdata.Blogimg=BlogIMG;
      
    
        try {
          const token = localStorage.getItem("token");
          await fetch(`${process.env.REACT_APP_URL}/editBlog/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              "BlogName": blogdata.BlogName,
              "Blogimg": BlogIMG,
              "Blogtags": blogdata.Blogtags,
              "BlogContent": blogdata.BlogContent,
            }),
          });
          console.log("Blog post updated successfully!");
          window.location.href = "/createrPage";
        } catch (error) {
          console.error("Error updating blog post:", error);
        }
      
      // console.log("EditedBlog",handleEdit);
    })
    
  }
  

  return (
    <div className="editPage-main">
      <h1 className="editPage-h1">EDIT Blog's</h1>
      <form className="editPage-sub2">
        <div className="editPage-div">
          <label className="editPage-label">
            Blog Name:
            <input
              type="text"
              className="editPage-input1"
              required="required"
              value={blogdata.BlogName}
              onChange={(e) =>
                setBlogdata({ ...blogdata, BlogName: e.target.value })
              }
            ></input>
          </label>
        </div>
        <div>
          <label className="editPage-label">
            Blog image:
            <input
              type="file"
              required="required"
              className="editPage-input1"
              accept="image/*"
                // value={blogdata.Blogimg}
                onChange={handleImageChange}
            ></input>
          </label>
          {/* {
            ImageUrl.map((imageSrc) => ( */}
            <img width={80} height={80} src={ImageUrl} alt="" />
            {/* ))
          } */}
        </div>
        <div className="editPage-div">
          <label className="editPage-label">
            Blog Tags:
            <input
              type="text"
              className="editPage-input1"
              required="required"
              onChange={handleBlogtagchange}
              value={blogdata.Blogtags}
            ></input>
            <div className="editPage-maindiv">
              {arrayUniqueTags.map((abc) => {
                console.log(abc);
                return (
                  <div className="addPage-div-btn">
                    <div
                      className={`addpage-btn1 ${
                        abc.Blogtags === selectedTag ? "selected" : ""
                      }`}
                      onClick={() => handleTagClick(abc.Blogtags)}
                    >
                      {abc.Blogtags}
                    </div>
                  </div>
                );
              })}
            </div>
          </label>
        </div>
        <div>
          <label className="editPage-label">
            Blog Content:
            <textarea
              type="text"
              className="editPage-input3"
              required="required"
              value={blogdata.BlogContent}
              onChange={(e) =>
                setBlogdata({ ...blogdata, BlogContent: e.target.value })
              }
            ></textarea>
          </label>
        </div>
        <div>
          <button className="editPage-btn4"
          onClick={EditBlogsubmit}
          >Edit</button>
        </div>
      </form>
    </div>
  );
}
