import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProblemSolvingMatrix from '../components/ProblemSolvingMatrix';
import SolutionsSection from '../components/SolutionsSection';
import ProductsShowcase from '../components/ProductsShowcase';
import CostEstimator from '../components/CostEstimator';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  const navigate = useNavigate();
  const [estimatorData, setEstimatorData] = useState(null);

  const handleEstimateTransfer = (estimate) => {
    setEstimatorData(estimate);
    const contactEl = document.getElementById('contact-section');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };

  return (
    <>
      <Hero 
        onExploreSolutions={() => navigate('/solutions')}
        onOpenContact={() => navigate('/contact')}
        onOpenEstimator={() => {
          const el = document.getElementById('estimator-anchor');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      <ProblemSolvingMatrix onOpenContact={() => navigate('/contact')} />
      <SolutionsSection onOpenContact={() => navigate('/contact')} />
      <ProductsShowcase onOpenContact={() => navigate('/contact')} />
      
      <div id="estimator-anchor">
        <CostEstimator onSelectEstimate={handleEstimateTransfer} />
      </div>
      
      <AboutSection onOpenContact={() => navigate('/contact')} />
      
      <div id="contact-section">
        <ContactSection prefillData={estimatorData} />
      </div>
    </>
  );
}
