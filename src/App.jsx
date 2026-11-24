import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PhoneQuickBar from './components/PhoneQuickBar';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import LegalDirectoryPage from './pages/LegalDirectoryPage';
import LegalPolicyPage from './components/LegalPolicyPage';

import SolutionsSection from './components/SolutionsSection';
import ProblemSolvingMatrix from './components/ProblemSolvingMatrix';
import ProductsShowcase from './components/ProductsShowcase';
import CostEstimator from './components/CostEstimator';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

export default function App() {
  const navigate = useNavigate();

  // Auto-redirect legacy #hash to real /path URLs
  React.useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validRoutes = [
        'privacy', 'terms', 'refund', 'delivery', 'grievance', 'disclaimer',
        'data-deletion', 'user-data-deletion',
        'legal', 'solutions', 'problem-solving', 'products', 'about', 'contact'
      ];
      if (validRoutes.includes(hash)) {
        if (hash === 'user-data-deletion') {
          navigate('/data-deletion', { replace: true });
        } else {
          navigate('/' + hash, { replace: true });
        }
      }
    }
  }, [navigate]);

  const handleEstimateTransfer = (estimate) => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F7F8FA] flex flex-col font-sans selection:bg-[#6A00FF] selection:text-white">
      {/* Scroll to top on every route change */}
      <ScrollToTop />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-grow">
        <Routes>
          {/* Main Website Pages */}
          <Route path="/" element={<HomePage />} />
          
          <Route 
            path="/solutions" 
            element={
              <div className="pt-20">
                <SolutionsSection onOpenContact={() => navigate('/contact')} />
                <ProblemSolvingMatrix onOpenContact={() => navigate('/contact')} />
                <CostEstimator onSelectEstimate={handleEstimateTransfer} />
              </div>
            } 
          />
          
          <Route 
            path="/problem-solving" 
            element={
              <div className="pt-20">
                <ProblemSolvingMatrix onOpenContact={() => navigate('/contact')} />
                <SolutionsSection onOpenContact={() => navigate('/contact')} />
                <ContactSection />
              </div>
            } 
          />
          
          <Route 
            path="/products" 
            element={
              <div className="pt-20">
                <ProductsShowcase onOpenContact={() => navigate('/contact')} />
                <CostEstimator onSelectEstimate={handleEstimateTransfer} />
              </div>
            } 
          />
          
          <Route 
            path="/about" 
            element={
              <div className="pt-20">
                <AboutSection onOpenContact={() => navigate('/contact')} />
                <ContactSection />
              </div>
            } 
          />
          
          <Route 
            path="/contact" 
            element={
              <div className="pt-20">
                <ContactSection />
                <AboutSection onOpenContact={() => navigate('/contact')} />
              </div>
            } 
          />

          {/* Legal Directory Page: /legal */}
          <Route path="/legal" element={<div className="pt-20"><LegalDirectoryPage /></div>} />

          {/* SEPARATE DEDICATED LEGAL & POLICY PAGES (REAL CLEAN URLS, NO HASH, NO TABS) */}
          <Route path="/privacy" element={<div className="pt-20"><LegalPolicyPage policyId="privacy" /></div>} />
          <Route path="/data-deletion" element={<div className="pt-20"><LegalPolicyPage policyId="data-deletion" /></div>} />
          <Route path="/user-data-deletion" element={<Navigate to="/data-deletion" replace />} />
          <Route path="/terms" element={<div className="pt-20"><LegalPolicyPage policyId="terms" /></div>} />
          <Route path="/refund" element={<div className="pt-20"><LegalPolicyPage policyId="refund" /></div>} />
          <Route path="/delivery" element={<div className="pt-20"><LegalPolicyPage policyId="delivery" /></div>} />
          <Route path="/grievance" element={<div className="pt-20"><LegalPolicyPage policyId="grievance" /></div>} />
          <Route path="/disclaimer" element={<div className="pt-20"><LegalPolicyPage policyId="disclaimer" /></div>} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer with direct links to all legal pages */}
      <Footer />

      {/* Floating Action Bar for Mobile Phones */}
      <PhoneQuickBar />

      {/* Statutory Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}
