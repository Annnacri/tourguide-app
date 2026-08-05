
import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [showDemoModal, setShowDemoModal] = useState(false);

  const scrollToDemo = () => {
    const element = document.getElementById('demo-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#0f172a] py-24 sm:py-32 overflow-hidden relative">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center" threshold={0.01}>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
             <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
             <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Next-Gen Infrastructure for Guides</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
            {t.hero.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{t.hero.titleAccent}</span><br />
            {t.hero.titleSuffix}
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button 
              onClick={scrollToDemo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:-translate-y-1 uppercase tracking-widest"
            >
              {t.hero.ctaPrimary}
            </button>
            <button 
              onClick={() => setShowDemoModal(true)}
              className="backdrop-blur-xl bg-white/5 text-white px-10 py-5 rounded-2xl text-lg font-black border border-white/10 hover:bg-white/10 transition-all uppercase tracking-widest"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="text-white font-black text-sm tracking-widest uppercase">GetYourGuide Sync</div>
             <div className="text-white font-black text-sm tracking-widest uppercase">Airbnb Ready</div>
             <div className="text-white font-black text-sm tracking-widest uppercase">Viator Pro</div>
          </div>
          
          <p className="text-gray-500 mt-10 text-[11px] font-bold uppercase tracking-[0.3em]">{t.hero.footer}</p>
        </ScrollReveal>
      </div>

      {/* Demo Workflow Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-4 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] max-w-2xl w-full p-8 sm:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative animate-in zoom-in slide-in-from-bottom-12 duration-500">
            <button 
              onClick={() => setShowDemoModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-3 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-3xl font-black text-gray-900 mb-12 text-center uppercase tracking-tight">{t.hero.watchDemo.title}</h3>
            
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-blue-50 rounded-[1.5rem] flex items-center justify-center shrink-0 font-black text-blue-600 text-xl shadow-inner">1</div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-widest mb-1">{t.hero.watchDemo.step1}</h4>
                  <p className="text-gray-500 text-lg font-medium">{t.hero.watchDemo.step1Desc}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-purple-50 rounded-[1.5rem] flex items-center justify-center shrink-0 font-black text-purple-600 text-xl shadow-inner">2</div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-widest mb-1">{t.hero.watchDemo.step2}</h4>
                  <p className="text-gray-500 text-lg font-medium">{t.hero.watchDemo.step2Desc}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-green-50 rounded-[1.5rem] flex items-center justify-center shrink-0 font-black text-green-600 text-xl shadow-inner">3</div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-widest mb-1">{t.hero.watchDemo.step3}</h4>
                  <p className="text-gray-500 text-lg font-medium">{t.hero.watchDemo.step3Desc}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setShowDemoModal(false);
                scrollToDemo();
              }}
              className="w-full mt-16 bg-blue-600 text-white font-black py-6 rounded-[2rem] hover:bg-blue-700 transition-all hover:shadow-2xl hover:-translate-y-1 uppercase tracking-widest"
            >
              {t.hero.watchDemo.close}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
