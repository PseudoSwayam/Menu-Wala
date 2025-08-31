import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Folder, Mail, FileCode, Send, ClipboardList, Phone } from 'lucide-react';

interface SidebarProps {
    activeSection: string;
}

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode }> = ({ to, icon, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link to={to} className={`flex items-center py-1 space-x-2 w-full overflow-hidden transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}>
            <div className="flex-shrink-0">{icon}</div>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">{children}</span>
        </Link>
    );
};

const CollapsibleSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, icon, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <li>
            <div className="flex items-center text-text-primary cursor-pointer py-2" onClick={() => setIsOpen(!isOpen)}>
                <ChevronRight className={`w-4 h-4 mr-2 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                {icon}
                {title}
            </div>
            {isOpen && (
                <ul className="pl-6 pt-1 space-y-1 border-l border-border-primary ml-[18px]">
                    {children}
                </ul>
            )}
        </li>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
    
    const renderAboutSidebar = () => (
        <CollapsibleSection title="_about-us" icon={<Folder className="w-5 h-5 mr-2 text-accent-orange" />}>
            <CollapsibleSection title="services" icon={<Folder className="w-5 h-5 mr-2 text-accent-teal" />} defaultOpen={true}>
                 <SidebarLink to="/about-us/services/qr_based_menu" icon={<FileCode className="w-5 h-5 text-accent-pink" />}>qr_based_menu</SidebarLink>
                 <SidebarLink to="/about-us/services/ordering_system" icon={<ClipboardList className="w-5 h-5 text-accent-pink" />}>ordering_system</SidebarLink>
            </CollapsibleSection>
            <CollapsibleSection title="contacts" icon={<Folder className="w-5 h-5 mr-2 text-accent-teal" />} defaultOpen={true}>
                 <SidebarLink to="/about-us/contacts/mail" icon={<Mail className="w-5 h-5 text-accent-pink" />}>mail</SidebarLink>
                 <SidebarLink to="/about-us/contacts/phone" icon={<Phone className="w-5 h-5 text-accent-pink" />}>phone</SidebarLink>
            </CollapsibleSection>
        </CollapsibleSection>
    );

    const renderPortfolioSidebar = () => (
        <CollapsibleSection title="_portfolio" icon={<Folder className="w-5 h-5 mr-2 text-accent-orange" />}>
            <SidebarLink to="/portfolio/our-templates" icon={<FileCode className="w-5 h-5 text-accent-pink" />}>Our-Templates</SidebarLink>
            <SidebarLink to="/portfolio/completed-menu" icon={<FileCode className="w-5 h-5 text-accent-pink" />}>Completed-Menu</SidebarLink>
        </CollapsibleSection>
    );

    const renderContactSidebar = () => (
        <CollapsibleSection title="_contact-us" icon={<Folder className="w-5 h-5 mr-2 text-accent-orange" />}>
             <SidebarLink to="/contact/get_in_touch" icon={<Send className="w-5 h-5 text-accent-pink" />}>get_in_touch</SidebarLink>
             <SidebarLink to="/contact/contact_now" icon={<Mail className="w-5 h-5 text-accent-pink" />}>contact_now</SidebarLink>
        </CollapsibleSection>
    );

    return (
        <aside className="fixed top-16 left-0 w-72 h-[calc(100vh-6.5rem)] bg-bg-primary/30 backdrop-blur-sm border-r border-border-primary p-4 hidden md:block text-sm">
            <nav>
                <ul>
                    {activeSection === 'about-us' && renderAboutSidebar()}
                    {activeSection === 'portfolio' && renderPortfolioSidebar()}
                    {activeSection === 'contact' && renderContactSidebar()}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;