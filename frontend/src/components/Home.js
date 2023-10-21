import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import IMG from "../Assests/image-1.jpeg"
import TEXT from "../Assests/The Quality.otf"
export default function Home() {
  return (
    <div className='Home-main'>
        <div className='sub1'>
            <div className='heading-1'>
              <h1 className="home-h1" style={{margin:"0"}}>GENERATE</h1>
              <h2 className="home-h2" style={{margin:"0"}}>AWESOME BLOG'S !!</h2>
            </div>
            <div className='heading-2'>
              <p style={{TEXT}} className='home-p'>"Writing is the window to your thoughts, the bridge to your imagination, and the voice of your heart.
                 It's a journey of self-discovery, a quest to share your unique perspective with the world.
                 Through words, we connect, inspire, and create a tapestry of stories that shape the human experience. !!!" </p>
            </div>
            <div className='div-btn'>
              <Link to={"/blogPage"}>
              <button className='home-btn'>START</button>
              </Link>
            </div>
        </div>
        <div className='sub2'>
          <img className='home-img' src={IMG} alt='img'></img>
        </div>
    </div>
  )
}

 