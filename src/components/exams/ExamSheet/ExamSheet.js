// ExamSheet.js
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import './ExamSheet.css';
import { questions_FR } from '../../../data/Questions';
import StartModal from '../StartModal/StartModal';
import GradeModal from '../GradeModal/GradeModal';

const ExamSheet = ({ chapters, time, test, nbqsts }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(time * 60); // Convert minutes to seconds
  const [grade, setGrade] = useState(0);
  const [focusTopics, setFocusTopics] = useState(["Topic 1", "Topic 2", "Topic 3"]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(true);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  // Memoize chaptersArray to avoid recomputation
  const chaptersArray = useMemo(() => chapters.split(',').map(ch => ch.trim()), [chapters]);

  // Ref to store the initial set of questions so they don't change on re-render
  const examQuestionsRef = useRef([]);

  // Round to the nearest 0.25
  const roundToNearestQuarter = (num) => {
    return Math.round(num * 4) / 4;
  };

  // Calculate grade based on selected answers
  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
    let totalGrade = 0;
    examQuestionsRef.current.forEach((question, index) => {
      const correctAnswers = question.answers;
      const selected = selectedAnswers[index];
  
      const portionPerCorrectAnswer = 1 / correctAnswers.length;
      let questionGrade = 0;
  
      selected.forEach(answerText => {
        if (correctAnswers.includes(answerText)) {
          questionGrade += portionPerCorrectAnswer;
        } else {
          questionGrade -= portionPerCorrectAnswer;
        }
      });
  
      if (questionGrade < 0) questionGrade = 0;
      totalGrade += questionGrade;
    });
    
    const gradeOutOf20 = (totalGrade / examQuestionsRef.current.length) * 20;
    const roundedGrade = roundToNearestQuarter(gradeOutOf20);
    setGrade(roundedGrade);
    setIsGradeModalOpen(true);
  }, [selectedAnswers]);

  // Start the timer only after the modal is closed
  useEffect(() => {
    if (!isStartModalOpen && timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isStartModalOpen, isSubmitted, handleSubmit]);

  // Select questions based on chapters only on the first render
  useEffect(() => {
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

  const handleCheckboxChange = (questionIndex, answerText) => {
    if (!isSubmitted) {
      setSelectedAnswers(prevAnswers => {
        const updatedAnswers = prevAnswers.map((answers, idx) => {
          if (idx === questionIndex) {
            // Toggle selection for the specific answer text
            if (answers.includes(answerText)) {
              return answers.filter(ans => ans !== answerText); // Deselect answer if already selected
            } else {
              return [...answers, answerText]; // Select the new answer text
            }
          }
          return answers;
        });
        return updatedAnswers;
      });
    }
  };

  return (
    <div className='exam-box'>
      {isStartModalOpen && (
        <StartModal
          testName={test}
          time={time}
          questionCount={nbqsts}
          onClose={() => setIsStartModalOpen(false)} // Close modal and start test
        />
      )}

      {isGradeModalOpen && (
        <GradeModal 
          grade={grade}
          topics={focusTopics}
          onClose={() => setIsGradeModalOpen(false)}
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
              <li key={answerIndex} style={isSubmitted ? questionData.answers.includes(answer) ? { color: "green", fontWeight: "bold"} : { color: "red"} : {}}>
                <input
                  type="checkbox"
                  style={isSubmitted ? { marginRight: '10px', cursor: "not-allowed" } : { marginRight: '10px' }}
                  checked={selectedAnswers[questionIndex]?.includes(answer) || false}
                  onChange={() => handleCheckboxChange(questionIndex, answer)}
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
          <p>You should focus on the following topics: <b>{focusTopics.join(", ")}</b></p>
        </div>
      )}
    </div>
  );
};

export default ExamSheet;