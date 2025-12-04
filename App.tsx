import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Gate from './components/Gate';
import LegacySection from './components/LegacySection';
import ResortSection from './components/ResortSection';
import FinancialSection from './components/FinancialSection';
import TeamSection from './components/TeamSection';
import DataRoom from './components/DataRoom';
import ROICalculator from './components/ROICalculator';
import TimelineSection from './components/TimelineSection';
import ContactCTA from './components/ContactCTA';
import LocationSection from './components/LocationSection';
import HuntingFishingSection from './components/HuntingFishingSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import { ChevronDown } from 'lucide-react';
import { initGA, logPageView } from './lib/analytics';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  // Check if accessing admin panel
  const isAdminRoute = searchParams.get('admin') === 'true';

  if (isAdminRoute) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-stone-950">
      {isLocked ? (
        <Gate onUnlock={handleUnlock} />
      ) : (
        <main>
          <LegacySection />

          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-stone-950 to-transparent pointer-events-none z-10"></div>
          </div>

          <LocationSection />
          <HuntingFishingSection />
          <CaseStudiesSection />
          <ResortSection />
          <FinancialSection />
          <TimelineSection />
          <ROICalculator />
          <TeamSection />
          <DataRoom />

          <section className="py-24 px-6 bg-stone-950 text-center">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              Ready to Learn More?
            </h2>
            <p className="text-xl text-stone-400 mb-8 max-w-2xl mx-auto">
              Schedule a call to discuss this opportunity in detail.
            </p>
            <ChevronDown className="mx-auto text-bayou-gold animate-bounce" size={32} />
          </section>

          <ContactCTA />
        </main>
      )}
    </div>
  );
};

export default App;