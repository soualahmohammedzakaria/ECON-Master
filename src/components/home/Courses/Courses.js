import React from 'react';
import SectionTitle from '../../general/SectionTitle/SectionTitle';
import './Courses.css';
import { courses } from '../../../data/Courses';
import { useNavigate } from 'react-router-dom';

export default function Courses() {
  const navigate = useNavigate();
  const handleTestSelection = (chapter_number) => () => {
    navigate(`/exam/ch${chapter_number}/10/Chapter One Test/4`);
  };

  return (
    <section id="courses" className="courses-section">
      <SectionTitle title="Courses" link={courses.master_link} />
      <div className="course-cards">
        {courses.courses_list.map((course, index) => (
          <div key={index} className="course-card">
            <h3 className="course-title" onClick={() => window.open(course.chapter_link, '_blank')}>{course.title}</h3>
            <h4 className="course-name">{course.name}</h4>
            <p className="course-description">{course.description}</p>
            <div className="button-group">
              <button
                className="course-button"
                onClick={() => window.open(course.course_link, '_blank')}
              >
                Material
              </button>
              <button
                className="summary-button"
                onClick={() => window.open(course.summary_link, '_blank')}
              >
                Summary
              </button>
              
            </div>
            <button
              className="test-button"
              onClick={handleTestSelection(index + 1)}
            >
              Pass the Chapter Test
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
