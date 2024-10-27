import React from 'react';
import SectionTitle from '../../general/SectionTitle/SectionTitle';
import './Tests.css';
import { examsTests } from '../../../data/ExamTests';
import { useNavigate } from 'react-router-dom';

export default function Courses() {
  const navigate = useNavigate();
  const handleTestSelection = (exam_type) => () => {
    if (exam_type === 'CI') {
      navigate(`/exam/ch1,ch2/10/Intermediate Control/4`);
    } else if (exam_type === 'CF') {
      navigate(`/exam/ch3,ch4,ch5/10/Final Control/4`);
    } else if (exam_type === 'CM') {
      navigate(`/exam/ch1,ch2,ch3,ch4,ch5/10/Mixed Control/4`);
    }
  };
  return (
    <section id="tests" className="courses-section">
      <SectionTitle title="Exam Tests" />
      <div className="course-cards">
        {examsTests.map((exam, index) => (
          <div key={index} className="course-card">
            <h3 className="course-title">{exam.title}</h3>
            <h4 className="course-name">{exam.name}</h4>
            <p className="course-description">{exam.description}</p>
            <button
              className="exam-button"
              onClick={handleTestSelection(exam.title)}
            >
              Pass the Exam Test
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}