import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, MessageSquare, Send } from 'lucide-react';

export default function PhoneQuickBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden pb-safe">
      <div className="bg-[#0e0e16]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2.5 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.7)]">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* Quick Call */}
          <a
            href={`tel:${COMPANY_INFO.contact.phone}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/[0.04] active:bg-[#6A00FF]/20 border border-white/10 active:border-[#6A00FF]/50 text-white transition-all"
            aria-label="Direct Phone Call"
          >
            <div className="w-7 h-7 rounded-full bg-[#6A00FF]/20 flex items-center justify-center mb-1 text-[#b992ff]">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold tracking-tight">Call Now</span>
          </a>

          {/* Quick WhatsApp */}
          <a
            href={COMPANY_INFO.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-500/[0.08] active:bg-emerald-500/20 border border-emerald-500/25 active:border-emerald-500/50 text-white transition-all"
            aria-label="Chat on WhatsApp"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center mb-1 text-emerald-400">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold tracking-tight text-emerald-300">WhatsApp</span>
          </a>

          {/* Quick Inquire */}
          <Link
            to="/contact"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-br from-[#6A00FF] to-[#8B3DFF] active:from-[#5800d4] active:to-[#7828e0] text-white shadow-md shadow-[#6A00FF]/30 transition-all"
            aria-label="Request Software Quote"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center mb-1 text-white">
              <Send className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-extrabold tracking-tight">Get Quote</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
