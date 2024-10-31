// ExamSheet.js
import React, { useState, useEffect, useMemo, useRef } from 'react';
import './ExamSheet.css';
import { questions_FR } from '../../../data/Questions';
import Modal from '../StartModal/StartModal';

const ExamSheet = ({ chapters, time, test, nbqsts }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(time * 60); // Convert minutes to seconds
  const [grade, setGrade] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal visibility state

  // Memoize chaptersArray to avoid recomputation
  const chaptersArray = useMemo(() => chapters.split(',').map(ch => ch.trim()), [chapters]);

  // Ref to store the initial set of questions so they don't change on re-render
  const examQuestionsRef = useRef([]);

  // Start the timer only after the modal is closed
  useEffect(() => {
    if (!isModalOpen && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isModalOpen]);

  // Select questions based on chapters only on the first render
  useEffect(() => {
    console.log("Chapitre 1: " + questions_FR.filter(q => ["ch1"].includes(q.chapter)).length);
    console.log("Chapitre 2: " + questions_FR.filter(q => ["ch2"].includes(q.chapter)).length);
    console.log("Chapitre 3: " + questions_FR.filter(q => ["ch3"].includes(q.chapter)).length);
    console.log("Chapitre 4: " + questions_FR.filter(q => ["ch4"].includes(q.chapter)).length);
    console.log("--------------")
    if (examQuestionsRef.current.length === 0) {
      const filteredQuestions = questions_FR.filter(q => chaptersArray.includes(q.chapter));
      const questionsPerChapter = Math.ceil(nbqsts / chaptersArray.length);

      // Group questions by chapter
      const questionsByChapter = chaptersArray.reduce((acc, chapter) => {
        acc[chapter] = filteredQuestions
          .filter(q => q.chapter === chapter)
          .sort(() => 0.5 - Math.random()); // Randomize order of chapter questions
        return acc;
      }, {});

      // Select questions evenly from each chapter
      const selectedQuestions = [];
      chaptersArray.forEach(chapter => {
        const chapterQuestions = questionsByChapter[chapter] || [];
        const numberToSelect = Math.min(questionsPerChapter, chapterQuestions.length);
        const randomQuestions = chapterQuestions.slice(0, numberToSelect);
        selectedQuestions.push(...randomQuestions);
      });

      // Shuffle the order of selected questions and each question's options
      examQuestionsRef.current = selectedQuestions
        .sort(() => 0.5 - Math.random())
        .map(question => ({
          ...question,
          options: question.options.sort(() => 0.5 - Math.random()), // Shuffle options
        }));

      setSelectedAnswers(Array(examQuestionsRef.current.length).fill([])); // Initialize selected answers
    }
  }, [chaptersArray, nbqsts]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleCheckboxChange = (questionIndex, answerIndex) => {
    setSelectedAnswers(prevAnswers => {
      const updatedAnswers = prevAnswers.map((answers, idx) => {
        if (idx === questionIndex) {
          // Toggle selection for the specific answer
          if (answers.includes(answerIndex)) {
            return answers.filter(idx => idx !== answerIndex); // Deselect answer if already selected
          } else {
            return [...answers, answerIndex]; // Select the new answer
          }
        }
        return answers;
      });
      return updatedAnswers;
    });
  };

  const calculateGrade = () => {
    let totalGrade = 0;
    examQuestionsRef.current.forEach((question, index) => {
      const correctAnswers = question.answers;
      const selected = selectedAnswers[index];

      // Calculate the portion of the grade per correct answer
      const portionPerCorrectAnswer = 1 / correctAnswers.length;

      // Track the grade for this specific question
      let questionGrade = 0;

      selected.forEach(answerIndex => {
        if (correctAnswers.includes(answerIndex)) {
          // Add portion for correct answer
          questionGrade += portionPerCorrectAnswer;
        } else {
          // Subtract portion for incorrect answer
          questionGrade -= portionPerCorrectAnswer;
        }
      });

      // Ensure the question grade does not go below 0
      if (questionGrade < 0) questionGrade = 0;

      // Add this question's grade to the total
      totalGrade += questionGrade;
    });

    // Scale total grade to be out of 20
    const gradeOutOf20 = (totalGrade / examQuestionsRef.current.length) * 20;
    setGrade(Number.isInteger(gradeOutOf20) ? gradeOutOf20 : gradeOutOf20.toFixed(2));
  };

  const handleSubmit = () => {
    calculateGrade();
    setIsSubmitted(true);
  };

  return (
    <div className='exam-box'>
      {isModalOpen && (
        <Modal
          testName={test}
          time={time}
          questionCount={nbqsts}
          onClose={() => setIsModalOpen(false)} // Close modal and start test
        />
      )}
      
      <div className="top-bar">
        <h2 className="timer">{test}</h2>
        <h2 className="timer">{formatTime(timeLeft)}</h2>
      </div>

      <div className="questions-section">
        {examQuestionsRef.current.map((questionData, questionIndex) => (
          <div key={questionIndex} className="question-card">
            <h4>{questionIndex + 1}) {questionData.question}</h4>
            <ul className="answer-choices">
              {questionData.options.map((answer, answerIndex) => (
                <li key={answerIndex}>
                  <input
                    type="checkbox"
                    style={{ marginRight: '10px' }}
                    checked={selectedAnswers[questionIndex]?.includes(answerIndex) || false}
                    onChange={() => handleCheckboxChange(questionIndex, answerIndex)}
                  />
                  <strong>{String.fromCharCode(65 + answerIndex)})</strong> {answer}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isSubmitted}
        >
          Submit Answers
        </button>
      </div>

      {isSubmitted && (
        <div className="grade-display">
          <h3>Your grade is: {grade}/20</h3>
        </div>
      )}
    </div>
  );
};

export default ExamSheet;