import React from 'react';
import { useParams } from 'react-router-dom';
import ExamSheet from '../components/exams/ExamSheet/ExamSheet';
import Navbar from '../components/general/Navbar/Navbar';
import Footer from '../components/general/Footer/Footer';

export default function Exam() {
  const { chapters, time, test, nbqsts} = useParams();
  return (
    <>
        {/* Navbar */}
        <Navbar />

        {/* Exam Sheet */}
        <ExamSheet chapters={chapters} time={time} test={test} nbqsts={nbqsts} />

        {/* Footer */}
        <Footer />
    </>
  )
}
