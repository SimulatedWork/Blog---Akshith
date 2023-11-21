/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react';
import "./editPage.css";
import { useParams } from 'react-router-dom';



export default function EditPage() {
  const { id } = useParams();
    const [blogdata,setBlogdata]=useState("");
    const [Tagdata, setTagdata] =useState([])
  const[blogtag,setBlogtag]=useState("");

    const [selectedTag, setSelectedTag] = useState("");

    const handleBlogtagchange = (event)=>{
        setBlogtag(event.target.value);
      }

    useEffect(() => {
        console.log("View data", blogdata);
      }, [blogdata]);
      useEffect(() => {
    const token = localStorage.getItem('token');

        if(token){
          fetch(`http://localhost:2004/editedBlog/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("data", data);
              setBlogdata(data);
            })
            .catch((error) => {
              console.log(error, " failed to fetch");
            });
        }else{
          console.log("error found")
        }
      }, [id]);
      
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
    <div className='editPage-main'>
    <h1 className='editPage-h1'>EDIT Blog's</h1>
      {/* <div className='addPage-sub1'>
        <button className="addPage-btn1">Edit</button>
      </div> */}
      <form className='editPage-sub2'>
      <div className="editPage-div">
        <label className="editPage-label">Blog Name:
          <input 
          type="text"
          className="editPage-input1"
          required="required"
          value={blogdata.BlogName}
        //   onChange={handleBlogNameChange}
          >
          </input>
        </label>
      </div>
      <div>
        <label className="editPage-label">Blog image:
        <input
          type="file"
          required="required"
          className="editPage-input1"
          accept="image/*"
        //   value={blogdata.Blogimg}
        //   onChange={handleImageChange}
        ></input>
        </label>
        {
            // ImageUrl.map((imageSrc) => (
          <img width={80} height={80} src={blogdata.Blogimg} alt="" />
        // ))
        }
      </div>
      <div className="editPage-div">
        <label className="editPage-label">Blog Tags:
          <input 
          type="text"
          className="editPage-input1"
          required="required"
          onChange={handleBlogtagchange}
          value={blogdata.Blogtags}
          >
          </input>
          <div className="editPage-maindiv">
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
        <label className="editPage-label">Blog Content:
          <input
          type="text"
          className="editPage-input1"
          required="required"
          value={blogdata.BlogContent}
        //   onChange={handleBlogContentChange}
          >
          </input>
        </label>
      </div>
      <div>
        <button
        //  onClick={Blogsubmit}
         >
          Edit
        </button>
      </div>
      </form>
  </div>
  )
}
