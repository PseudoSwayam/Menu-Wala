import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
    return (
        <Link 
          to={to} 
          className={`px-4 border-b-2 transition-colors duration-300 h-full flex items-center border-r border-border-primary ${isActive ? 'border-b-accent-orange text-text-primary' : 'border-b-transparent text-text-secondary hover:text-text-primary'}`}
        >
            {children}
        </Link>
    );
};

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full h-16 flex justify-between items-center z-20 bg-bg-primary/50 backdrop-blur-sm border-b border-border-primary text-sm">
            <div className="flex items-center h-full w-full">
                 <Link to="/" className="px-4 text-text-primary w-full md:w-72 border-r border-border-primary h-full flex items-center">
                    menu-wala
                </Link>
                <nav className="hidden md:flex items-center h-full">
                    <NavLink to="/">_home</NavLink>
                    <NavLink to="/about-us">_about-us</NavLink>
                    <NavLink to="/portfolio">_portfolio</NavLink>
                </nav>
            </div>
            <div className="h-full border-l border-border-primary">
                <Link to="/contact/get_in_touch" className="px-4 h-full flex items-center text-text-secondary hover:text-text-primary whitespace-nowrap">
                    _contact-us
                </Link>
            </div>
        </header>
    );
};

export default Header;