import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

interface ContactProps {
    onSectionChange: (section: string) => void;
}

const GetInTouch: React.FC = () => {
    // --- FORMSPREE SETUP ---
    // 1. Go to formspree.io and create a new form.
    // 2. Replace the placeholder URL below with your own Formspree endpoint URL.
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your_unique_form_id';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setFormData({ name: '', email: '', message: '' }); // Clear form
            } else {
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmissionStatus('error');
        }
    };

    return (
        <div className="p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Get In Touch</h2>
            <p className="text-text-secondary mb-8">Have a question or a project in mind? Fill out the form below and we'll get back to you as soon as possible.</p>
            <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary">_name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full bg-bg-primary/50 border border-border-primary rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-accent-orange focus:border-accent-orange" 
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary">_email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full bg-bg-primary/50 border border-border-primary rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-accent-orange focus:border-accent-orange" 
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary">_message:</label>
                    <textarea 
                        id="message" 
                        rows={4} 
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full bg-bg-primary/50 border border-border-primary rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-accent-orange focus:border-accent-orange"
                    ></textarea>
                </div>
                <div>
                    <button 
                        type="submit" 
                        className="bg-text-secondary text-text-primary px-6 py-3 rounded-md hover:bg-accent-orange hover:text-bg-primary transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={submissionStatus === 'submitting'}
                    >
                        {submissionStatus === 'submitting' ? 'submitting...' : 'submit-message'}
                    </button>
                </div>
                {submissionStatus === 'success' && (
                    <p className="text-accent-teal">Thank you! Your message has been sent successfully.</p>
                )}
                {submissionStatus === 'error' && (
                    <p className="text-accent-pink">Something went wrong. Please try again or contact us directly.</p>
                )}
            </form>
        </div>
    );
};

const ContactNow: React.FC = () => (
    <div className="p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-text-primary mb-4">Contact Now</h2>
        <p className="text-text-secondary mb-8">For immediate inquiries, please use the contact details below.</p>
        <div className="space-y-4 text-lg">
            <p><strong className="text-accent-orange">Email:</strong> <a href="mailto:contact@menuwala.com" className="text-accent-teal hover:underline">contact@menuwala.com</a></p>
            <p><strong className="text-accent-orange">Phone:</strong> <a href="tel:+911234567890" className="text-accent-teal hover:underline">+91 12345 67890</a></p>
        </div>
    </div>
);


const Contact: React.FC<ContactProps> = ({ onSectionChange }) => {
    useEffect(() => {
        onSectionChange('contact');
    }, [onSectionChange]);

    return (
        <div className="pt-8">
            <Routes>
                <Route path="/" element={<Navigate to="get_in_touch" replace />} />
                <Route path="get_in_touch" element={<GetInTouch />} />
                <Route path="contact_now" element={<ContactNow />} />
            </Routes>
        </div>
    );
};

export default Contact;