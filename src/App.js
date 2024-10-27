import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import Exam from './pages/Exam';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exam/:chapters/:time/:test/:nbqsts" element={<Exam />} />
      </Routes>
    </Router>
  );
}

export default App;