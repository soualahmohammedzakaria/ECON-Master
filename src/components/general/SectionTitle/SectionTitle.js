import React from 'react';
import './SectionTitle.css';

export default function SectionTitle({ title, link }) {
  const handleClick = () => {
    if (link) {
      window.open(link, '_blank');
    }
  }
  
  return (
    <h2 onClick={handleClick} className={link ? 'link-section-text-title section-text-title' :'section-text-title'}>{title}</h2>
  )
}
