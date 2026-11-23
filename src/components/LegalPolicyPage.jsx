import React, { useState } from 'react';
import { LEGAL_POLICIES } from '../data/legalPolicies';
import { COMPANY_INFO } from '../data/companyData';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Printer, 
  Copy, 
  Check, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Building,
  ChevronRight,
  FileText
} from 'lucide-react';

export default function LegalPolicyPage({ policyId, onBackToHome, onOpenContact }) {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const doc = LEGAL_POLICIES[policyId] || LEGAL_POLICIES.privacy;

  const handleCopy = () => {
    const textContent = `${doc.title}\n${doc.subtitle}\nLast Updated: ${doc.lastUpdated}\n\n` +
      doc.content.map(c => `${c.heading}\n${c.text || ''}\n${c.subsections ? c.subsections.map(s => `  ${s.title} ${s.detail}`).join('\n') : ''}`).join('\n\n');
    
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredContent = doc.content.filter(section => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const matchHeading = section.heading.toLowerCase().includes(term);
    const matchText = section.text ? section.text.toLowerCase().includes(term) : false;
    const matchSub = section.subsections ? section.subsections.some(s => s.title.toLowerCase().includes(term) || s.detail.toLowerCase().includes(term)) : false;
    return matchHeading || matchText || matchSub;
  });

  return (
    <div className="py-12 sm:py-20 bg-[#0B0B0F] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors group w-fit"
          >
            <ArrowLeft className="w-4 h-4 text-[#6A00FF] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="hover:text-white cursor-pointer" onClick={onBackToHome}>Home</span>
            <span>/</span>
            <span className="text-gray-500">Legal</span>
            <span>/</span>
            <span className="text-[#a855f7] font-semibold">{doc.title}</span>
          </div>
        </div>

        {/* Verified Business Credentials Header Card */}
        <div className="rounded-2xl bg-[#141420] border border-white/10 p-5 sm:p-6 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Verified Statutory Entity
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  Trade Name: {COMPANY_INFO.tradeName} ({COMPANY_INFO.constitution})
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300 w-fit">
              <span className="text-gray-400">GSTIN:</span>
              <strong className="text-emerald-400 select-all">{COMPANY_INFO.gstin}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-gray-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#a855f7] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-white block">Business Address:</strong>
                {COMPANY_INFO.businessAddress.full}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-[#a855f7] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-white block">Official Phone:</strong>
                <a href={`tel:${COMPANY_INFO.contact.phone}`} className="hover:text-white underline">
                  {COMPANY_INFO.contact.phoneFormatted}
                </a>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-[#a855f7] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-white block">Official Email:</strong>
                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="hover:text-white underline">
                  {COMPANY_INFO.contact.email}
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Dedicated Document Container */}
        <div className="rounded-2xl bg-[#111119] border border-white/10 p-5 sm:p-8 lg:p-10 shadow-2xl relative">
          
          {/* Header inside Document */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#6A00FF]/15 border border-[#6A00FF]/30 text-[#b992ff] text-[11px] font-mono tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GROCAVE STATUTORY POLICY</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{doc.title}</h1>
              <div className="text-xs text-gray-400 mt-1">
                {doc.subtitle} • <span className="text-gray-300">Effective: {doc.lastUpdated}</span>
              </div>
            </div>

            {/* Document utility actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors"
                title="Copy entire policy text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Quick In-Document Search */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search within ${doc.title}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF]"
            />
          </div>

          {/* Clauses */}
          <div className="space-y-8">
            {filteredContent.length > 0 ? (
              filteredContent.map((clause, idx) => (
                <div key={idx} className="border-b border-white/5 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#6A00FF] rounded-full inline-block flex-shrink-0" />
                    <span>{clause.heading}</span>
                  </h3>
                  
                  {clause.text && (
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line pl-3.5">
                      {clause.text}
                    </p>
                  )}

                  {clause.subsections && (
                    <div className="mt-4 space-y-3 pl-3.5">
                      {clause.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="rounded-xl bg-white/[0.02] border border-white/5 p-3.5">
                          <h4 className="text-xs font-bold text-[#b992ff] mb-1">{sub.title}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{sub.detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-400 text-sm">
                No matching clauses found for "{searchTerm}".
              </div>
            )}
          </div>

          {/* Bottom Grievance / Inquiries Footer */}
          <div className="mt-10 pt-6 border-t border-white/10 bg-[#161624] -mx-5 -mb-5 sm:-mx-8 sm:-mb-8 lg:-mx-10 lg:-mb-10 p-6 rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-white">Have legal inquiries or contract clarifications?</div>
              <div className="text-[11px] text-gray-400">
                Official Grievance Cell: {COMPANY_INFO.compliance.grievanceEmail} • Response SLA within 24-48 hours.
              </div>
            </div>
            <button
              onClick={onOpenContact}
              className="px-4 py-2.5 rounded-lg bg-[#6A00FF] hover:bg-[#5800d4] text-white text-xs font-bold shadow-md shadow-[#6A00FF]/30 transition-all flex items-center justify-center gap-2 flex-shrink-0"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
