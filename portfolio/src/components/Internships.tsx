import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Internship {
  id: number;
  company: string;
  role: string;
  duration: string;
}

const Internships: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const internships: Internship[] = [
    {
      id: 1,
      company: 'Scalable Systems',
      role: 'Data Science Intern',
      duration: 'Jun 2025 - Sept 2024',
    },
    {
      id: 2,
      company: 'DeepSurge.Ai',
      role: 'AI/ML Intern',
      duration: 'Jun 2025 - Jul 2025',
    },
    {
      id: 3,
      company: 'Native Engineering',
      role: 'Campus Ambassador',
      duration: 'Feb 2025 - Mar 2025',
    }
  ];

  return (
    <section id="internships" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center">
            Internships
          </h2>
          
          <div className="space-y-3 text-left">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-left"
              >
                <div className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-medium text-nature-teal">{internship.company}</span>
                  <span className="mx-2 text-gray-400">–</span>
                  <span className="font-medium">{internship.role}</span>
                  <span className="mx-2 text-gray-400">–</span>
                  <span className="text-gray-500 dark:text-gray-400">{internship.duration}</span>
                </div>
                {index < internships.length - 1 && (
                  <div className="mt-3 w-16 h-px bg-gradient-to-r from-nature-violet/20 via-nature-teal/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Internships;