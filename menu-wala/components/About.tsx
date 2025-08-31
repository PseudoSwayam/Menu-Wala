import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

interface AboutProps {
    onSectionChange: (section: string) => void;
}

const CodeBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="p-8 animate-fade-in w-full h-full border-r border-border-primary">
        <div className="text-text-secondary flex gap-4">
            <div className="text-right select-none">
                {Array.from({ length: 15 }).map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <pre className="whitespace-pre-wrap">
                <code>{children}</code>
            </pre>
        </div>
    </div>
);

const QrMenuService: React.FC = () => (
    <CodeBlock title="services / qr_based_menu">
        <span className="text-text-accent">/**</span>
        <br />
        <span className="text-text-accent"> * QR Based Menu System</span>
        <br />
        <span className="text-text-accent"> * A dynamic, touchless menu solution for modern restaurants.</span>
        <br />
        <span className="text-text-accent"> *</span>
        <br />
        <span className="text-text-accent"> * Features:</span>
        <br />
        <span className="text-text-accent"> * - Instant updates to menu items and pricing.</span>
        <br />
        <span className="text-text-accent"> * - Customizable branding to match your restaurant's aesthetic.</span>
        <br />
        <span className="text-text-accent"> * - Analytics on popular items and customer engagement.</span>
        <br />
        <span className="text-text-accent"> * - Multi-language support for diverse clientele.</span>
        <br />
        <span className="text-text-accent"> */</span>
    </CodeBlock>
);

const OrderingSystemService: React.FC = () => (
    <CodeBlock title="services / ordering_system">
        <span className="text-text-accent">/**</span>
        <br />
        <span className="text-text-accent"> * Integrated Ordering System</span>
        <br />
        <span className="text-text-accent"> * Streamline your operations from order to kitchen.</span>
        <br />
        <span className="text-text-accent"> *</span>
        <br />
        <span className="text-text-accent"> * Details:</span>
        <br />
        <span className="text-text-accent"> * - Seamless integration with existing POS systems.</span>
        <br />
        <span className="text-text-accent"> * - Real-time order tracking for customers and staff.</span>
        <br />
        <span className="text-text-accent"> * - Secure online payment gateway integration.</span>
        <br />
        <span className="text-text-accent"> * - 📱 Mobile-first and responsive design.</span>
        <br />
        <span className="text-text-accent"> */</span>
    </CodeBlock>
);

const MailContact: React.FC = () => (
    <CodeBlock title="contacts / mail">
        <span className="text-text-accent">/**</span>
        <br />
        <span className="text-text-accent"> * Contact Information</span>
        <br />
        <span className="text-text-accent"> * Preferred for professional inquiries.</span>
        <br />
        <span className="text-text-accent"> *</span>
        <br />
        <span className="text-text-accent"> * - Email: contact@menuwala.com</span>
        <br />
        <span className="text-text-accent"> * - Response time: 24-48 hours.</span>
        <br />
        <span className="text-text-accent"> * - Active for contact.</span>
        <br />
        <span className="text-text-accent"> */</span>
    </CodeBlock>
);

const PhoneContact: React.FC = () => (
    <CodeBlock title="contacts / phone">
        <span className="text-text-accent">/**</span>
        <br />
        <span className="text-text-accent"> * Contact Information</span>
        <br />
        <span className="text-text-accent"> * For direct phone inquiries.</span>
        <br />
        <span className="text-text-accent"> *</span>
        <br />
        <span className="text-text-accent"> * - Phone: +91 12345 67890</span>
        <br />
        <span className="text-text-accent"> * - Available during business hours.</span>
        <br />
        <span className="text-text-accent"> */</span>
    </CodeBlock>
);


const About: React.FC<AboutProps> = ({ onSectionChange }) => {
    useEffect(() => {
        onSectionChange('about-us');
    }, [onSectionChange]);

    return (
        <div className="pt-0">
            <Routes>
                <Route path="/" element={<Navigate to="services/qr_based_menu" replace />} />
                <Route path="services/qr_based_menu" element={<QrMenuService />} />
                <Route path="services/ordering_system" element={<OrderingSystemService />} />
                <Route path="contacts/mail" element={<MailContact />} />
                <Route path="contacts/phone" element={<PhoneContact />} />
            </Routes>
        </div>
    );
};

export default About;