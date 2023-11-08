/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./addPage.css";


export default function AddPage() {
  
  const[blogname,setBlogname]=useState("");
  const[blogcontent,setcontent]=useState("");
  const[blogtag,setBlogtag]=useState("");
  const [Img, setImg] = useState("");
  const [ImageUrl, setImageUrl] = useState([]);
  const [Tagdata, setTagdata] =useState([])
  const [selectedTag, setSelectedTag] = useState("");


  const handleBlogNameChange = (event) => {
    setBlogname(event.target.value);
  };

  const handleBlogtagchange = (event)=>{
    setBlogtag(event.target.value);
  }

  const handleBlogContentChange = (event)=>{
    setcontent(event.target.value);
  }
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
  ).then((res)=>res.json())
  .then(async (res)=>{
    console.log("hello",res)
    const BlogIMG = res;
    
    const submit = await fetch("http://localhost:2004/blogPost", {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },

      body: JSON.stringify({
        BlogName:blogname,
        Blogimg:BlogIMG.url,
        Blogtags:blogtag,
        BlogContent:blogcontent
      }),

    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        window.location.href = "/blogPage";
      })
      .catch((err) => {
        console.log(err);
      });

      console.log("BLOG DATA :",submit)

    // const Blogdata = submit.json();
    // console.log("DATA :",Blogdata)
  })
  
    // console.log("Bolg Image",BlogIMG);

}


useEffect(()=>{
  console.log("Tags",Tagdata)
},[Tagdata]);

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
  ...new Map(
    Tagdata.map((item) => [item["Blogtags"], item])
  ).values(),
];

console.log("UniqueTags",arrayUniqueTags)

const handleTagClick = (tag) => {
  setBlogtag(tag);
  setSelectedTag(tag);
};

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
            required="required"
            onChange={handleBlogNameChange}
            >
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
        <div className="addPage-div">
          <label className="addPage-label">Blog Tags:
            <input 
            type="text"
            className="addPage-input1"
            required="required"
            onChange={handleBlogtagchange}
            value={blogtag}
            >
            </input>
            <div className="addPage-maindiv">
            {arrayUniqueTags.map((abc)=>{
              console.log(abc)
              return(
                <div className="addPage-div-btn">
                  <div className={`addpage-btn1 ${abc.Blogtags === selectedTag ? "selected" : ""}`}
        onClick={() => handleTagClick(abc.Blogtags)}
                  >{abc.Blogtags}</div>
                </div>
              )
            })}
            </div>
          </label>
        </div>
        <div>
          <label className="addPage-label">Blog Content:
            <input
            type="text"
            className="addPage-input1"
            required="required"
            onChange={handleBlogContentChange}
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

