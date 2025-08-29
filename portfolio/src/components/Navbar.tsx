import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Briefcase, Building2, Wrench, FileText, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path === '/projects') return 'projects';
    if (path === '/internships') return 'internships';
    if (path === '/skills') return 'skills';
    if (path === '/resume') return 'resume';
    return 'home';
  };
  
  const activeSection = getActiveSection();

  const navigateToSection = (section: string) => {
    if (section === 'home') {
      if (location.pathname === '/' || location.pathname === '/home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
    }
    } else {
      navigate(`/${section}`);
    }
  };

  const openResume = () => {
    window.open('https://docs.google.com/document/d/1yR7gX0f_Lt61atnsHKFodRKp_o5sJBBmj_4MC6KrDIU/view');
  };

  const openGithub = () => {
    window.open('https://github.com/PseudoSwayam', '_blank');
  };

  const openLinkedin = () => {
    window.open('hhttps://www.linkedin.com/in/swayamsahoo11/', '_blank');
  };

  const openEmail = () => {
    window.location.href = 'mailto:swayampr.sahoo@gmail.com';
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200/20 dark:border-gray-700/20">
        <div className="flex items-center space-x-6">
          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateToSection('home')}
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:mx-1 group ${
                activeSection === 'home' ? 'text-nature-teal' : 'text-gray-700 dark:text-gray-300'
              }`}
              aria-label="Home"
            >
              <Home size={18} />
              {activeSection === 'home' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-nature-teal rounded-full animate-pulse" />
              )}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Home
              </div>
            </button>

            <button
              onClick={() => navigateToSection('projects')}
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:mx-1 group ${
                activeSection === 'projects' ? 'text-nature-teal' : 'text-gray-700 dark:text-gray-300'
              }`}
              aria-label="Projects"
            >
              <Briefcase size={18} />
              {activeSection === 'projects' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-nature-teal rounded-full animate-pulse" />
              )}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Projects
              </div>
            </button>

            <button
              onClick={() => navigateToSection('internships')}
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:mx-1 group ${
                activeSection === 'internships' ? 'text-nature-teal' : 'text-gray-700 dark:text-gray-300'
              }`}
              aria-label="Internships"
            >
              <Building2 size={18} />
              {activeSection === 'internships' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-nature-teal rounded-full animate-pulse" />
              )}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Internships
              </div>
            </button>

            <button
              onClick={() => navigateToSection('skills')}
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:mx-1 group ${
                activeSection === 'skills' ? 'text-nature-teal' : 'text-gray-700 dark:text-gray-300'
              }`}
              aria-label="Skills"
            >
              <Wrench size={18} />
              {activeSection === 'skills' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-nature-teal rounded-full animate-pulse" />
              )}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Skills
              </div>
            </button>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

          {/* External Links */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openResume}
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:mx-1 group ${
                activeSection === 'resume' ? 'text-nature-teal' : 'text-gray-700 dark:text-gray-300'
              }`}
              aria-label="Resume"
            >
              <FileText size={18} />
              {activeSection === 'resume' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-nature-teal rounded-full animate-pulse" />
              )}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Resume
              </div>
            </button>

            <button
              onClick={openGithub}
              className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:mx-1 group text-gray-700 dark:text-gray-300"
              aria-label="GitHub"
            >
              <Github size={18} />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                GitHub
              </div>
            </button>

            <button
              onClick={openLinkedin}
              className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:mx-1 group text-gray-700 dark:text-gray-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                LinkedIn
              </div>
            </button>

            <button
              onClick={openEmail}
              className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:mx-1 group text-gray-700 dark:text-gray-300"
              aria-label="Email Me"
            >
              <Mail size={18} />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Mail
              </div>
            </button>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:mx-1 group relative text-gray-700 dark:text-gray-300"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={18} />
            )}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Theme
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;