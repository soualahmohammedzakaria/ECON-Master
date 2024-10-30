import React from 'react';
import './StartModal.css';

const StartModal = ({ testName, time, questionCount, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{testName}</h2>
        <p>
          You have <b>{time} {time > 1 ? "minutes" : "minute"}</b> to answer <b>{questionCount} {questionCount > 1 ? "questions" : "question"}</b>.
        </p>
        <p>
          When you submit your answers, the system will analyze them, grade you, and give you feedback on the topics you need to focus on.
        </p>
        <button className="start-button" onClick={onClose}>
          Start Now!
        </button>
      </div>
    </div>
  );
};

export default StartModal;
