import React from 'react';
import { motion } from 'framer-motion';
import ProjectsComponent from '../components/Projects';

const Projects: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-20"
    >
      <ProjectsComponent />
    </motion.div>
  );
};

export default Projects;