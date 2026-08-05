
import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';

const CallToAction: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#667eea] to-[#764ba2] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
            {t.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('pricing-section')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              {t.cta.primary}
            </button>
            <button 
              onClick={() => scrollToSection('demo-section')}
              className="backdrop-blur-md bg-white/10 text-white px-8 py-4 rounded-lg text-lg font-semibold border border-white/20 hover:bg-white/20 transition shadow-lg"
            >
              {t.cta.secondary}
            </button>
          </div>
          <p className="text-blue-200 mt-8 text-sm">
            {t.cta.footer}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CallToAction;
