import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Layers, 
  Zap, 
  BarChart3, 
  Lock, 
  Sparkles,
  RefreshCw,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function ProblemSolvingMatrix({ onOpenContact }) {
  const [activeCategory, setActiveCategory] = useState(0);

  const problemScenarios = [
    {
      category: "Operations & Inventory",
      icon: Layers,
      title: "Eliminating Multi-Warehouse Chaos & Blind Stockouts",
      thePain: "Manual spreadsheet reconciliation causes frequent stockouts, overselling across channels, inaccurate GST billing, and hours wasted on daily bookkeeping.",
      theGrocaveSolution: "Custom centralized inventory engine with automated multi-channel sync, barcode/QR telemetry, real-time stock alerts, and automated one-click GST tax invoicing.",
      measurableImpact: "42% drop in inventory handling overhead & 0% overselling across active distribution channels.",
      technologies: ["PostgreSQL", "Redis Pub/Sub", "REST Webhooks", "Automated GST Engine"]
    },
    {
      category: "Process Automation",
      icon: Zap,
      title: "Replacing Slow Human Workflows With Automated Pipelines",
      thePain: "Staff spend 4-6 hours daily manually copying data between disparate CRMs, PDF invoices, email inquiries, and WhatsApp chats, causing severe operational bottlenecks.",
      theGrocaveSolution: "Intelligent event-driven automation pipelines connecting WhatsApp Cloud API, automated document parsing (OCR), and synchronized role-based dashboards.",
      measurableImpact: "Instantaneous order processing, 85% reduction in data entry errors, and rapid team scaling without headcount surge.",
      technologies: ["Node.js Microservices", "WhatsApp Business API", "Worker Queues", "Async Jobs"]
    },
    {
      category: "Legacy Modernization",
      icon: RefreshCw,
      title: "Rescuing Slow, Fragile & Crashing Monoliths",
      thePain: "Legacy desktop software or slow monolithic apps crash during traffic spikes, lack mobile responsiveness, and hold the business back from scaling.",
      theGrocaveSolution: "Gradual zero-downtime strangler-pattern migration to a modern, containerized cloud architecture with sub-second API speeds and phone-first responsive UX.",
      measurableImpact: "Sub-50ms server response times, 99.98% verified uptime SLA, and fluid mobile access from any handheld device.",
      technologies: ["React 19", "Docker", "Tailwind CSS", "Cloudflare Edge", "AWS ECS"]
    },
    {
      category: "Data & Executive Intelligence",
      icon: TrendingUp,
      title: "Turning Scattered Numbers Into Predictive Growth",
      thePain: "Founders and executives fly blind because revenue, client churn, operational costs, and fulfillment metrics are scattered across 5 different apps.",
      theGrocaveSolution: "Unified executive telemetry command center aggregating all financial, operational, and customer data with interactive real-time visual analytics.",
      measurableImpact: "Accurate margin forecasting, instant cashflow visibility, and data-backed business decisions.",
      technologies: ["Time-series Analytics", "Tailored RBAC", "Real-time WebSockets", "Export Engines"]
    }
  ];

  const current = problemScenarios[activeCategory];
  const CurrentIcon = current.icon;

  return (
    <section className="py-16 sm:py-24 bg-[#0e0e16] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A00FF]/15 border border-[#6A00FF]/30 text-[#b992ff] text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Problem-Solving Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            We Don't Just Write Code. <br className="hidden sm:inline" />
            <span className="text-gradient-purple">We Solve Expensive Business Bottlenecks.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Every software system engineered by Grocave is measured by the operational friction it eliminates and the measurable growth it generates.
          </p>
        </div>

        {/* Category Selector Tabs - Horizontal Scroll on Mobile with no break */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {problemScenarios.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === idx
                    ? 'bg-[#6A00FF] text-white shadow-lg shadow-[#6A00FF]/30 scale-[1.02]'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>

        {/* Problem vs Solution Interactive Board */}
        <div className="rounded-2xl bg-[#14141f] border border-white/10 p-5 sm:p-8 lg:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#6A00FF]/20 flex items-center justify-center text-[#b992ff]">
              <CurrentIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#a855f7]">Problem Case #{activeCategory + 1}</span>
              <h3 className="text-lg sm:text-2xl font-bold text-white">{current.title}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            
            {/* The Bottleneck / Pain */}
            <div className="rounded-xl bg-red-950/20 border border-red-500/20 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-3">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>The Painful Business Problem:</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {current.thePain}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-red-500/10 text-xs text-red-300/80 font-mono">
                Status: Stifling company growth & bleeding team hours
              </div>
            </div>

            {/* The Grocave Engineering Solution */}
            <div className="rounded-xl bg-[#6A00FF]/10 border border-[#6A00FF]/30 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#b992ff] font-bold text-sm mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>The Grocave Software Solution:</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {current.theGrocaveSolution}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#6A00FF]/20">
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Impact: {current.measurableImpact}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Under-the-hood Tech Stack Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs text-gray-400 font-medium mr-1">Applied Tech:</span>
              {current.technologies.map((tech, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#6A00FF] hover:bg-[#5800d4] px-4 py-2.5 rounded-lg transition-all shadow-md shadow-[#6A00FF]/30"
            >
              <span>Solve This In Your Business</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
