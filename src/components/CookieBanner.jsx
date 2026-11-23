import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('grocave_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('grocave_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('grocave_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-fadeIn">
      <div className="bg-[#12121b]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/80">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#6A00FF]/20 text-[#b992ff] flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-xs text-gray-300">
            <div className="font-bold text-white mb-1">Data Privacy & Essential Cookies</div>
            <p className="leading-relaxed mb-3">
              We respect your privacy under the Indian DPDP Act 2023. We utilize essential cookies to secure sessions and analyze telemetry. No advertising trackers are deployed.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="px-3.5 py-1.5 rounded-lg bg-[#6A00FF] hover:bg-[#5800d4] text-white text-[11px] font-bold transition-all shadow-md"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-medium transition-all"
              >
                Essential Only
              </button>
              <Link
                to="/privacy"
                onClick={() => setVisible(false)}
                className="text-[11px] text-[#b992ff] hover:underline ml-auto"
              >
                Read Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
