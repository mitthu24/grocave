import React from 'react';
import GrocaveLogo from './GrocaveLogo';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUp, 
  Building,
  CheckCircle2
} from 'lucide-react';

export default function Footer({ onNavClick, onOpenLegal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080C] text-gray-400 border-t border-white/10 pt-16 pb-24 sm:pb-12 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <button 
              onClick={() => { onNavClick('home'); scrollToTop(); }}
              className="text-left focus:outline-none"
            >
              <GrocaveLogo size="md" />
            </button>
            
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-md">
              {COMPANY_INFO.subTagline} We engineer custom business and problem-solving software, cloud SaaS platforms, and enterprise automated workflows designed for stability and scale.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 max-w-md">
              <div className="flex items-center gap-2 text-white font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Govt. Registered Enterprise</span>
              </div>
              <div className="text-[11px] text-gray-400">
                Constitution: <strong className="text-white">{COMPANY_INFO.constitution}</strong>
              </div>
              <div className="text-[11px] text-gray-400">
                GSTIN: <strong className="text-emerald-400 font-mono">{COMPANY_INFO.gstin}</strong>
              </div>
            </div>
          </div>

          {/* Quick Solutions */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-white">Solutions</div>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavClick('solutions')} 
                  className="hover:text-white transition-colors"
                >
                  Custom Software
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('solutions')} 
                  className="hover:text-white transition-colors"
                >
                  Cloud SaaS Platforms
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('solutions')} 
                  className="hover:text-white transition-colors"
                >
                  ERP & Inventory Sync
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('solutions')} 
                  className="hover:text-white transition-colors"
                >
                  AI Process Automation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('solutions')} 
                  className="hover:text-white transition-colors"
                >
                  Mobile & Web Systems
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies (Direct Footer Links to Separate Dedicated Pages) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6A00FF]" />
              <span>Legal & Policies</span>
            </div>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onOpenLegal('privacy')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegal('terms')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegal('refund')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Refund & Cancellation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegal('delivery')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegal('grievance')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Contact & Grievance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegal('disclaimer')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Disclaimer & IP Notice
                </button>
              </li>
            </ul>
          </div>

          {/* Business Address Contact */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-white">Business Address</div>
            <div className="space-y-2.5 text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#a855f7] flex-shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  {COMPANY_INFO.businessAddress.full}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#a855f7] flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.contact.phone}`} className="hover:text-white font-semibold">
                  {COMPANY_INFO.contact.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#a855f7] flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="hover:text-white truncate">
                  {COMPANY_INFO.contact.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Statutory Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} <strong className="text-gray-300">GROCAVE</strong>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>GSTIN: <strong className="text-gray-400 font-mono">{COMPANY_INFO.gstin}</strong></span>
            <span>•</span>
            <span className="text-[#a855f7] font-semibold">BUILD • GROW • THRIVE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
