import React from 'react';
import { Quote } from 'lucide-react';
import { OWNER_LETTER } from '../constants';

const LegacySection: React.FC = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-stone-900 text-stone-200 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Text Content */}
          <div className="md:w-3/5 space-y-8">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-bayou-gold"></div>
                <span className="text-bayou-gold uppercase tracking-[0.2em] text-sm">The Vision</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              Building Generational <span className="text-bayou-gold">Wealth</span> on Louisiana Soil
            </h2>

            <div className="relative pl-8 border-l-2 border-stone-700">
              <Quote className="absolute -left-3 -top-4 w-8 h-8 text-bayou-gold bg-stone-900 p-1" />
              <p className="font-serif text-lg md:text-xl leading-relaxed text-stone-300 italic">
                {OWNER_LETTER}
              </p>
            </div>

            <div className="pt-6">
              <p className="font-display text-2xl text-white">Cortez Fields</p>
              <p className="text-stone-500 uppercase tracking-wider text-sm mt-1">Managing Member, Akerfields LLC</p>
            </div>
          </div>

          {/* Image Side */}
          <div className="md:w-2/5 relative group">
            <div className="absolute -inset-4 border border-bayou-gold/30 translate-x-4 translate-y-4 z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <img 
              src="/owner_atv.jpg" 
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/600/800?grayscale";
              }}
              alt="Cortez Fields on ATV" 
              className="relative z-10 w-full h-[500px] object-cover shadow-2xl filter grayscale contrast-125 brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700 ease-in-out rounded-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 z-20 pointer-events-none">
               <p className="text-white font-serif italic text-sm opacity-90">"Safeguarded assets with 20% down."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;