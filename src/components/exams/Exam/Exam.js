import React, { useState, useEffect } from 'react';
import './Exam.css';
import Navbar from '../../general/Navbar/Navbar';
import { examData } from '../../../data/ExamTests';

const Exam = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(examData.questions.length).fill([])); // Track selected answers as arrays
  const [timeLeft, setTimeLeft] = useState(examData.duration * 60); // Convert minutes to seconds for the timer
  const [grade, setGrade] = useState(null); // Store the grade after submission
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the exam has been submitted

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return; // Stop the timer when it reaches 0
    const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000); // Countdown every second
    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft]);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle checkbox selection
  const handleCheckboxChange = (questionIndex, answerIndex) => {
    const updatedAnswers = [...selectedAnswers];
    if (updatedAnswers[questionIndex].includes(answerIndex)) {
      // If already selected, remove it
      updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter(idx => idx !== answerIndex);
    } else {
      // Otherwise, add it
      updatedAnswers[questionIndex].push(answerIndex);
    }
    setSelectedAnswers(updatedAnswers);
  };

  // Calculate grade based on correct answers (out of 20)
  const calculateGrade = () => {
    let correctCount = 0;
    examData.questions.forEach((question, index) => {
      const correctAnswers = question.correctAnswers;
      const selected = selectedAnswers[index];
      // Check if selected answers include all correct answers
      if (correctAnswers.every(answer => selected.includes(answer)) && selected.length > 0) {
        correctCount++;
      }
    });
    const gradeOutOf20 = (correctCount / examData.questions.length) * 20; // Set the grade out of 20
    setGrade(gradeOutOf20.toFixed(2)); // Set the grade
  };

  // Handle exam submission
  const handleSubmit = () => {
    calculateGrade();
    setIsSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className='exam-box'>
        {/* Top Bar with Exam Name and Timer */}
        <div className="top-bar">
          <h2 className="timer">{examData.name}</h2>
          <h2 className="timer">{formatTime(timeLeft)}</h2>
        </div>

        {/* Questions Section */}
        <div className="questions-section">
          {examData.questions.map((questionData, questionIndex) => (
            <div key={questionIndex} className="question-card">
              <h4><u>{questionData.id}- {questionData.question}</u></h4>
              <ul className="answer-choices">
                {questionData.answers.map((answer, answerIndex) => (
                  <li key={answerIndex}>
                    <input
                      type="checkbox" // Keep checkbox for multiple selection
                      style={{ marginRight: '10px' }}
                      checked={selectedAnswers[questionIndex].includes(answerIndex)}
                      onChange={() => handleCheckboxChange(questionIndex, answerIndex)}
                    />
                    <strong>{String.fromCharCode(65 + answerIndex)})</strong> {answer}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <button
            className="submit-button" // Use the CSS class for styling
            onClick={handleSubmit}
            disabled={isSubmitted} // Disable the button after submission
          >
            Submit Answers
          </button>
        </div>

        {/* Grade Display */}
        {isSubmitted && (
          <div className="grade-display">
            <h3>Your grade is: {grade}/20</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Exam;