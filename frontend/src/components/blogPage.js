import React from 'react';
import "./blogPage.css";
import IMG from "../Assests/image-1.jpeg"

export default function blogPage() {
  return (
    <div className='blog-main'>
      <div className='blog-sub1'>
        <div className="blog-wrap">
        <input
              type="text"
              name="text"
              class="input"
              placeholder="Search here..."
            ></input>
        </div>
        <div className='blog-div-btn'>
          <button className='blog-btn1'>+ CREATE</button>
        </div>
      </div>
      <div className='blog-sub2'>
    <div className='blog-img'>
      <img className='IMG' src={IMG} alt='img'></img>
    </div>
    <div className='blog-hp'>
      <h1 className='blog-h1' style={{margin:"0"}}>Photography</h1>
      <p style={{margin:"0"}} className='blog-para'>Photography is the art, application, and practice of creating images by recording light, either electronically by means of an image sensor, or chemically by means of a light-sensitive material such as photographic film.</p>
      <div className='blog-btn'>
        <button className='btn-2'>VIEW--{'>'}</button>
        {/* <h2 className='btn-2'>VIEW--{'>'}</h2> */}
      </div>
    </div>
    </div>
      </div>
  )
}
