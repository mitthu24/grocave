import React, { useState, useEffect } from 'react';
import GrocaveLogo from './GrocaveLogo';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, openLegalDoc }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'problem-solving', label: 'Problem Solving' },
    { id: 'products', label: 'Proprietary Tech' },
    { id: 'about', label: 'About Us' },
    { id: 'legal', label: 'Legal & Policies' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLegal = (policyId) => {
    openLegalDoc(policyId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0B0B0F]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3' 
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A00FF] rounded-lg"
              aria-label="Grocave Home"
            >
              <GrocaveLogo size="md" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#12121A]/80 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    activeTab === link.id
                      ? 'bg-[#6A00FF] text-white shadow-md shadow-[#6A00FF]/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title="Call Grocave Support"
              >
                <Phone className="w-3.5 h-3.5 text-[#6A00FF]" />
                <span className="hidden md:inline">{COMPANY_INFO.contact.phoneFormatted}</span>
                <span className="md:hidden">Call</span>
              </a>

              <button
                onClick={() => handleNavClick('contact')}
                className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-[#6A00FF] to-[#8B3DFF] hover:from-[#5C00E6] hover:to-[#7A2CE6] px-4 py-2.5 rounded-lg shadow-md shadow-[#6A00FF]/25 hover:shadow-lg hover:shadow-[#6A00FF]/40 transition-all duration-200"
              >
                <span>Get Discovery Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-transform"
                aria-label="Call Us"
              >
                <Phone className="w-4 h-4 text-[#a855f7]" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-transform"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu - Phone First, Zero Overflow */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0B0F]/98 backdrop-blur-xl flex flex-col pt-20 pb-8 px-5 overflow-y-auto sm:hidden animate-fadeIn">
          {/* Header in menu */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#a855f7] font-bold">Menu Navigation</div>
              <div className="text-[11px] text-gray-400">GSTIN: {COMPANY_INFO.gstin}</div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Verified Enterprise
            </div>
          </div>

          {/* Primary Nav Links */}
          <div className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                  activeTab === link.id
                    ? 'bg-[#6A00FF] text-white shadow-md shadow-[#6A00FF]/30'
                    : 'text-gray-200 hover:bg-white/5 active:bg-white/10'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className={`w-4 h-4 ${activeTab === link.id ? 'text-white' : 'text-gray-500'}`} />
              </button>
            ))}
          </div>

          {/* Legal Quick Links Sub-Menu */}
          <div className="mt-2 pt-4 border-t border-white/10">
            <div className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6A00FF]" />
              <span>Legal Policies & Statutory Compliance</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => handleOpenLegal('privacy')}
                className="text-left text-xs text-gray-300 hover:text-white p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between"
              >
                <span>Privacy Policy</span>
                <ChevronRight className="w-3 h-3 text-gray-500" />
              </button>
              <button 
                onClick={() => handleOpenLegal('terms')}
                className="text-left text-xs text-gray-300 hover:text-white p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between"
              >
                <span>Terms of Service</span>
                <ChevronRight className="w-3 h-3 text-gray-500" />
              </button>
              <button 
                onClick={() => handleOpenLegal('refund')}
                className="text-left text-xs text-gray-300 hover:text-white p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between"
              >
                <span>Refund Policy</span>
                <ChevronRight className="w-3 h-3 text-gray-500" />
              </button>
              <button 
                onClick={() => handleOpenLegal('delivery')}
                className="text-left text-xs text-gray-300 hover:text-white p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between"
              >
                <span>Digital Delivery</span>
                <ChevronRight className="w-3 h-3 text-gray-500" />
              </button>
              <button 
                onClick={() => handleOpenLegal('grievance')}
                className="text-left text-xs text-gray-300 hover:text-white p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between col-span-2"
              >
                <span>Grievance Officer Redressal</span>
                <ChevronRight className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Quick Contact Box on Mobile */}
          <div className="mt-auto pt-6 flex flex-col gap-2.5">
            <a
              href={`tel:${COMPANY_INFO.contact.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm active:bg-white/10"
            >
              <Phone className="w-4 h-4 text-[#a855f7]" />
              <span>Call: {COMPANY_INFO.contact.phoneFormatted}</span>
            </a>

            <a
              href={`mailto:${COMPANY_INFO.contact.email}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm active:bg-white/10"
            >
              <Mail className="w-4 h-4 text-[#a855f7]" />
              <span>{COMPANY_INFO.contact.email}</span>
            </a>

            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6A00FF] to-[#8B3DFF] text-white font-bold text-sm shadow-lg shadow-[#6A00FF]/40 active:scale-[0.99]"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
