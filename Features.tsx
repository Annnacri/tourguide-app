
import React from 'react';
import FeatureCard from './FeatureCard';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();
  const icons = ["🤖", "🌐", "💰", "🌍", "📊", "🤝"];
  const colors = [
    "bg-blue-100 text-blue-600", "bg-green-100 text-green-600", 
    "bg-purple-100 text-purple-600", "bg-yellow-100 text-yellow-600", 
    "bg-red-100 text-red-600", "bg-indigo-100 text-indigo-600"
  ];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.features.title}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t.features.subtitle}</p>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.items.map((item: any, index: number) => (
            <ScrollReveal key={index} delay={index * 100}>
              <FeatureCard 
                icon={icons[index]} 
                title={item.title} 
                description={item.desc} 
                bgColorClass={colors[index]} 
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
