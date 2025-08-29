import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Internships from '../components/Internships';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Projects />
      <Internships />
      <Skills />
      <Contact />
    </main>
  );
};

export default Home;