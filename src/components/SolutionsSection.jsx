import React from 'react';
import { SERVICES } from '../data/companyData';
import { 
  Cpu, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  Network, 
  ArrowRight, 
  Check 
} from 'lucide-react';

const iconMap = {
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Network
};

export default function SolutionsSection({ onOpenContact }) {
  return (
    <section className="py-16 sm:py-24 bg-[#0B0B0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#a855f7] text-xs font-bold uppercase tracking-wider mb-4">
            <span>Enterprise Software Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Architected For Scale. <br className="hidden sm:inline" />
            <span className="text-gradient-purple">Engineered For Zero Operational Downtime.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            From high-concurrency cloud backends to fluid phone-first web and mobile applications, we build robust systems that endure.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Cpu;
            return (
              <div 
                key={service.id}
                className="group relative rounded-2xl bg-glass-card p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#6A00FF]/40 hover:shadow-xl hover:shadow-[#6A00FF]/15"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#6A00FF]/15 group-hover:bg-[#6A00FF] flex items-center justify-center text-[#b992ff] group-hover:text-white transition-all duration-300 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/5 border border-white/10 text-gray-300">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="text-xs font-semibold text-[#a855f7] mb-1">{service.category}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-[#a855f7] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Trigger */}
                <button
                  onClick={onOpenContact}
                  className="w-full pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-gray-300 group-hover:text-white transition-colors"
                >
                  <span>Commission This Solution</span>
                  <ArrowRight className="w-4 h-4 text-[#6A00FF] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
