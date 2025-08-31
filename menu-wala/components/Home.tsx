import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AnimatedText: React.FC = () => {
    const phrases = ["QR Code Menu Platform", "Digital Dining Solutions", "Restaurant Experience Revolution"];
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    
    useEffect(() => {
        if (subIndex === phrases[index].length + 1 && !reverse) {
            const timer = setTimeout(() => setReverse(true), 2000);
            return () => clearTimeout(timer);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % phrases.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 75 : 150);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, phrases]);


    return (
        <h2 className="text-2xl md:text-3xl text-accent-teal flex items-center">
            <ArrowRight className="inline-block mr-3 text-accent-teal" />
            <span>{`${phrases[index].substring(0, subIndex)}`}</span>
            <span className="animate-ping text-text-primary">_</span>
        </h2>
    );
};

interface HomeProps {
    onSectionChange: (section: string) => void;
}

const Home: React.FC<HomeProps> = ({ onSectionChange }) => {
    useEffect(() => {
        onSectionChange('home');
    }, [onSectionChange]);

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
            <div className="max-w-4xl w-full text-left">
                
                <p className="text-text-secondary mb-2 text-lg">Welcome to</p>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-accent-teal via-accent-orange to-accent-pink text-transparent bg-clip-text">
                    Menu Wala
                </h1>

                <AnimatedText />

                <div className="mt-8 text-text-secondary space-y-2">
                    <p>// revolutionizing the dining experience</p>
                    <p className="flex items-center">
                        <span className="text-text-accent">const</span>
                        <span className="text-text-primary mx-2">mission</span>
                        <span className="text-white">=</span>
                        <span className="text-accent-orange ml-2">"To empower restaurants with seamless digital solutions"</span>;
                    </p>
                </div>
                
                <div className="mt-12">
                    <Link to="/portfolio" className="bg-text-secondary text-text-primary px-6 py-3 rounded-md hover:bg-accent-orange hover:text-bg-primary transition-colors font-bold flex items-center w-fit">
                        View our portfolio <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Home;