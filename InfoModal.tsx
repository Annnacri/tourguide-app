
import React from 'react';
import { useLanguage } from '../LanguageContext';

interface InfoModalProps {
  tab: string;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ tab, onClose }) => {
  const { t } = useLanguage();

  const getModalContent = () => {
    switch (tab) {
      case 'privacy': return t.infoModals.privacy;
      case 'terms': return t.infoModals.terms;
      case 'about': return t.infoModals.about;
      case 'support': return t.infoModals.support;
      case 'help': return t.infoModals.support;
      case 'features': return t.infoModals.features;
      case 'pricing': return { title: t.pricing.title, content: t.pricing.subtitle };
      case 'crypto': return { 
        title: t.pricing.cryptoTitle, 
        content: t.pricing.cryptoDesc,
        icon: "🪙"
      };
      default: return { title: "Info", content: "" };
    }
  };

  const info = getModalContent();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-dark-900 rounded-3xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl relative animate-in zoom-in duration-300 border border-gray-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 p-2 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">{(info as any).icon || "ℹ️"}</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              {info.title}
            </h3>
          </div>
          
          <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
            <p className="text-gray-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-lg">
              {info.content}
            </p>
            {tab === 'crypto' && (
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-gray-50 dark:bg-dark-950/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">USDC</div>
                  <div className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Stablecoin Ready</div>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-dark-950/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">USDT</div>
                  <div className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Global Support</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="pt-6 flex justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-gray-900 dark:bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors shadow-lg"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
