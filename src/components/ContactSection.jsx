import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { addLead } from '../data/adminStore';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Building,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ContactSection({ prefillData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Custom Problem-Solving Software',
    budget: 'INR 1L – 5L',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        service: prefillData.projectType || prev.service,
        message: `Project Scope: ${prefillData.projectType} (${prefillData.scale})\nRecommended Architecture: ${prefillData.arch}\nEstimated Timeline: ~${prefillData.weeks} Weeks (${prefillData.timeline})`
      }));
    }
  }, [prefillData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Save lead into persistent admin store
    try {
      addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        message: formData.message,
        source: 'Website Contact Form'
      });
    } catch (err) {
      console.error('Failed to save lead to store:', err);
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Grocave Team,\n\nI am ${formData.name || 'a prospective client'}.\nService: ${formData.service}\nBudget: ${formData.budget}\nPhone: ${formData.phone || 'N/A'}\nMessage: ${formData.message || 'I would like to discuss software requirements.'}`
    );
    return `https://wa.me/917371005525?text=${text}`;
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0B0B0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6A00FF]/15 border border-[#6A00FF]/30 text-[#b992ff] text-xs font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Technical Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Let's Engineer Your <br className="hidden sm:inline" />
            <span className="text-gradient-purple">Next Software Breakthrough.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Reach out directly to discuss your business bottlenecks, request an architecture blueprint, or schedule a discovery call with our engineering leads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Business Address */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <a
              href={`tel:${COMPANY_INFO.contact.phone}`}
              className="group block p-5 rounded-2xl bg-[#141420] border border-white/10 hover:border-[#6A00FF]/50 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6A00FF]/20 text-[#b992ff] group-hover:bg-[#6A00FF] group-hover:text-white flex items-center justify-center transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Direct Telephone Hotline</div>
                  <div className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200">
                    {COMPANY_INFO.contact.phoneFormatted}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">Available Mon - Sat (9:00 AM - 7:00 PM IST)</div>
                </div>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${COMPANY_INFO.contact.email}`}
              className="group block p-5 rounded-2xl bg-[#141420] border border-white/10 hover:border-[#6A00FF]/50 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Official Inquiries & Support</div>
                  <div className="text-sm sm:text-base font-bold text-white truncate group-hover:text-blue-200">
                    {COMPANY_INFO.contact.email}
                  </div>
                  <div className="text-[11px] text-gray-400">Guaranteed response within 24 hours</div>
                </div>
              </div>
            </a>

            {/* WhatsApp Direct Action */}
            <a
              href={COMPANY_INFO.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 hover:border-emerald-500/60 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Instant Chat</div>
                  <div className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-200">
                    WhatsApp Business Channel
                  </div>
                  <div className="text-[11px] text-gray-300">Fast-track direct message to leadership</div>
                </div>
              </div>
            </a>

            {/* Office Address Details */}
            <div className="p-5 rounded-2xl bg-[#141420] border border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-[#b992ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs text-gray-300 space-y-2">
                  <div>
                    <div className="font-bold text-white text-sm mb-1">Office Address</div>
                    <p className="leading-relaxed">
                      {COMPANY_INFO.officeAddress.full}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-gray-400 text-[11px] block mb-0.5">Registered Address:</span>
                    <p className="leading-relaxed text-[11px] text-gray-400">
                      {COMPANY_INFO.registeredAddress.full}
                    </p>
                  </div>
                  <div className="text-[11px] text-gray-400 pt-2 border-t border-white/5 flex flex-wrap gap-x-3 gap-y-1">
                    <span>Trade Name: <strong className="text-white">{COMPANY_INFO.tradeName}</strong></span>
                    <span>GSTIN: <strong className="text-white font-mono">{COMPANY_INFO.gstin}</strong></span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation & Quote Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#13131c] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
              
              {submitted ? (
                <div className="py-10 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received Successfully!</h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our senior software architect will review your project details and respond to <strong className="text-white">{formData.email}</strong> within 24 hours.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Also Send Via WhatsApp for Instant Response</span>
                    </a>
                    
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-white/10 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-white">Schedule Technical Discovery</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Fill out the form below. For urgent requirements, call <a href={`tel:${COMPANY_INFO.contact.phone}`} className="text-white underline">{COMPANY_INFO.contact.phoneFormatted}</a>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. ramesh@company.com"
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Acme Retail Pvt Ltd"
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Primary Software Requirement
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-[#1a1a26] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#6A00FF]"
                      >
                        <option value="Custom Problem-Solving Software">Custom Problem-Solving Software</option>
                        <option value="Cloud SaaS Platform Engineering">Cloud SaaS Platform Engineering</option>
                        <option value="ERP, Inventory & GST Automation">ERP, Inventory & GST Automation</option>
                        <option value="AI & Process Automation Pipeline">AI & Process Automation Pipeline</option>
                        <option value="Mobile & Web Application (PWA)">Mobile & Web Application (PWA)</option>
                        <option value="Legacy Modernization & Cloud Migration">Legacy Modernization & Cloud Migration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Target Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-[#1a1a26] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#6A00FF]"
                      >
                        <option value="INR 50k – 1.5 Lakh">INR 50,000 – 1.5 Lakh (MVP / Rapid Sprint)</option>
                        <option value="INR 1.5 Lakh – 5 Lakh">INR 1.5 Lakh – 5 Lakh (Growth Architecture)</option>
                        <option value="INR 5 Lakh – 15 Lakh">INR 5 Lakh – 15 Lakh (Full Platform Scale)</option>
                        <option value="Enterprise Custom">Enterprise / Annual Retainer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Describe Your Problem / Specifications
                    </label>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Outline current operational bottlenecks, user concurrency requirements, or target features..."
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF]"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#6A00FF] to-[#8B3DFF] hover:from-[#5800d4] hover:to-[#7828e0] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#6A00FF]/30 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp Directly</span>
                    </a>
                  </div>

                  <div className="pt-3 text-[11px] text-gray-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Your data is strictly confidential under Indian DPDP Act 2023. Zero spam commitment.</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
