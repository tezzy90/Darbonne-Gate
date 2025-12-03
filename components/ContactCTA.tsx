import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Calendar, Mail } from 'lucide-react';
import { CALENDLY_URL } from '../constants';

const ContactCTA: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [calendlyLoaded, setCalendlyLoaded] = useState(false);

    useEffect(() => {
        // Load Calendly widget script
        if (!document.getElementById('calendly-script')) {
            const script = document.createElement('script');
            script.id = 'calendly-script';
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            script.onload = () => setCalendlyLoaded(true);
            document.body.appendChild(script);
        } else {
            setCalendlyLoaded(true);
        }
    }, []);

    const openCalendly = () => {
        if (calendlyLoaded && (window as any).Calendly) {
            (window as any).Calendly.initPopupWidget({ url: CALENDLY_URL });
        } else {
            // Fallback to opening in new tab
            window.open(CALENDLY_URL, '_blank');
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-40 bg-bayou-gold text-bayou-dark p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white/10 ${isOpen ? 'scale-0' : 'scale-100'}`}
                aria-label="Contact us"
            >
                <MessageSquare size={24} fill="currentColor" />
            </button>

            {/* Modal/Panel */}
            <div
                className={`fixed bottom-8 right-8 z-50 w-96 bg-stone-950 border border-stone-800 rounded-xl shadow-2xl transform transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="p-4 border-b border-stone-800 flex justify-between items-center bg-gradient-to-r from-bayou-gold/20 to-stone-900 rounded-t-xl">
                    <h3 className="font-display text-white text-lg">Connect with Us</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-stone-500 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-stone-300 text-sm leading-relaxed">
                        Ready to discuss the D'Arbonne Gate opportunity? Schedule a call with Cortez Fields, Managing Member.
                    </p>

                    <button
                        onClick={openCalendly}
                        className="flex items-center justify-center gap-2 w-full bg-bayou-gold text-bayou-dark font-bold py-3 px-4 rounded hover:bg-white transition-colors shadow-lg"
                    >
                        <Calendar size={18} />
                        Schedule Investor Briefing
                    </button>

                    <a
                        href="mailto:invest@darbonnegate.com?subject=D'Arbonne Gate Investment Inquiry"
                        className="flex items-center justify-center gap-2 w-full bg-stone-800 text-stone-300 font-bold py-3 px-4 rounded hover:bg-stone-700 transition-colors border border-stone-700"
                    >
                        <Mail size={18} />
                        Email Inquiry
                    </a>

                    <div className="pt-4 border-t border-stone-800 text-center space-y-2">
                        <p className="text-xs text-stone-500 uppercase tracking-wider">Direct Contact</p>
                        <p className="text-sm text-stone-400">
                            <a href="mailto:invest@darbonnegate.com" className="hover:text-bayou-gold transition-colors">
                                invest@darbonnegate.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactCTA;
