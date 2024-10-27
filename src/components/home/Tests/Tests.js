import React from 'react';
import SectionTitle from '../../general/SectionTitle/SectionTitle';
import './Tests.css';
import { examsTests } from '../../../data/ExamTests';

export default function Courses() {
  return (
    <section id="tests" className="courses-section">
      <SectionTitle title="Exam Tests" />
      <div className="course-cards">
        {examsTests.map((course, index) => (
          <div key={index} className="course-card">
            <h3 className="course-title">{course.title}</h3>
            <h4 className="course-name">{course.name}</h4>
            <p className="course-description">{course.description}</p>
            <button
              className="exam-button"
              onClick={() => window.open(course.course_link, '_blank')}
            >
              Pass the Exam Test
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}