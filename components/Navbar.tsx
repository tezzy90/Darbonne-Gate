import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { name: 'Vision', id: 'legacy' },
        { name: 'Market', id: 'market' },
        { name: 'Resort Map', id: 'map' },
        { name: 'Financials', id: 'financials' },
        { name: 'Timeline', id: 'timeline' },
        { name: 'Team', id: 'team' },
        { name: 'Data Room', id: 'dataroom' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-950/90 backdrop-blur-md border-b border-stone-800 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div
                    className="font-display text-xl md:text-2xl text-white cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    D'ARBONNE <span className="text-bayou-gold">GATE</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.id)}
                            className="text-stone-300 hover:text-bayou-gold text-sm uppercase tracking-wider transition-colors"
                        >
                            {link.name}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollToSection('roi')}
                        className="bg-bayou-gold text-bayou-dark px-4 py-2 rounded font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors"
                    >
                        Calc ROI
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-stone-950 border-b border-stone-800 p-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.id)}
                            className="text-stone-300 hover:text-bayou-gold text-left text-sm uppercase tracking-wider"
                        >
                            {link.name}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollToSection('roi')}
                        className="bg-bayou-gold text-bayou-dark px-4 py-2 rounded font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors text-center"
                    >
                        Calculate ROI
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
