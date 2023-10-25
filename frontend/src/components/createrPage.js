import React from 'react';
import { Link } from "react-router-dom";
import "./createrPage.css";
import IMG from "../Assests/image-1.jpeg"

export default function CreaterPage() {
  return (
    <div className='creater-main'>
      <div className='creater-sub1'>
        <div className="creater-wrap">
        <input
              type="text"
              name="text"
              class="input"
              placeholder="Search here..."
            ></input>
        </div>
        <div className='creater-div-btn'>
            <Link to="/addPage">
          <button className='creater-btn1'>+ ADD</button>
            </Link>
        </div>
      </div>
      <div className='creater-sub2'>
    <div className='creater-img'>
      <img className='creater-IMG' src={IMG} alt='img'></img>
    </div>
    <div className='creater-hp'>
      <h1 className='creater-h1' style={{margin:"0"}}>Photography</h1>
      <p style={{margin:"0"}} className='creater-para'>Photography is the art, application, and practice of creating images by recording light, either electronically by means of an image sensor, or chemically by means of a light-sensitive material such as photographic film.</p>
      {/* <div className='creater-btn'>
        <button className='creater-btn-2'>VIEW--{'>'}</button>
        <h2 className='btn-2'>VIEW--{'>'}</h2>
      </div> */}
    </div>
    </div>
      </div>
  )
}
