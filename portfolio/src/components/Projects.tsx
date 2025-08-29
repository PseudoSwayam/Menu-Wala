import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
}

const Projects: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Disaster Recon and Autonomous Interface',
      description: 'An autonomous disaster rover with real-time human detection (<400ms latency) and GPS-mapped PDF reports using Flask, OpenCV, Raspberry Pi, and ReportLab, recognized in hackathons for rapid deployability.',
      techStack: ['Python', 'Flask', 'OpenCV', 'Raspberry Pi', 'GPS', 'pyttsx3', 'ReportLab', 'HTML', 'JS', 'Leaflet.js'],
      category: 'AI',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: 2,
      title: 'Cognitia',
      description: 'A full-stack AI assistant using FastAPI, LangChain, and Mistral (via Ollama) to semantically fetch and process academic content(papers/ videos) and simulate expert mentorship through debate, tone adaptation, and offline-ready chat within 45s.',
      techStack: ['TypeScript', 'React', 'FastAPI', 'Python', 'LangChain', 'SQLite', 'ChromaDB', 'Ollama (Mistral)', 'TailwindCSS', 'ArXiv/YouTube API'],
      category: 'LLMs',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: 3,
      title: 'Skills of the Future Dashboard',
      description: 'A Python-Streamlit dashboard analyzing 120K+ jobs and 4K layoffs to forecast 80+ tech skill trends, identify emerging tools, and auto-generate project ideas using GitHub & Google Trends data.',
      techStack: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'BeautifulSoup', 'Regex', 'GitHub API', 'Google Trends API', 'CSV', 'EDA'],
      category: 'Data Science',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: 4,
      title: 'KALI-AI',
      description: 'A fully offline wearable assistant on Apple Silicon integrating YOLOv8, OCR, and facial recognition, delivering 150ms TTS navigation, real-time greetings, and WhatsApp-based SOS within 25s response.',
      techStack: ['Python', 'YOLOv8m', 'Tesseract OCR', 'InsightFace', 'CoreML', 'OpenCV', 'ONNXRuntime', 'macOS'],
      category: 'IoT',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: 5,
      title: 'TARA (Threat Alert Rescue Assistant',
      description: 'A ₹1500 wearable IoT device with GSM, GPS, and triple SOS triggers (motion, button, voice) for emergency alerting, reducing response time by ~90 seconds in simulated high-stress scenarios.',
      techStack: ['Arduino Nano', 'SIM800L', 'Neo-6M GPS', 'IR Sensor', 'Voice Module', 'Embedded C', 'Python'],
      category: 'IoT',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: 6,
      title: 'TARA Vision',
      description: 'A real-time AI surveillance module using YOLOv8 and ResNet50 (97%+ test accuracy) to detect distress patterns like “Lone/Surrounded Woman” with <200ms inference for edge-based alerts.',
      techStack: ['Python', 'OpenCV', 'TensorFlow', 'YOLOv8', 'ResNet50'],
      category: 'AI',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
  ];


  const handleMouseMove = (e: React.MouseEvent, cardId: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
    setHoveredCard(cardId);
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Projects
          </h2>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseMove={(e) => handleMouseMove(e, project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/30 dark:border-gray-700/30 transition-all duration-500 hover:shadow-lg group overflow-hidden aspect-square flex flex-col"
                style={{
                  background: hoveredCard === project.id 
                    ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(20, 184, 166, 0.05), rgba(139, 92, 246, 0.05), transparent 70%)`
                    : undefined
                }}
              >
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                  hoveredCard === project.id ? 'bg-gradient-to-r from-nature-teal/10 via-nature-violet/10 to-nature-ocean/10' : ''
                }`}>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-xs leading-relaxed flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-gradient-to-r from-nature-teal/10 to-nature-violet/10 text-nature-teal dark:text-nature-violet rounded-full text-xs font-medium border border-nature-teal/20 hover:shadow-sm hover:scale-105 hover:from-nature-teal/20 hover:to-nature-violet/20 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2 mt-auto">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-xs hover:scale-105 transition-all duration-300 hover:shadow-lg hover:bg-gray-800 dark:hover:bg-gray-100 font-medium"
                    >
                      <Github size={10} />
                      <span>Code</span>
                    </a>
                    
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full text-xs hover:scale-105 transition-all duration-300 hover:shadow-lg border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 font-medium"
                    >
                      <ExternalLink size={10} />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;