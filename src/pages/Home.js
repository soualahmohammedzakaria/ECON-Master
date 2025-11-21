import React, { useEffect } from 'react';
import Navbar from '../components/general/Navbar/Navbar';
import Description from '../components/home/Description/Description';
import Courses from '../components/home/Courses/Courses';
import Videos from '../components/home/Videos/Videos';
import Tests from '../components/home/Tests/Tests';
import QnA from '../components/home/QnA/QnA';
import Footer from '../components/general/Footer/Footer';

export default function Home() {

  useEffect(() => {
    fetch("https://countapi.mileshilliard.com/api/v1/hit/econ-master-site")
      .catch(err => console.error("Sorry, an error occurred while incrementing the visit count:", err));
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Website Description Section with Video Background */}
      <Description />

      {/* Courses Section */}
      <Courses />

      {/* Video Recordings Section */}
      <Videos />

      {/* Exam Tests Section */}
      <Tests />

      {/* Q&A Section */}
      <QnA />

      {/* Footer */}
      <Footer />
    </>
  )
}
