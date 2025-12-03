import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, AlertCircle, Mail, CheckCircle } from 'lucide-react';
import { validateToken, saveSession, isAuthenticated } from '../lib/auth';

interface GateProps {
  onUnlock: () => void;
}

const Gate: React.FC<GateProps> = ({ onUnlock }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    // Check for bypass parameter (development/demo only)
    const urlParams = new URLSearchParams(window.location.search);
    const bypass = urlParams.get('bypass');

    if (bypass === 'true') {
      handleUnlock();
      return;
    }

    // Check if already authenticated via session
    const authenticated = await isAuthenticated();
    if (authenticated) {
      handleUnlock();
      return;
    }

    // Check for magic link token in URL
    const token = urlParams.get('token');

    if (token) {
      await handleMagicLinkToken(token);
    } else {
      setLoading(false);
    }
  };

  const handleMagicLinkToken = async (token: string) => {
    try {
      const { valid, email, investorName } = await validateToken(token);

      if (valid && email) {
        // Save session
        saveSession(token, email, investorName);

        // Show success message briefly
        setSuccess(`Welcome${investorName ? ', ' + investorName : ''}!`);

        // Remove token from URL
        window.history.replaceState({}, document.title, window.location.pathname);

        // Unlock after brief delay
        setTimeout(() => handleUnlock(), 1500);
      } else {
        setError('Invalid or expired access link. Please request a new one.');
        setLoading(false);
      }
    } catch (err) {
      setError('Authentication error. Please try again.');
      setLoading(false);
    }
  };

  const handleUnlock = () => {
    setIsFading(true);
    setTimeout(onUnlock, 1000);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bayou-dark">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-bayou-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-bayou-cream font-serif">Verifying access...</p>
        </div>
      </div>
    );
  }

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
          <source src="https://assets.mixkit.co/videos/preview/mixkit-lake-water-surface-in-the-sunset-light-33054-large.mp4" type="video/mp4" />
          <img src="https://picsum.photos/1920/1080?grayscale&blur=2" alt="Background Fallback" className="w-full h-full object-cover" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-bayou-dark via-transparent to-bayou-dark/80"></div>
        <div className="absolute inset-0 bg-bayou-dark/30 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-md w-full px-6 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 border-2 border-bayou-gold/80 rounded-full mx-auto flex items-center justify-center mb-6 backdrop-blur-sm bg-black/20">
            <span className="font-display text-3xl text-bayou-gold">DG</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-bayou-cream mb-2 tracking-wider drop-shadow-lg">
            D'ARBONNE GATE
          </h1>
          <p className="font-serif text-bayou-gold italic text-lg tracking-widest uppercase drop-shadow-md">
            Investor Portal
          </p>
        </div>

        {success ? (
          <div className="bg-emerald-900/30 border border-emerald-500/50 text-emerald-300 p-6 rounded backdrop-blur-sm animate-fadeIn">
            <CheckCircle className="w-12 h-12 mx-auto mb-3" />
            <p className="text-lg font-serif">{success}</p>
            <p className="text-sm text-emerald-400 mt-2">Redirecting to portal...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {error && (
              <div className="text-red-400 text-sm flex items-center justify-center gap-2 bg-red-900/30 border border-red-500/50 py-3 px-4 rounded backdrop-blur-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="bg-bayou-dark/60 backdrop-blur-md border border-stone-700 rounded-lg p-8">
              <Mail className="w-12 h-12 text-bayou-gold mx-auto mb-4" />
              <h2 className="text-xl text-bayou-cream font-serif mb-3">Access Required</h2>
              <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                This portal is for authorized investors only. If you've received an invitation email, click the access link provided.
              </p>

              <div className="border-t border-stone-700 pt-6 mt-6">
                <p className="text-stone-500 text-xs mb-3">Need access?</p>
                <a
                  href="mailto:invest@darbonnegate.com?subject=Investor Portal Access Request"
                  className="inline-flex items-center gap-2 text-bayou-gold hover:text-white transition-colors text-sm font-semibold"
                >
                  Request Invitation
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <p className="text-stone-400 text-xs mt-8 font-light tracking-wide">
              CONFIDENTIAL: FOR AUTHORIZED PARTNERS ONLY
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gate;