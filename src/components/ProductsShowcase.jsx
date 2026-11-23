import React from 'react';
import { PRODUCTS, COMPANY_INFO } from '../data/companyData';
import { Sparkles, ArrowRight, Layers, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ProductsShowcase({ onOpenContact }) {
  const productIcons = [Layers, MessageSquare, ShieldCheck];

  return (
    <section className="py-16 sm:py-24 bg-[#0d0d14] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A00FF]/15 border border-[#6A00FF]/30 text-[#b992ff] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grocave Proprietary Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Turnkey Software Platforms <br />
              <span className="text-gradient-purple">Ready For Enterprise Deployment.</span>
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-md">
            In addition to custom client engineering, Grocave maintains battle-tested proprietary software platforms built specifically to accelerate business agility.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PRODUCTS.map((product, idx) => {
            const Icon = productIcons[idx] || Layers;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-gradient-to-b from-[#181826] to-[#10101a] border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-[#6A00FF]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#6A00FF]/20"
              >
                <div>
                  {/* Status header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#6A00FF]/20 flex items-center justify-center text-[#b992ff]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {product.status}
                    </span>
                  </div>

                  {/* Name and Tagline */}
                  <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                  <div className="text-xs text-[#a855f7] font-medium mb-4">{product.tagline}</div>
                  
                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metric & CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Key Proven Metric</div>
                    <div className="text-xs font-bold text-emerald-400 font-mono">{product.metrics}</div>
                  </div>
                  <button
                    onClick={onOpenContact}
                    className="p-2.5 rounded-lg bg-[#6A00FF]/20 hover:bg-[#6A00FF] text-[#b992ff] hover:text-white transition-all"
                    title={`Request demo for ${product.name}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Banner with Grocave Motto */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#6A00FF]/15 via-[#8B3DFF]/15 to-transparent border border-[#6A00FF]/30 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono font-bold text-[#b992ff] uppercase tracking-wider mb-1">
              {COMPANY_INFO.subTagline}
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Need a bespoke system engineered for your specific workflows?
            </h4>
          </div>
          <button
            onClick={onOpenContact}
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-gray-100 transition-colors shadow-lg active:scale-95"
          >
            Discuss Custom Deployment
          </button>
        </div>

      </div>
    </section>
  );
}
