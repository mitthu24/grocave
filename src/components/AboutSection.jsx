import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import GrocaveLogo from './GrocaveLogo';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Code2, 
  Target, 
  Compass, 
  Building2, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export default function AboutSection({ onOpenContact }) {
  const values = [
    {
      title: "Problem-First Engineering",
      desc: "We never write code for the sake of complexity. We dissect the economic and operational problem first, then engineer the leanest, most reliable software architecture.",
      icon: Target
    },
    {
      title: "100% Transparent IP Ownership",
      desc: "Our clients own 100% of their bespoke codebases, repositories, and schemas without restrictive lock-ins or hidden royalties.",
      icon: Code2
    },
    {
      title: "Sub-Second Phone-First UX",
      desc: "Over 80% of business decisions and customer interactions happen on smartphones. We engineer apps that never lag, never overflow, and operate smoothly everywhere.",
      icon: Cpu
    },
    {
      title: "Statutory & Data Rigor",
      desc: "Full adherence to Indian DPDP Act 2023, GST tax compliances, encrypted cloud storage, and certified business legitimacy.",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0e0e16] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6A00FF]/15 border border-[#6A00FF]/30 text-[#b992ff] text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>About Grocave</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Engineering The Digital Backbone <br className="hidden sm:inline" />
            <span className="text-gradient-purple">For Modern Growing Enterprises.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {COMPANY_INFO.subTagline} Grounded in engineering excellence, we help ambitious businesses build, grow, and thrive through robust software.
          </p>
        </div>

        {/* Brand Core Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-5 text-gray-300 text-sm sm:text-base leading-relaxed">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Born to Replace Broken Workflows with Bulletproof Tech
            </h3>
            <p>
              Founded with a mission to empower modern business, <strong className="text-white">GROCAVE</strong> was formed with a singular conviction: businesses lose millions every year to fragmented spreadsheets, sluggish legacy applications, and disconnected manual labor.
            </p>
            <p>
              We bring enterprise-grade cloud architecture, modern microservices, and automated intelligence to companies that demand reliable software that just works — whether accessed on a high-speed fiber desktop or a mobile smartphone in remote locations.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-gray-400">Our Guiding Mantra</div>
                <div className="text-sm font-bold text-[#b992ff] tracking-wider uppercase">BUILD • GROW • THRIVE</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-gray-400">Headquarters</div>
                <div className="text-sm font-bold text-white">Darbhanga, Bihar, India</div>
              </div>
            </div>
          </div>

          {/* Certificate & Registration Highlight Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#141422] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#6A00FF]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Statutory Registration</div>
                    <div className="text-[11px] text-gray-400">Government of India GST Certified</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                  REGULAR STATUS
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Trade Name:</span>
                  <strong className="text-white font-mono">{COMPANY_INFO.tradeName}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Constitution:</span>
                  <strong className="text-white">{COMPANY_INFO.constitution}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">GSTIN:</span>
                  <strong className="text-emerald-400 font-mono font-bold">{COMPANY_INFO.gstin}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Date of Registration:</span>
                  <strong className="text-white font-mono">{COMPANY_INFO.registrationDate}</strong>
                </div>
                <div className="pt-2">
                  <span className="text-gray-400 block mb-1 font-semibold text-white">Office Address:</span>
                  <p className="text-gray-300 leading-snug">{COMPANY_INFO.officeAddress.full}</p>
                </div>
                <div className="pt-2">
                  <span className="text-gray-400 block mb-1 text-[11px]">Registered Address:</span>
                  <p className="text-gray-400 leading-snug text-[11px]">{COMPANY_INFO.registeredAddress.full}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-400">Direct Contact:</span>
                <a href={`tel:${COMPANY_INFO.contact.phone}`} className="text-[#b992ff] hover:text-white font-bold">
                  {COMPANY_INFO.contact.phoneFormatted}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#6A00FF]/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6A00FF]/15 text-[#b992ff] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{v.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
