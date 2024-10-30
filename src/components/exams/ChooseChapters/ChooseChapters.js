import React, { useState } from 'react';
import './ChooseChapters.css';

const chaptersList = ['ch1', 'ch2', 'ch3', 'ch4'];

export default function ChooseChapters({ onClose, onConfirm }) {
  const [selectedChapters, setSelectedChapters] = useState([]);

  const toggleChapterSelection = (chapter) => {
    setSelectedChapters((prevSelected) =>
      prevSelected.includes(chapter)
        ? prevSelected.filter((ch) => ch !== chapter)
        : [...prevSelected, chapter]
    );
  };

  const handleConfirm = () => {
    if (selectedChapters.length > 0) {
      onConfirm(selectedChapters);
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2 className="modal-title">Personalized Control</h2>
        <p className="modal-subtitle">
          Choose the <b>chapters</b> you want to test your knowledge on.
        </p>
        <div className="chapters-buttons">
          {chaptersList.map((chapter, index) => (
            <button
              key={index}
              onClick={() => toggleChapterSelection(chapter)}
              className="chapter-button"
              style={{
                backgroundColor: selectedChapters.includes(chapter)
                  ? 'var(--secondary-color)'
                  : 'var(--primary-color)',
              }}
            >
              {`Chapter ${index + 1}`}
            </button>
          ))}
        </div>
        <div className="modal-buttons">
          <button className="modal-button" onClick={handleConfirm}>
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
}