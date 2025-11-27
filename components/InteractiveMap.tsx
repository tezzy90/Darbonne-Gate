
import React, { useState } from 'react';
import { MapPin, Info } from 'lucide-react';

interface MapZone {
  id: string;
  name: string;
  description: string;
  stats: string;
}

const zones: Record<string, MapZone> = {
  entrance: {
    id: 'entrance',
    name: 'Main Entrance & Check-In',
    description: 'Secure gated entry at the intersection of Hwy 552 & 15. Features retail store and administrative office.',
    stats: 'Gated Access'
  },
  slips_phase1: {
    id: 'slips_phase1',
    name: 'Phase 1 RV Slips',
    description: '100 Premium slips with full sewer and 50/30 amp service. Landscaped for privacy.',
    stats: '100 Units'
  },
  slips_phase2: {
    id: 'slips_phase2',
    name: 'Phase 2 Expansion',
    description: '65 Additional slips to be developed upon Phase 1 validation. Closer proximity to the hunting lease access.',
    stats: '65 Units'
  },
  amenities: {
    id: 'amenities',
    name: 'Resort Center',
    description: 'The social hub featuring the 3,500 sq ft Pavilion, Resort Pool, Bathhouse, and Laundry facilities.',
    stats: 'Pavilion & Pool'
  },
  waterfront: {
    id: 'waterfront',
    name: 'Waterfront & Pond',
    description: '6-acre scenic pond fed by Choudrant Bayou. Features premium waterfront slips and fishing piers.',
    stats: '6 Acres'
  }
};

const InteractiveMap: React.FC = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const handleHover = (zoneId: string) => setActiveZone(zoneId);
  const handleLeave = () => setActiveZone(null);

  return (
    <div className="w-full bg-stone-900 rounded-lg overflow-hidden border border-stone-800 shadow-2xl flex flex-col lg:flex-row h-[600px] lg:h-[500px]">
      
      {/* Map Visualization Side */}
      <div className="relative w-full lg:w-2/3 h-2/3 lg:h-full bg-[#151413] p-4 overflow-hidden group">
        
        {/* Map Legend/Overlay */}
        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur text-xs p-2 rounded border border-white/10 text-stone-400">
          <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 bg-emerald-900/50 border border-emerald-500/50"></div> Phase 1</div>
          <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 bg-bayou-gold/20 border border-bayou-gold/50"></div> Phase 2</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cyan-900/40 border border-cyan-500/50"></div> Water</div>
        </div>

        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-full object-contain filter drop-shadow-lg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#292524" strokeWidth="0.5"/>
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Grid */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Highways */}
          {/* Hwy 15 (Diagonal NW to SE) */}
          <path d="M -50 500 L 300 -50" stroke="#44403c" strokeWidth="40" />
          <text x="20" y="450" fill="#78716c" fontSize="14" fontWeight="bold" transform="rotate(-58 20,450)">HWY 15</text>
          
          {/* Hwy 552 (Intersecting) */}
          <path d="M 200 650 L 500 -50" stroke="#44403c" strokeWidth="30" />
          <text x="350" y="550" fill="#78716c" fontSize="14" fontWeight="bold" transform="rotate(-66 350,550)">HWY 552</text>

          {/* Property Boundary (Roughly based on intersection description) */}
          <path 
            d="M 230 150 L 680 150 L 720 500 L 280 500 Z" 
            fill="#1c1917" 
            stroke="#d97706" 
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.8"
          />

          {/* Zone: Waterfront (Pond) */}
          <g 
            onMouseEnter={() => handleHover('waterfront')}
            onMouseLeave={handleLeave}
            className="cursor-pointer transition-all duration-300"
            style={{ opacity: activeZone === 'waterfront' || !activeZone ? 1 : 0.4 }}
          >
            <path 
              d="M 500 200 Q 650 220 620 350 Q 580 450 450 420 Q 400 380 420 280 Q 440 180 500 200 Z" 
              fill="#083344" 
              stroke="#06b6d4" 
              strokeWidth={activeZone === 'waterfront' ? 3 : 1}
              className="transition-all duration-300"
            />
            <text x="500" y="320" fill="#06b6d4" fontSize="16" fontWeight="bold" textAnchor="middle" opacity="0.7">6-ACRE POND</text>
          </g>

          {/* Zone: Phase 1 RV Slips (Left/Center) */}
          <g 
            onMouseEnter={() => handleHover('slips_phase1')}
            onMouseLeave={handleLeave}
            className="cursor-pointer"
            style={{ opacity: activeZone === 'slips_phase1' || !activeZone ? 1 : 0.4 }}
          >
            {/* Rows of slips */}
            <rect x="260" y="180" width="140" height="280" fill="#022c22" stroke="#10b981" strokeWidth={activeZone === 'slips_phase1' ? 2 : 1} rx="4" />
            <path d="M 280 200 L 380 200 M 280 230 L 380 230 M 280 260 L 380 260 M 280 290 L 380 290 M 280 320 L 380 320 M 280 350 L 380 350 M 280 380 L 380 380 M 280 410 L 380 410" stroke="#065f46" strokeWidth="2" />
            <text x="330" y="300" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle" transform="rotate(-90 330,300)">PHASE 1 (100 SLIPS)</text>
          </g>

          {/* Zone: Phase 2 RV Slips (Right/Top) */}
          <g 
            onMouseEnter={() => handleHover('slips_phase2')}
            onMouseLeave={handleLeave}
            className="cursor-pointer"
            style={{ opacity: activeZone === 'slips_phase2' || !activeZone ? 1 : 0.4 }}
          >
            <rect x="440" y="180" width="200" height="80" fill="#2a1b06" stroke="#d97706" strokeWidth={activeZone === 'slips_phase2' ? 2 : 1} strokeDasharray="4,2" rx="4" />
             <path d="M 460 200 L 460 240 M 490 200 L 490 240 M 520 200 L 520 240 M 550 200 L 550 240 M 580 200 L 580 240 M 610 200 L 610 240" stroke="#78350f" strokeWidth="2" />
             <text x="540" y="225" fill="#d97706" fontSize="12" fontWeight="bold" textAnchor="middle">PHASE 2 (FUTURE)</text>
          </g>

          {/* Zone: Amenities (Center) */}
          <g 
            onMouseEnter={() => handleHover('amenities')}
            onMouseLeave={handleLeave}
            className="cursor-pointer"
            style={{ opacity: activeZone === 'amenities' || !activeZone ? 1 : 0.4 }}
          >
            {/* Pavilion */}
            <rect x="410" y="280" width="60" height="40" fill="#1c1917" stroke="#f5f5f4" strokeWidth={activeZone === 'amenities' ? 2 : 1} />
            {/* Pool */}
            <rect x="410" y="330" width="40" height="60" fill="#0e7490" stroke="#22d3ee" strokeWidth={activeZone === 'amenities' ? 2 : 1} rx="4" />
            <circle cx="430" cy="360" r="10" fill="#083344" />
            
            <text x="440" y="305" fill="#f5f5f4" fontSize="10" textAnchor="middle">PAVILION</text>
            <text x="465" y="365" fill="#22d3ee" fontSize="10" textAnchor="middle" transform="rotate(90 465,365)">POOL</text>
          </g>

          {/* Zone: Entrance */}
          <g 
            onMouseEnter={() => handleHover('entrance')}
            onMouseLeave={handleLeave}
            className="cursor-pointer"
            style={{ opacity: activeZone === 'entrance' || !activeZone ? 1 : 0.4 }}
          >
            <circle cx="280" cy="500" r="15" fill="#78350f" stroke="#d97706" strokeWidth={activeZone === 'entrance' ? 2 : 1} />
            <MapPin x="268" y="488" size={24} className="text-white" />
          </g>

        </svg>

        {/* Instructions */}
        <div className="absolute bottom-4 right-4 text-stone-500 text-xs flex items-center gap-2">
            <Info size={14} />
            <span>Hover over zones for details</span>
        </div>
      </div>

      {/* Info Panel Side */}
      <div className="w-full lg:w-1/3 bg-stone-950 p-8 border-t lg:border-t-0 lg:border-l border-stone-800 flex flex-col justify-center relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
         
         {activeZone ? (
             <div className="animate-fadeIn">
                 <div className="text-bayou-gold uppercase tracking-widest text-xs font-bold mb-2">Zone Details</div>
                 <h3 className="font-display text-3xl text-white mb-4">{zones[activeZone].name}</h3>
                 <p className="font-serif text-stone-400 italic mb-6 leading-relaxed">
                     {zones[activeZone].description}
                 </p>
                 <div className="border-t border-stone-800 pt-4">
                     <p className="text-stone-500 text-xs uppercase mb-1">Key Spec</p>
                     <p className="text-xl text-emerald-500 font-bold">{zones[activeZone].stats}</p>
                 </div>
             </div>
         ) : (
             <div className="text-center opacity-40">
                 <MapPin size={48} className="mx-auto mb-4 text-stone-600" />
                 <h3 className="font-display text-2xl text-stone-500 mb-2">Explore the Resort</h3>
                 <p className="text-stone-600">Hover over the site plan to view infrastructure details.</p>
             </div>
         )}
      </div>
    </div>
  );
};

export default InteractiveMap;
