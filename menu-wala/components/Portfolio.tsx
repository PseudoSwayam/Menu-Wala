
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Image, Layers } from 'lucide-react';

interface PortfolioProps {
    onSectionChange: (section: string) => void;
}

const PortfolioSection1: React.FC = () => (
    <div className="p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">Portfolio Section 1</h2>
        <p className="text-gray-400">Details about the first section of the portfolio. This could include project descriptions, case studies, or galleries.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-brand-orange transition-colors">
                     <img src={`https://picsum.photos/seed/${i+10}/400/300`} alt={`Project ${i+1}`} className="rounded-md mb-4" />
                    <h3 className="text-xl text-white font-semibold">Project {i+1}</h3>
                    <p className="text-gray-400 text-sm mt-2">A brief description of this amazing project goes here.</p>
                </div>
            ))}
        </div>
    </div>
);

const PortfolioSection2: React.FC = () => (
     <div className="p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">Portfolio Section 2</h2>
        <p className="text-gray-400">Details about the second section, perhaps focusing on a different skill set or type of work.</p>
         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-brand-orange transition-colors">
                     <img src={`https://picsum.photos/seed/${i+20}/400/300`} alt={`Service ${i+1}`} className="rounded-md mb-4" />
                    <h3 className="text-xl text-white font-semibold">Service {i+1}</h3>
                    <p className="text-gray-400 text-sm mt-2">A detailed explanation of the service offered.</p>
                </div>
            ))}
        </div>
    </div>
);

const Portfolio: React.FC<PortfolioProps> = ({ onSectionChange }) => {
    const location = useLocation();

    useEffect(() => {
        onSectionChange('portfolio');
    }, [onSectionChange]);
    
    useEffect(() => {
        if(location.pathname === '/portfolio' || location.pathname === '/portfolio/'){
            // default view
        }
    }, [location.pathname]);

    return (
        <div className="pt-20">
             <Routes>
                <Route path="/" element={<Navigate to="section1" replace />} />
                <Route path="section1" element={<PortfolioSection1 />} />
                <Route path="section2" element={<PortfolioSection2 />} />
            </Routes>
        </div>
    );
};

export default Portfolio;
