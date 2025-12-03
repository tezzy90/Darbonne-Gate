import React, { useState, useEffect } from 'react';
import Gate from './components/Gate';
import LegacySection from './components/LegacySection';
import ResortSection from './components/ResortSection';
import MarketSection from './components/MarketSection';
import FinancialSection from './components/FinancialSection';
import DataRoom from './components/DataRoom';
import Navbar from './components/Navbar';
import TeamSection from './components/TeamSection';
import TimelineSection from './components/TimelineSection';
import ROICalculator from './components/ROICalculator';
import ContactCTA from './components/ContactCTA';
import LocationSection from './components/LocationSection';
import HuntingFishingSection from './components/HuntingFishingSection';
import { ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleUnlock = () => {
    setIsLocked(false);
    // Small delay to allow unmount animation if we were using Framer Motion fully,
    // but here it triggers the layout change.
    setTimeout(() => setShowContent(true), 100);
  };

  // Prevent scrolling when locked
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLocked]);

  return (
    <div className="min-h-screen bg-bayou-dark text-bayou-cream selection:bg-bayou-gold selection:text-bayou-dark">
      {isLocked && <Gate onUnlock={handleUnlock} />}

      {showContent && (
        <main className="animate-fade-in-up">
          <Navbar />

          {/* Hero Section */}
          <header className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              {/* Parallax effect simulated with fixed attachment if supported, or absolute */}
              <img
                src="https://picsum.photos/1920/1080?grayscale&blur=1"
                alt="D'Arbonne Landscape"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/20 to-stone-900"></div>
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-in">
              <p className="text-bayou-gold font-serif italic text-xl mb-4 tracking-widest">Welcome to</p>
              <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
                D'ARBONNE GATE<br />
                <span className="text-2xl md:text-3xl tracking-[0.3em] text-stone-300 block mt-4 font-sans font-light">RV RESORT</span>
              </h1>
              <div className="h-1 w-24 bg-bayou-gold mx-auto mb-8"></div>
              <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
                Where the Bayou meets luxury. A 47-acre themed adventure destination serving the modern hunter and angler.
              </p>
            </div>

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce text-stone-500">
              <ChevronDown size={32} />
            </div>
          </header>

          <div id="legacy">
            <LegacySection />
          </div>
          <div id="market">
            <MarketSection />
          </div>

          {/* New sections for Day 1-2 */}
          <LocationSection />
          <HuntingFishingSection />

          <div id="map">
            <ResortSection />
          </div>
          <div id="financials">
            <FinancialSection />
          </div>

          <ROICalculator />
          <TimelineSection />
          <TeamSection />

          <div id="dataroom">
            <DataRoom />
          </div>

          <ContactCTA />
        </main>
      )}

      <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
        }
        .animate-fade-in {
            animation: fadeIn 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;