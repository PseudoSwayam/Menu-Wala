import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = {
    Languages: ['Python', 'Java', 'SQL', 'Pandas', 'NumPy', 'SQLite', 'CSV', 'PostgreSQL', 'SQL Server', 'Snowflake', 'Databricks'],
    Frameworks: ['TensorFlow', 'PyTorch', 'scikit-learn', 'YOLOv8', 'OpenCV', 'InsightFace', 'ResNet', 'Tesseract OCR', 'Transformers', 'LangChain', 'NLTK', 'FastAPI', 'Flask'],
    Tools: ['Azure Data Studio', 'Docker', 'Github API', 'Git', 'REST APIs', 'Streamlit', 'Web Scraping', 'Raspberry Pi', 'Object Detection', 'Face Recognition', 'Real-Time AI', 'Prompt Engineering', 'Semantic Search', 'Sentiment Analysis']
  };

  return (
    <section id="skills" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center">
            Skills
          </h2>
          
          <div className="space-y-6">
            {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="text-left"
              >
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                  {category}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-700/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200/40 dark:border-gray-600/40 hover:shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-nature-teal/10 hover:to-nature-violet/10 hover:border-nature-teal/30 hover:text-nature-teal dark:hover:text-nature-violet transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;