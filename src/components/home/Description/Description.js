import React from 'react';
import video from '../../../assets/videos/econ-video.mp4';
import './Description.css';

export default function Description() {
  return (
    <section className="description-section">
        <video
          preload='auto'
          autoPlay
          loop
          muted
          className="background-video"
          playsInline
          controls={false}
          disablePictureInPicture 
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="description-content">
          <h1 style={{fontSize: '2.2rem'}}>Welcome to <span className='title-name'>ECON Master</span></h1>
          <p>Your go-to resource for 2CP Economics class materials. Here, you'll find everything you need to succeed in your studies from comprehensive course materials, video recordings, summaries to chapter and exam tests.</p>
        </div>
    </section>
  )
}