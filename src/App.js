import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import Exam from './pages/Exam';

// Components
import GitHubStar from './components/general/GitHubStar/GitHubStar';


function App() {
  return (
    <Router>
      <GitHubStar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exam/:chapters/:time/:test/:nbqsts" element={<Exam />} />
      </Routes>
    </Router>
  );
}

export default App;