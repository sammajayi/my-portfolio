'use client';

import { useEffect, useState } from 'react';

const roles = [
  'Blockchain Developer',
  'Web3 Builder',
  'Product Manager',
];

export default function TypewriterEffect() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  const currentRole = roles[roleIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTyping) {
        if (charIndex < currentRole.length) {
          setDisplayText(currentRole.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Finished typing, start clearing after a pause
          setTimeout(() => setIsTyping(false), 1500);
        }
      } else {
        // Clearing text
        if (charIndex > 0) {
          setDisplayText(currentRole.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Move to next role
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setIsTyping(true);
        }
      }
    }, isTyping ? 80 : 50);

    return () => clearTimeout(timer);
  }, [charIndex, isTyping, currentRole]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
