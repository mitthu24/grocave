import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolvingMatrix from './components/ProblemSolvingMatrix';
import SolutionsSection from './components/SolutionsSection';
import ProductsShowcase from './components/ProductsShowcase';
import CostEstimator from './components/CostEstimator';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import LegalPolicyPage from './components/LegalPolicyPage';
import Footer from './components/Footer';
import PhoneQuickBar from './components/PhoneQuickBar';
import CookieBanner from './components/CookieBanner';
import { COMPANY_INFO } from './data/companyData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [estimatorData, setEstimatorData] = useState(null);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['privacy', 'terms', 'refund', 'delivery', 'grievance', 'disclaimer'].includes(hash)) {
        setActiveTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (['solutions', 'problem-solving', 'products', 'about', 'contact'].includes(hash)) {
        setActiveTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActiveTab('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLegalDocument = (policyKey) => {
    setActiveTab(policyKey);
    window.location.hash = policyKey;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEstimateTransfer = (estimate) => {
    setEstimatorData(estimate);
    setActiveTab('contact');
    window.location.hash = 'contact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if current tab is a legal policy page
  const isLegalPolicyPage = ['privacy', 'terms', 'refund', 'delivery', 'grievance', 'disclaimer'].includes(activeTab);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F7F8FA] flex flex-col font-sans selection:bg-[#6A00FF] selection:text-white">
      {/* Top Navbar (Legal links removed from header) */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={navigateTo} 
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero 
              onExploreSolutions={() => navigateTo('solutions')}
              onOpenContact={() => navigateTo('contact')}
              onOpenEstimator={() => {
                const el = document.getElementById('estimator-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <ProblemSolvingMatrix onOpenContact={() => navigateTo('contact')} />
            <SolutionsSection onOpenContact={() => navigateTo('contact')} />
            <ProductsShowcase onOpenContact={() => navigateTo('contact')} />
            
            <div id="estimator-anchor">
              <CostEstimator onSelectEstimate={handleEstimateTransfer} />
            </div>
            
            <AboutSection onOpenContact={() => navigateTo('contact')} />
            <ContactSection prefillData={estimatorData} />
          </>
        )}

        {activeTab === 'solutions' && (
          <div className="pt-20">
            <SolutionsSection onOpenContact={() => navigateTo('contact')} />
            <ProblemSolvingMatrix onOpenContact={() => navigateTo('contact')} />
            <CostEstimator onSelectEstimate={handleEstimateTransfer} />
          </div>
        )}

        {activeTab === 'problem-solving' && (
          <div className="pt-20">
            <ProblemSolvingMatrix onOpenContact={() => navigateTo('contact')} />
            <SolutionsSection onOpenContact={() => navigateTo('contact')} />
            <ContactSection prefillData={estimatorData} />
          </div>
        )}

        {activeTab === 'products' && (
          <div className="pt-20">
            <ProductsShowcase onOpenContact={() => navigateTo('contact')} />
            <CostEstimator onSelectEstimate={handleEstimateTransfer} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-20">
            <AboutSection onOpenContact={() => navigateTo('contact')} />
            <ContactSection prefillData={estimatorData} />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-20">
            <ContactSection prefillData={estimatorData} />
            <AboutSection onOpenContact={() => navigateTo('contact')} />
          </div>
        )}

        {/* Dedicated Standalone Legal & Policy Pages (NO TABS) */}
        {isLegalPolicyPage && (
          <div className="pt-20">
            <LegalPolicyPage 
              policyId={activeTab} 
              onBackToHome={() => navigateTo('home')} 
              onOpenContact={() => navigateTo('contact')} 
            />
          </div>
        )}
      </main>

      {/* Footer (Contains all direct Legal & Policy links and Business Address) */}
      <Footer 
        onNavClick={navigateTo} 
        onOpenLegal={openLegalDocument} 
      />

      {/* Floating Action Bar for Mobile Phones */}
      <PhoneQuickBar onOpenContact={() => navigateTo('contact')} />

      {/* Statutory Cookie & DPDP Consent Banner */}
      <CookieBanner onOpenPrivacy={() => openLegalDocument('privacy')} />
    </div>
  );
}
