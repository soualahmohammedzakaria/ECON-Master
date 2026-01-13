import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './GitHubStar.css';

export default function GitHubStar() {
  return (
    <a
      href="https://github.com/soualahmohammedzakaria/ECON-Master"
      target="_blank"
      rel="noopener noreferrer"
      className="github-star-btn"
      title="Star project on GitHub"
    >
      <FaGithub className="github-icon" />
      <span className="star-text">Star Project</span>
    </a>
  );
}
