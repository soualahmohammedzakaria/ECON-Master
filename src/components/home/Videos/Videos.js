import React from 'react';
import SectionTitle from '../../general/SectionTitle/SectionTitle';
import './Videos.css';
import { videos } from '../../../data/Videos';
import { MdSlowMotionVideo } from "react-icons/md";

export default function Videos() {

  return (
    <section id="videos" className="courses-section">
      <SectionTitle title="Video Recordings" link={videos.master_link} />
      <div className="course-cards">
        {videos.videos_list.map((course, index) => (
          <div key={index} className="course-card">
            <h3 className="course-title" onClick={() => window.open(course.chapter_link, '_blank')}>{course.chapter_title}</h3>
            <h4 className="course-name">{course.chapter_name}</h4>
            <h4 className="video-section-title">Courses</h4>
            {course.courses.map((video, index) => (
                <button
                    key={index}
                    className="video-link-button"
                    onClick={() => window.open(video, '_blank')}
                >
                    <MdSlowMotionVideo size={22} /> 
                    Course {index + 1} Video
                </button>
            ))}
            <h4 className="video-section-title" style={{marginTop: "0.7rem"}}>Tutorials</h4>
            {course.tutorials.map((video, index) => (
                <button
                    key={index}
                    className="video-link-button"
                    onClick={() => window.open(video, '_blank')}
                >
                    <MdSlowMotionVideo size={22} />
                    Tutorial {index + 1} Video
                </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}