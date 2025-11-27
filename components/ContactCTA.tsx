import React, { useState } from 'react';
import { MessageSquare, X, Calendar, Phone } from 'lucide-react';

const ContactCTA: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-40 bg-bayou-gold text-bayou-dark p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white/10 ${isOpen ? 'scale-0' : 'scale-100'}`}
            >
                <MessageSquare size={24} fill="currentColor" />
            </button>

            {/* Modal/Panel */}
            <div
                className={`fixed bottom-8 right-8 z-50 w-80 bg-stone-950 border border-stone-800 rounded-xl shadow-2xl transform transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="p-4 border-b border-stone-800 flex justify-between items-center bg-stone-900 rounded-t-xl">
                    <h3 className="font-display text-white">Invest in D'Arbonne</h3>
                    <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-stone-400 text-sm">
                        Ready to discuss the opportunity? Schedule a call with the Managing Member.
                    </p>

                    <a
                        href="#"
                        className="flex items-center justify-center gap-2 w-full bg-bayou-gold text-bayou-dark font-bold py-3 rounded hover:bg-white transition-colors"
                    >
                        <Calendar size={18} />
                        Schedule Briefing
                    </a>

                    <a
                        href="mailto:invest@darbonnegate.com"
                        className="flex items-center justify-center gap-2 w-full bg-stone-800 text-stone-300 font-bold py-3 rounded hover:bg-stone-700 transition-colors border border-stone-700"
                    >
                        <MessageSquare size={18} />
                        Email Inquiry
                    </a>

                    <div className="text-center pt-2">
                        <p className="text-xs text-stone-600">Direct Line: (318) 555-0123</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactCTA;
