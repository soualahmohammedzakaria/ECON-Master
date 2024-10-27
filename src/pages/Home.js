import React from 'react';
import Navbar from '../components/general/Navbar/Navbar';
import Description from '../components/home/Description/Description';
import Courses from '../components/home/Courses/Courses';
import Videos from '../components/home/Videos/Videos';
import Tests from '../components/home/Tests/Tests';
import Footer from '../components/general/Footer/Footer';

export default function Home() {
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

      {/* Footer */}
      <Footer />
    </>
  )
}
