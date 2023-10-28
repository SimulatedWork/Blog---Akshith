import React, { useEffect, useState } from "react";
import "./addPage.css";


export default function AddPage() {

  const [Img, setImg] = useState("");
  const [ImageUrl, setImageUrl] = useState([]);

  const handleImageChange = (event) => {
    setImg([...event.target.files]);
    console.log(Img, "Doc Image");
  };

  useEffect(() => {
    if (Img.length < 1) return;
    const NewImageUrls = [];
    Img.forEach((Img) => NewImageUrls.push(URL.createObjectURL(Img)));
    setImageUrl(NewImageUrls);
  },[Img]);

const Blogsubmit= async(e)=>{
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
  );
  const BlogIMG = await respone.json();
    console.log("Bolg Image",BlogIMG);

}


  return (
    <div className='addPage-main'>
      <h1 className='addPage-h1'>ADD Blog's</h1>
        <div className='addPage-sub1'>
          <button className="addPage-btn1">Edit</button>
        </div>
        <form className='addPage-sub2'>
        <div className="addPage-div">
          <label className="addPage-label">Blog Name:
            <input 
            type="text"
            className="addPage-input1"
            required="required">
            </input>
          </label>
        </div>
        <div>
          <label className="addPage-label">Blog image:
          <input
            type="file"
            required="required"
            className="addPage-input1"
            accept="image/*"
            onChange={handleImageChange}
          ></input>
          </label>
          {ImageUrl.map((imageSrc) => (
            <img width={80} height={80} src={imageSrc} alt="" />
          ))}
        </div>
        <div>
          <label className="addPage-label">Blog Content:
            <input
            type="text"
            className="addPage-input1"
            required="required"
            >
            </input>
          </label>
        </div>
        <div>
          <button onClick={Blogsubmit}>
            Save
          </button>
        </div>
        </form>
    </div>
  )
}

