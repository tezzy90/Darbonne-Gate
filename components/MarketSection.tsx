import React from 'react';
import { Target, Anchor, TrendingUp } from 'lucide-react';

const MarketSection: React.FC = () => {
  return (
    <section className="py-0 bg-stone-900">
      <div className="flex flex-col md:flex-row">
        
        {/* Hunter Side */}
        <div className="md:w-1/2 relative group min-h-[600px] flex items-center justify-center overflow-hidden border-r border-stone-800">
          <div className="absolute inset-0 z-0">
             <img src="https://picsum.photos/800/1200?grayscale" alt="Hunting Background" className="w-full h-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"/>
             <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 to-stone-900/40"></div>
          </div>
          
          <div className="relative z-10 p-12 max-w-lg">
            <div className="flex items-center gap-3 mb-6 text-bayou-gold">
                <Target size={32} />
                <span className="uppercase tracking-widest font-bold text-sm">The Hunter</span>
            </div>
            <h3 className="font-display text-4xl text-white mb-6">1,100 Acres of Exclusive Access</h3>
            <p className="text-stone-300 mb-6 text-lg leading-relaxed">
              Partnered with <strong className="text-white">Choudrant Creek Outfitters LLC</strong>.
              While competitors offer parking, we offer a <span className="italic text-bayou-gold">hunting lease</span>. 
              Proximity to D'Arbonne National Wildlife Refuge (3 miles away) positions us as the premier basecamp for deer and waterfowl seasons.
            </p>
            <div className="inline-block border border-stone-600 px-4 py-2 rounded text-stone-400 text-sm">
                Peak Season: Nov - Jan
            </div>
          </div>
        </div>

        {/* Angler Side */}
        <div className="md:w-1/2 relative group min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img src="https://picsum.photos/801/1200?grayscale" alt="Fishing Background" className="w-full h-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"/>
             <div className="absolute inset-0 bg-gradient-to-l from-stone-900/90 to-stone-900/40"></div>
          </div>
          
          <div className="relative z-10 p-12 max-w-lg text-right md:text-left">
             <div className="flex items-center gap-3 mb-6 text-emerald-500 justify-end md:justify-start">
                <Anchor size={32} />
                <span className="uppercase tracking-widest font-bold text-sm">The Angler</span>
            </div>
            <h3 className="font-display text-4xl text-white mb-6">The Untapped Tournament Economy</h3>
            <p className="text-stone-300 mb-6 text-lg leading-relaxed">
              Union Parish is a world-class crappie fishing destination, yet high-net-worth anglers lack premium amenities. 
              <br/><br/>
              <strong className="text-emerald-400">The Pain Point:</strong> Anglers with $50k+ boats are currently forced into primitive state parks without security or full hookups.
              <br/>
              <strong className="text-emerald-400">The Solution:</strong> D'Arbonne Gate provides secure boat parking, charging stations, and luxury slips just 5 miles from the lake.
            </p>
            <div className="inline-block border border-emerald-900/50 bg-emerald-900/20 px-4 py-2 rounded text-emerald-400 text-sm">
                Peak Season: Feb - Oct
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Banner */}
      <div className="bg-bayou-gold text-bayou-dark py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <TrendingUp size={48} className="text-bayou-accent" />
                <div>
                    <h4 className="font-display text-2xl font-bold text-bayou-accent">Counter-Cyclical Occupancy</h4>
                    <p className="font-serif font-bold">Hunting (Winter) + Fishing (Spring/Summer/Fall) = Year-Round Revenue</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-3xl font-bold font-display">12.4%</p>
                <p className="text-sm font-bold uppercase tracking-wider text-bayou-accent">Annual Regional Growth</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MarketSection;