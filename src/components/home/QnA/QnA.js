import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { questionsAndAnswers } from '../../../data/QnA';
import SectionTitle from '../../general/SectionTitle/SectionTitle';
import './QnA.css'; 

export default function QnA() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAnswer = (index) => {
    setOpenIndexes((prevIndexes) => 
      prevIndexes.includes(index) 
        ? prevIndexes.filter((i) => i !== index) // Close the answer if it's already open
        : [...prevIndexes, index] // Open the answer
    );
  };

  return (
    <section id="qna" className="qna-section">
      <SectionTitle title="Q&A" />
      <div className="qna-container">
        {questionsAndAnswers.map((item, index) => (
          <div key={index} className="qna-item">
            <div style={!openIndexes.includes(index) ? { borderRadius: "var(--border-radius)" } : {}} className="question" onClick={() => toggleAnswer(index)}>
              <span>{item.question}</span>
              {openIndexes.includes(index) ? (
                <FaAngleUp className="toggle-icon" />
              ) : (
                <FaAngleDown className="toggle-icon" />
              )}
            </div>
            {openIndexes.includes(index) && (
                <motion.div
                    className="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {`${item.answer} `}
                    {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
                            color: "var(--primary-color)",
                            textDecoration: "none",
                            fontWeight: "700",
                        }}>Link here</a>
                    )}
                </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}