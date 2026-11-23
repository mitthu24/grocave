import React, { useState } from 'react';
import { Cpu, CheckCircle2, ArrowRight, Zap, Shield, Clock, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function CostEstimator({ onSelectEstimate }) {
  const [projectType, setProjectType] = useState('saas');
  const [scale, setScale] = useState('growth');
  const [timeline, setTimeline] = useState('standard');

  const projectTypes = [
    { id: 'saas', name: 'Cloud SaaS Platform', baseWeeks: 6, arch: 'Multi-Tenant Microservices' },
    { id: 'erp', name: 'Custom ERP & Invoicing', baseWeeks: 8, arch: 'Event-Driven Monolith / Postgres' },
    { id: 'mobile', name: 'Mobile + Web Application', baseWeeks: 5, arch: 'React Native + Cloud Backend' },
    { id: 'ai', name: 'AI Workflow & Automation', baseWeeks: 4, arch: 'Python FastAPI + Vector DB' }
  ];

  const scaleOptions = [
    { id: 'mvp', name: 'Startup / MVP', desc: 'Up to 5,000 active users', mult: 1 },
    { id: 'growth', name: 'Mid-Market Scale', desc: '10k – 50k active users', mult: 1.4 },
    { id: 'enterprise', name: 'Enterprise Tier', desc: '100k+ users with strict SLA', mult: 1.8 }
  ];

  const currentType = projectTypes.find(t => t.id === projectType);
  const currentScale = scaleOptions.find(s => s.id === scale);

  const estimatedWeeks = Math.round(currentType.baseWeeks * currentScale.mult * (timeline === 'express' ? 0.75 : 1));

  const handleProceed = () => {
    onSelectEstimate({
      projectType: currentType.name,
      scale: currentScale.name,
      timeline: timeline === 'express' ? 'Accelerated Blitz' : 'Standard Agile',
      weeks: estimatedWeeks,
      arch: currentType.arch
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0B0B0F] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#a855f7] text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Architecture Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Plan Your Software Timeline & Architecture
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Configure your technical scope to receive an immediate architectural recommendation and sprint timeline.
          </p>
        </div>

        <div className="rounded-2xl bg-[#12121b] border border-white/10 p-5 sm:p-8 shadow-xl">
          
          {/* Step 1: Project Type */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-3">
              1. Select Software Blueprint
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setProjectType(type.id)}
                  className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold ${
                    projectType === type.id
                      ? 'bg-[#6A00FF]/20 border-[#6A00FF] text-white shadow-md shadow-[#6A00FF]/25'
                      : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="text-sm font-bold mb-1">{type.name}</div>
                  <div className="text-[10px] text-gray-400 font-normal">From {type.baseWeeks} sprints</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Scale */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-3">
              2. Target Scale & Traffic Concurrency
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {scaleOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScale(opt.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    scale === opt.id
                      ? 'bg-[#6A00FF]/20 border-[#6A00FF] text-white shadow-md shadow-[#6A00FF]/25'
                      : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-0.5">{opt.name}</div>
                  <div className="text-[11px] text-gray-400">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Speed / Timeline */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-3">
              3. Delivery Pace
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setTimeline('standard')}
                className={`p-3 rounded-xl text-center border text-xs font-semibold transition-all ${
                  timeline === 'standard'
                    ? 'bg-[#6A00FF]/20 border-[#6A00FF] text-white'
                    : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                Standard Agile Sprints
              </button>
              <button
                onClick={() => setTimeline('express')}
                className={`p-3 rounded-xl text-center border text-xs font-semibold transition-all ${
                  timeline === 'express'
                    ? 'bg-[#6A00FF]/20 border-[#6A00FF] text-white'
                    : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                Fast-Track Dedicated Squad
              </button>
            </div>
          </div>

          {/* Result Card */}
          <div className="rounded-xl bg-gradient-to-r from-[#6A00FF]/15 via-black/40 to-[#8B3DFF]/15 border border-[#6A00FF]/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <div className="text-xs text-gray-400 mb-1">Recommended Deployment Matrix:</div>
              <div className="text-sm sm:text-base font-bold text-white mb-1">
                {currentType.name} • {currentScale.name}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#b992ff]">
                <span>Arch: <strong className="text-white">{currentType.arch}</strong></span>
                <span>•</span>
                <span>Est. Timeline: <strong className="text-white">~{estimatedWeeks} Weeks</strong></span>
                <span>•</span>
                <span>Full Source Code IP Assigned</span>
              </div>
            </div>

            <button
              onClick={handleProceed}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#6A00FF] hover:bg-[#5800d4] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#6A00FF]/30 transition-all flex-shrink-0"
            >
              <span>Get Formal SOW Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
