
import React from 'react';
import { Home, Waves, Utensils, Dog, CheckCircle } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

const amenities = [
  {
    title: "165 Premier RV Slips",
    desc: "Full sewer/utility infrastructure on spacious pads designed for modern luxury rigs.",
    icon: <Home className="w-8 h-8 text-bayou-gold" />
  },
  {
    title: "Event Pavilion",
    desc: "3,500 sq ft covered space for tournaments, gatherings, and community events.",
    icon: <Utensils className="w-8 h-8 text-bayou-gold" />
  },
  {
    title: "Resort Pool",
    desc: "A premium relaxation zone separating D'Arbonne Gate from primitive state parks.",
    icon: <Waves className="w-8 h-8 text-bayou-gold" />
  },
  {
    title: "Dog Run & Retail",
    desc: "Pet-friendly enclosed areas and on-site retail for essential gear and supplies.",
    icon: <Dog className="w-8 h-8 text-bayou-gold" />
  }
];

const ResortSection: React.FC = () => {
  return (
    <section className="py-24 bg-stone-950 text-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl mb-4">The Resort Experience</h2>
          <p className="text-stone-400 text-lg">
            Transforming 47 acres in Downsville, LA into a destination. With a <span className="text-bayou-gold">$6.1M development budget</span>, 
            we are building the only Mid-Level Premium resort in the region.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {amenities.map((item, idx) => (
            <div key={idx} className="bg-stone-900 p-8 border border-stone-800 hover:border-bayou-gold/50 transition-colors group">
              <div className="mb-6 p-4 bg-stone-950 inline-block rounded-full group-hover:text-bayou-gold transition-colors">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl text-white mb-3">{item.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Map Feature Section */}
        <div className="bg-emerald-950/10 border border-stone-800 p-4 md:p-8 rounded-sm">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 px-4">
             <div>
                <h3 className="font-display text-2xl text-emerald-500 mb-2">Master Plan & Site Layout</h3>
                <p className="text-stone-400 max-w-xl text-sm">
                    Strategic layout optimizing waterfront views and accessibility. 
                    Located at the intersection of Hwy 15 & 552.
                </p>
             </div>
             <div className="flex gap-4 mt-4 md:mt-0 text-xs text-stone-500 uppercase tracking-widest">
                 <div className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-600" /> 30 Usable Acres</div>
                 <div className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-600" /> Phased Rollout</div>
             </div>
          </div>
          
          <InteractiveMap />
        </div>

      </div>
    </section>
  );
};

export default ResortSection;
