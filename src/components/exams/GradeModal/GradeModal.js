// GradeModal.js
import React, { useEffect, useState } from 'react';
import './GradeModal.css';

const GradeModal = ({ grade, topics, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= grade) {
          clearInterval(interval);
          return grade;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [grade]);

  const handleOverlayClick = (e) => {
    if (e.target.className === 'grade-modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="grade-modal-overlay" onClick={handleOverlayClick}>
      <div className="grade-modal-content">
        <h2 className="modal-title">Your Grade</h2>
        <div className="circle-progress" style={{ background: `conic-gradient(var(--primary-color) 0% ${progress * 5}%, white ${progress * 5}% 100%)` }}>
            <div className="circle-progress-inner">
                <span className="grade-text">{progress}</span>
                <span className="total-grade">/20</span>
            </div>
        </div>
        <p className="focus-topics">Topics to focus on: <b>{topics.join(', ')}</b></p>
        <button className="view-correction-button" onClick={onClose}>View Correction</button>
      </div>
    </div>
  );
};

export default GradeModal;