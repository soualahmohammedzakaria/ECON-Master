import React, { useState, useEffect, useMemo, useRef } from 'react';
import './ExamSheet.css';
import { questions } from '../../../data/Questions';

const ExamSheet = ({ chapters, time, test, nbqsts }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(time * 60); // Convert minutes to seconds
  const [grade, setGrade] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Memoize chaptersArray to avoid recomputation
  const chaptersArray = useMemo(() => chapters.split(',').map(ch => ch.trim()), [chapters]);

  // Ref to store the initial set of questions so they don't change on re-render
  const examQuestionsRef = useRef([]);

  // Select questions based on chapters only on the first render
  useEffect(() => {
    if (examQuestionsRef.current.length === 0) {
      const filteredQuestions = questions.filter(q => chaptersArray.includes(q.chapter));
      const questionsPerChapter = Math.ceil(nbqsts / chaptersArray.length);
      
      // Group questions by chapter
      const questionsByChapter = chaptersArray.reduce((acc, chapter) => {
        acc[chapter] = filteredQuestions.filter(q => q.chapter === chapter);
        return acc;
      }, {});

      // Select questions evenly from each chapter
      const selectedQuestions = [];
      chaptersArray.forEach(chapter => {
        const chapterQuestions = questionsByChapter[chapter] || [];
        const numberToSelect = Math.min(questionsPerChapter, chapterQuestions.length);
        const randomQuestions = chapterQuestions.sort(() => 0.5 - Math.random()).slice(0, numberToSelect);
        selectedQuestions.push(...randomQuestions);
      });

      // Shuffle the selected questions only once and store them in ref
      examQuestionsRef.current = selectedQuestions.sort(() => 0.5 - Math.random());
      setSelectedAnswers(Array(examQuestionsRef.current.length).fill([])); // Initialize selected answers
    }
  }, [chaptersArray, nbqsts]); // Memoized values prevent re-renders

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

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
      questionGrade = Math.max(0, questionGrade);
  
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