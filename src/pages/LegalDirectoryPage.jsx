import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyData';
import { 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  Truck, 
  Scale, 
  AlertCircle, 
  ArrowRight, 
  Building, 
  MapPin, 
  Phone, 
  Mail,
  ArrowLeft,
  Trash2
} from 'lucide-react';

export default function LegalDirectoryPage() {
  const policies = [
    {
      path: "/privacy",
      title: "Privacy Policy",
      badge: "DPDP Act 2023 Compliant",
      desc: "Information collection, data security safeguards, 256-bit TLS/AES encryption, non-sale commitment, and statutory user rights under Indian data protection law.",
      icon: ShieldCheck,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      path: "/data-deletion",
      title: "User Data Deletion Instructions",
      badge: "Meta & WhatsApp Cloud API",
      desc: "Official instructions, in-chat WhatsApp commands, retention policies, and self-service deletion request portal required by Meta Platform Terms & Indian DPDP Act 2023.",
      icon: Trash2,
      color: "text-rose-400",
      bg: "bg-rose-500/10"
    },
    {
      path: "/terms",
      title: "Terms and Conditions",
      badge: "Master Services Agreement",
      desc: "Binding software development contract, intellectual property ownership assignment, warranties, liability caps, and exclusive Darbhanga jurisdiction.",
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      path: "/refund",
      title: "Refund & Cancellation Policy",
      badge: "Commercial Terms",
      desc: "Milestone-aligned development billing, SaaS recurring license cancellation terms, non-refundable expenses, and formal refund processing procedures.",
      icon: RotateCcw,
      color: "text-amber-400",
      bg: "bg-amber-500/10"
    },
    {
      path: "/delivery",
      title: "Shipping & Digital Delivery Policy",
      badge: "Electronic Delivery SLA",
      desc: "100% digital fulfillment protocols, source code GitHub repository handovers, cloud deployment SLAs, and User Acceptance Testing (UAT) windows.",
      icon: Truck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      path: "/grievance",
      title: "Contact Us & Grievance Redressal",
      badge: "Statutory IT Rules Disclosure",
      desc: "Direct contact details for the designated Grievance Officer, escalation timelines, 24-48 business hours acknowledgement SLA, and grievance tracking.",
      icon: Scale,
      color: "text-rose-400",
      bg: "bg-rose-500/10"
    },
    {
      path: "/disclaimer",
      title: "Disclaimer & Intellectual Property",
      badge: "Trademarks & Disclaimers",
      desc: "Protection of GROCAVE marks, proprietary software assets, third-party trademarks, and advisory disclaimer boundaries.",
      icon: AlertCircle,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    }
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#0B0B0F] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-[#6A00FF] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#a855f7] font-semibold">Legal & Policies</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6A00FF]/15 border border-[#6A00FF]/30 text-[#b992ff] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Statutory Compliance & Policy Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Legal & Policy Center
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            Explore dedicated statutory policies governing our software services, client data protection, electronic delivery SLAs, and grievance redressal mechanisms.
          </p>
        </div>

        {/* Business Credentials Badge Card */}
        <div className="rounded-2xl bg-[#141420] border border-white/10 p-5 sm:p-6 mb-10 shadow-xl">
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

        {/* Grid of Dedicated Policy Pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy, idx) => {
            const Icon = policy.icon;
            return (
              <Link
                key={idx}
                to={policy.path}
                className="group p-6 rounded-2xl bg-[#12121b] border border-white/10 hover:border-[#6A00FF]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#6A00FF]/15 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${policy.bg} ${policy.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300">
                      {policy.badge}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors mb-2">
                    {policy.title}
                  </h2>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {policy.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#b992ff] group-hover:text-white transition-colors">
                  <span>View Dedicated Page ({policy.path})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
