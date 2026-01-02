import React, { useState, useEffect } from 'react';
import './style.scss';

function RotatingText({ items = [], typingInterval = 100, deletingInterval = 50, pauseInterval = 1500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || items.length === 0) return;

    const currentItem = items[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentItem.length) {
          setCurrentText(currentItem.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseInterval);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % items.length);
        }
      }
    }, isDeleting ? deletingInterval : typingInterval);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, items, mounted, typingInterval, deletingInterval, pauseInterval]);

  if (!mounted) {
    return <span className="rotating-text">{items[0] || ''}</span>;
  }

  return (
    <span className="rotating-text">
      {currentText}
      <span className="rotating-text-cursor">|</span>
    </span>
  );
}

export default RotatingText;

