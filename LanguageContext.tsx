
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt'); // Definido PT como padrão para sua região

  const base = translations.en;
  const target = translations[language] || {};

  // Função de segurança para merge profundo de objetos
  const safeMerge = (objBase: any, objTarget: any) => {
    return { ...objBase, ...(objTarget || {}) };
  };

  const t = {
    ...base,
    ...target,
    nav: safeMerge(base.nav, target.nav),
    hero: safeMerge(base.hero, target.hero),
    demo: { 
      ...safeMerge(base.demo, target.demo),
      continents: safeMerge(base.demo.continents, target.demo?.continents)
    },
    pdf: safeMerge(base.pdf, target.pdf), 
    features: safeMerge(base.features, target.features),
    pricing: safeMerge(base.pricing, target.pricing),
    testimonials: safeMerge(base.testimonials, target.testimonials),
    cta: safeMerge(base.cta, target.cta),
    footer: safeMerge(base.footer, target.footer),
    infoModals: safeMerge(base.infoModals, target.infoModals),
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
