import { useState, useEffect } from 'react';

const RotatingText = () => {
  const texts = [
    "I am a Frontend Developer.",
    "I am a Web3 Frontend Developer."
  ];

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % texts.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="text-lg font-semibold">
      {texts[currentText]}
    </div>
  );
};

export default RotatingText;