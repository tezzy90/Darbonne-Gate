import React, { useState } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { PASSWORD } from '../constants';

interface GateProps {
  onUnlock: () => void;
}

const Gate: React.FC<GateProps> = ({ onUnlock }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setIsFading(true);
      setTimeout(onUnlock, 1000); // Wait for animation
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out bg-bayou-dark ${isFading ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
    >
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 filter grayscale-[0.2] contrast-125 brightness-75 scale-105"
        >
          {/* Simulated video asset: Bayou at dusk. In production, this would be the custom generated scene. */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-lake-water-surface-in-the-sunset-light-33054-large.mp4" type="video/mp4" />
          <img src="https://picsum.photos/1920/1080?grayscale&blur=2" alt="Background Fallback" className="w-full h-full object-cover" />
        </video>
        
        {/* Cinematic Gradients for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-bayou-dark via-transparent to-bayou-dark/80"></div>
        <div className="absolute inset-0 bg-bayou-dark/30 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-md w-full px-6 text-center">
        <div className="mb-8">
            {/* Logo Placeholder */}
            <div className="w-20 h-20 border-2 border-bayou-gold/80 rounded-full mx-auto flex items-center justify-center mb-6 backdrop-blur-sm bg-black/20">
                <span className="font-display text-3xl text-bayou-gold">DG</span>
            </div>
          <h1 className="font-display text-4xl md:text-5xl text-bayou-cream mb-2 tracking-wider drop-shadow-lg">
            D'ARBONNE GATE
          </h1>
          <p className="font-serif text-bayou-gold italic text-lg tracking-widest uppercase drop-shadow-md">
            The Legacy Project
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Access Code"
              className="w-full bg-bayou-dark/60 backdrop-blur-md border-b-2 border-stone-500 text-center text-xl py-3 px-4 text-white focus:outline-none focus:border-bayou-gold transition-all placeholder-stone-400 font-serif rounded-t-sm group-hover:bg-bayou-dark/70"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
          </div>

          {error && (
            <div className="text-red-400 text-sm flex items-center justify-center gap-2 animate-pulse bg-red-900/20 py-2 rounded">
              <AlertCircle size={16} />
              <span>Invalid Credentials</span>
            </div>
          )}

          <button
            type="submit"
            className="group w-full bg-bayou-gold/20 hover:bg-bayou-gold text-bayou-gold hover:text-bayou-dark border border-bayou-gold py-3 px-6 rounded uppercase tracking-widest text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            Access Investor Deck
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-stone-400 text-xs mt-8 font-light tracking-wide">
            CONFIDENTIAL: FOR AUTHORIZED PARTNERS ONLY
          </p>
        </form>
      </div>
    </div>
  );
};

export default Gate;