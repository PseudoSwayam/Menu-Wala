import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const greetings = [
    'Hi.',
    'Hello.',
    'Bonjour.',
    'Hola.',
    'こんにちは.',
    '안녕하세요.',
    'नमस्ते.'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < greetings.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Last greeting stays a bit longer
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 800); // Fade out duration
        }, 1200);
      }
    }, currentIndex === greetings.length - 1 ? 0 : 700);

    return () => clearTimeout(timer);
  }, [currentIndex, onComplete, greetings.length]);

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white"
        >
          {greetings[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WelcomeAnimation;