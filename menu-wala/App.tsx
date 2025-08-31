import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import About from './components/About';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import { Instagram, Twitter } from 'lucide-react';

const AppContent: React.FC = () => {
    const location = useLocation();
    const [showWelcome, setShowWelcome] = useState(true);

    const getCurrentSection = () => {
        const path = location.pathname.split('/')[1];
        return ['about-us', 'portfolio', 'contact'].includes(path) ? path : 'home';
    };

    const [activeSection, setActiveSection] = useState<string>(getCurrentSection);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
            document.body.style.overflowY = 'auto';
        }, 5000); 

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setActiveSection(getCurrentSection());
    }, [location.pathname]);

    const showSidebar = activeSection !== 'home';

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
    };

    return (
        <>
            <WelcomeScreen show={showWelcome} />

            <div
                className={`relative min-h-screen text-text-secondary font-mono bg-bg-secondary overflow-hidden transition-all duration-1000 ease-in-out ${showWelcome ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
                {/* Background Elements */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-bg-primary via-bg-tertiary to-bg-quaternary bg-300 animate-animated-gradient" />
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:2rem_2rem]" />
                <div className="absolute top-0 -left-64 w-96 h-96 md:w-[40rem] md:h-[40rem] bg-accent-purple/50 rounded-full opacity-10 blur-3xl animate-blob" />
                <div className="absolute bottom-0 -right-64 w-96 h-96 md:w-[40rem] md:h-[40rem] bg-accent-teal/50 rounded-full opacity-10 blur-3xl animate-blob" style={{ animationDelay: '3.5s' }} />

                {/* App Content */}
                <div className="relative z-10">
                    <Header />
                    <div className="flex pt-16">
                        {showSidebar && <Sidebar activeSection={activeSection} />}
                        <main className={`flex-1 transition-all duration-300 ${showSidebar ? 'md:ml-72' : ''}`}>
                            <Routes>
                                <Route path="/" element={<Home onSectionChange={handleSectionChange} />} />
                                <Route path="/about-us/*" element={<About onSectionChange={handleSectionChange} />} />
                                <Route path="/portfolio/*" element={<Projects onSectionChange={handleSectionChange} />} />
                                <Route path="/contact/*" element={<Contact onSectionChange={handleSectionChange} />} />
                            </Routes>
                        </main>
                    </div>
                    <footer className="fixed bottom-0 left-0 w-full h-10 px-4 text-sm flex justify-between items-center z-10 bg-bg-primary/50 backdrop-blur-sm border-t border-border-primary">
                        <div className="flex items-center space-x-4 h-full">
                            <span className="pr-4">find-us-in:</span>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-full flex items-center px-3 border-l border-r border-border-primary hover:text-text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-full flex items-center px-3 border-r border-border-primary hover:text-text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>&copy; {new Date().getFullYear()} Menu Wala</span>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <AppContent />
        </HashRouter>
    );
};

export default App;