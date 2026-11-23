import React, { useState } from 'react';
import { COMPANY_INFO, STATS } from '../data/companyData';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  PhoneCall,
  Activity,
  Server,
  Layers,
  Database
} from 'lucide-react';

export default function Hero({ onExploreSolutions, onOpenContact, onOpenEstimator }) {
  const [activeMetricTab, setActiveMetricTab] = useState('throughput');

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-grid-pattern">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-[#6A00FF]/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-5 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-[#8B3DFF]/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Registered Tech Company Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-sm max-w-full">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-gray-300 truncate">
                Govt. Registered Tech Enterprise • GSTIN: <span className="text-white font-mono">{COMPANY_INFO.gstin}</span>
              </span>
            </div>

            {/* Tagline Pill */}
            <div className="text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase text-[#a855f7] mb-3 flex items-center gap-2">
              <span>{COMPANY_INFO.tagline}</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Engineering High-Impact <br className="hidden sm:inline" />
              <span className="text-gradient-purple">Business & Problem-Solving</span> Software
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
              We design, build, and scale custom enterprise platforms, intelligent automation engines, and cloud SaaS products. Eradicate operational bottlenecks and scale with verified software engineering.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenContact}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#6A00FF] via-[#7B1CFF] to-[#975BFF] text-white font-bold text-sm shadow-lg shadow-[#6A00FF]/30 hover:shadow-xl hover:shadow-[#6A00FF]/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Request Software Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenEstimator}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-white font-semibold text-sm transition-all"
              >
                <Cpu className="w-4 h-4 text-[#a855f7]" />
                <span>Estimate Project Architecture</span>
              </button>
            </div>

            {/* Quick Trust Checks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 w-full text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#a855f7] flex-shrink-0" />
                <span className="text-xs text-gray-300 font-medium">100% IP Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#a855f7] flex-shrink-0" />
                <span className="text-xs text-gray-300 font-medium">99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#a855f7] flex-shrink-0" />
                <span className="text-xs text-gray-300 font-medium">DPDP & GST Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Problem-Solving Engine Visual */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.02] p-1 shadow-2xl shadow-black/80 glow-purple">
              <div className="rounded-[14px] bg-[#111119] p-4 sm:p-6 border border-white/10">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-gray-400 ml-2">grocave-core://runtime</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                    ACTIVE • STABLE
                  </div>
                </div>

                {/* Simulated Telemetry Tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-lg mb-4 text-xs">
                  <button 
                    onClick={() => setActiveMetricTab('throughput')}
                    className={`py-1.5 px-2 rounded font-medium transition-all ${
                      activeMetricTab === 'throughput' 
                        ? 'bg-[#6A00FF] text-white shadow' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Throughput
                  </button>
                  <button 
                    onClick={() => setActiveMetricTab('automation')}
                    className={`py-1.5 px-2 rounded font-medium transition-all ${
                      activeMetricTab === 'automation' 
                        ? 'bg-[#6A00FF] text-white shadow' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Automation
                  </button>
                  <button 
                    onClick={() => setActiveMetricTab('security')}
                    className={`py-1.5 px-2 rounded font-medium transition-all ${
                      activeMetricTab === 'security' 
                        ? 'bg-[#6A00FF] text-white shadow' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Security
                  </button>
                </div>

                {/* Dynamic Telemetry Display */}
                {activeMetricTab === 'throughput' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#6A00FF]/20 flex items-center justify-center text-[#b992ff]">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Microservice Latency</div>
                          <div className="text-sm font-mono font-bold text-white">42ms p99</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">-76% vs Legacy</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">API Concurrency</div>
                          <div className="text-sm font-mono font-bold text-white">18,500 req/sec</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-blue-400">Autoscaling ON</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Production Uptime</div>
                          <div className="text-sm font-mono font-bold text-white">99.98% Monitored</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">Zero Outages</span>
                    </div>
                  </div>
                )}

                {activeMetricTab === 'automation' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300">Automated Order & GST Sync</span>
                        <span className="text-emerald-400 font-mono font-bold">100% Complete</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#6A00FF] h-full rounded-full w-full" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300">Inventory Stockout Prevention</span>
                        <span className="text-[#a855f7] font-mono font-bold">Real-time Telemetry</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#6A00FF] to-emerald-400 h-full rounded-full w-[94%]" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300">Manual Labor Hours Saved</span>
                        <span className="text-yellow-400 font-mono font-bold">180 hrs / month</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-yellow-400 h-full rounded-full w-[88%]" />
                      </div>
                    </div>
                  </div>
                )}

                {activeMetricTab === 'security' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Indian DPDP Act 2023 Readiness</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">VERIFIED</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Database className="w-4 h-4 text-[#a855f7]" />
                        <span>AES-256 Storage Encryption</span>
                      </div>
                      <span className="text-xs font-mono text-white font-bold">ENFORCED</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Terminal className="w-4 h-4 text-blue-400" />
                        <span>Daily Automated Offsite Backup</span>
                      </div>
                      <span className="text-xs font-mono text-blue-400 font-bold">PASSING</span>
                    </div>
                  </div>
                )}

                {/* Footer bar */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Architecture by Grocave Team</span>
                  <a 
                    href={`tel:${COMPANY_INFO.contact.phone}`}
                    className="text-[#b992ff] hover:text-white font-medium flex items-center gap-1"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Talk to Lead Architect</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Global Key Stats Bar */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((stat, i) => (
            <div 
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 font-display tracking-tight flex items-center gap-2">
                <span>{stat.value}</span>
                <span className="text-[#6A00FF] text-xl">✦</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
