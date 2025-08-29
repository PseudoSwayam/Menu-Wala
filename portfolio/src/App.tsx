import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import WelcomeAnimation from './components/WelcomeAnimation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Internships from './pages/Internships';
import Skills from './pages/Skills';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  useEffect(() => {
    const welcomeShown = sessionStorage.getItem('welcomeShown');
    if (welcomeShown) {
      setShowWelcome(false);
      setHasShownWelcome(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setHasShownWelcome(true);
    sessionStorage.setItem('welcomeShown', 'true');
  };

  return (
  <ThemeProvider>
    <Router basename="/">
      {showWelcome && !hasShownWelcome ? (
        <WelcomeAnimation onComplete={handleWelcomeComplete} />
      ) : (
        <>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/skills" element={<Skills />} />
            </Routes>

            <Footer />
          </div>
        </>
      )}
    </Router>
  </ThemeProvider>
);
}

export default App;