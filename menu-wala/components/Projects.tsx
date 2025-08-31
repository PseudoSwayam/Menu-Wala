import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface ProjectsProps {
    onSectionChange: (section: string) => void;
}

// --- HOW TO CUSTOMIZE PORTFOLIO PROJECTS ---
// To add your own projects, modify the `projectData` object below.
// It's split into categories ('our-templates', 'completed-menu', etc.) which correspond
// to the sidebar links. Inside each category is an array of project objects.
//
// Each project object has four properties to customize:
// 1. `id`: A unique number for the project.
// 2. `title`: The name of the project (e.g., 'Modern Bistro Menu').
// 3. `description`: A short description of the project.
// 4. `image`: The URL for the project's thumbnail image.
// 5. `driveLink`: The **embed link** for your Google Drive file.
//
// --- HOW TO GET THE GOOGLE DRIVE EMBED LINK ---
// a. Open your file in Google Drive.
// b. Click the three dots (More actions) in the top-right corner and select "Share". 
//    Make sure "General access" is set to "Anyone with the link".
// c. Click the three dots again and select "Embed item...".
// d. Copy the `src` URL from within the `<iframe>` tag. It will look like this:
//    https://drive.google.com/file/d/YOUR_FILE_ID/preview
//
// Example Project Object:
// {
//   id: 1,
//   title: 'Classic Cafe Menu',
//   description: 'A timeless design for a cozy cafe atmosphere.',
//   image: 'https://picsum.photos/seed/p1-1/800/600',
//   driveLink: 'https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ_12345/preview',
// },
// --- END OF CUSTOMIZATION GUIDE ---

const projectData = {
    'our-templates': [
        {
            id: 1,
            title: 'Modern QR Menu System',
            description: 'A sleek, modern QR-based menu system for restaurants.',
            image: `https://res.cloudinary.com/dwwihknne/image/upload/v1756639343/two-page-restaurant-menu-card-design-template-fast-food-item-price-list-template_672416-3817_n4fay5.avif`,
            driveLink: `https://docs.google.com/document/d/1O2y3x4v5b6a7c8d9e0f/edit?usp=sharing&ouid=123456789012345678901&rtpof=true&sd=true`, // Replace with your actual embed link
        },
        {
            id: 2,
            title: 'Minimalist Cafe Menu',
            description: 'Clean and simple design for a modern coffee shop.',
            image: `https://picsum.photos/seed/p1-item2/800/600`,
            driveLink: `https://docs.google.com/document/d/1O2y3x4v5b6a7c8d9e0f/edit?usp=sharing&ouid=123456789012345678901&rtpof=true&sd=true`, // Replace with your actual embed link
        },
        // Add more projects for this section here
    ],
    'completed-menu': [
        {
            id: 1,
            title: 'Integrated Ordering Platform',
            description: 'An integrated online ordering platform for food businesses.',
            image: `https://picsum.photos/seed/p2-item1/800/600`,
            driveLink: `https://docs.google.com/document/d/1O2y3x4v5b6a7c8d9e0f/edit?usp=sharing&ouid=123456789012345678901&rtpof=true&sd=true`, // Replace with your actual embed link
        },
         {
            id: 2,
            title: 'Restaurant Analytics Dashboard',
            description: 'Data visualization for sales and customer behavior.',
            image: `https://picsum.photos/seed/p2-item2/800/600`,
            driveLink: `https://docs.google.com/document/d/1O2y3x4v5b6a7c8d9e0f/edit?usp=sharing&ouid=123456789012345678901&rtpof=true&sd=true`, // Replace with your actual embed link
        },
        // Add more projects for this section here
    ],
};

const ProjectView: React.FC<{ projects: typeof projectData['our-templates'], onProjectClick: (url: string) => void }> = ({ projects, onProjectClick }) => (
    <div className="p-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div key={project.id} className="bg-bg-primary/50 rounded-lg border border-border-primary overflow-hidden group">
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <p className="text-text-secondary text-sm mb-2">{project.description}</p>
                        <button onClick={() => onProjectClick(project.driveLink)} className="bg-text-secondary text-text-primary px-4 py-2 text-xs rounded-md hover:bg-accent-orange hover:text-bg-primary transition-colors font-bold">
                            view-menu
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Projects: React.FC<ProjectsProps> = ({ onSectionChange }) => {
    const [modalUrl, setModalUrl] = useState<string | null>(null);

    useEffect(() => {
        onSectionChange('portfolio');
    }, [onSectionChange]);

    const handleCloseModal = useCallback(() => {
        setModalUrl(null);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleCloseModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleCloseModal]);

    const AnimateInWrapper = ({ children }: { children: React.ReactNode }) => {
      const ref = React.useRef<HTMLDivElement>(null);
      useEffect(() => {
        if(ref.current) {
          ref.current.classList.remove('scale-95', 'opacity-0');
        }
      }, []);
      return <div ref={ref} className="transition-all duration-300 scale-95 opacity-0 w-full h-full">{children}</div>
    }

    return (
        <div className="pt-8">
             <Routes>
                <Route path="/" element={<Navigate to="our-templates" replace />} />
                <Route path="our-templates" element={<ProjectView projects={projectData['our-templates']} onProjectClick={setModalUrl} />} />
                <Route path="completed-menu" element={<ProjectView projects={projectData['completed-menu']} onProjectClick={setModalUrl} />} />
            </Routes>

            {modalUrl && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={handleCloseModal}
                >
                    <AnimateInWrapper>
                      <div 
                          className="bg-bg-primary rounded-lg p-2 border border-border-primary relative w-full h-full max-w-5xl max-h-[90vh]"
                          onClick={(e) => e.stopPropagation()}
                      >
                          <button onClick={handleCloseModal} className="absolute -top-4 -right-4 bg-accent-orange text-bg-primary rounded-full p-2 z-10 hover:scale-110 transition-transform">
                              <X className="w-6 h-6" />
                          </button>
                          <iframe
                            src={modalUrl}
                            className="w-full h-full rounded-md bg-white"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="Project Preview"
                          ></iframe>
                      </div>
                    </AnimateInWrapper>
                </div>
            )}
        </div>
    );
};

export default Projects;