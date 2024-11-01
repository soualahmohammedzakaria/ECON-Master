import React, { useState } from 'react';
import SectionTitle from '../../general/SectionTitle/SectionTitle';
import './Tests.css';
import { examsTests } from '../../../data/ExamTests';
import { useNavigate } from 'react-router-dom';
import ChooseChapters from '../../exams/ChooseChapters/ChooseChapters';

export default function Tests() {
  const navigate = useNavigate();
  const [isChooseChaptersOpen, setIsChooseChaptersOpen] = useState(false);

  const handleTestSelection = (exam_type) => () => {
    if (exam_type === 'CI') {
      navigate(`/exam/ch1,ch2/25/Intermediate Control/36`);
    } else if (exam_type === 'CF') {
      navigate(`/exam/ch3,ch4/25/Final Control/36`);
    } else if (exam_type === 'CM') {
      navigate(`/exam/ch1,ch2,ch3,ch4/25/Mixed Control/36`);
    } else if (exam_type === 'CP') {
      setIsChooseChaptersOpen(true);
    }
  };

  const handleChapterSelection = (selectedChapters) => {
    const chaptersString = selectedChapters.join(',');
    navigate(`/exam/${chaptersString}/30/Personalized Control/36`);
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

      {isChooseChaptersOpen && (
        <ChooseChapters
          onClose={() => setIsChooseChaptersOpen(false)}
          onConfirm={handleChapterSelection}
        />
      )}
    </section>
  );
}
