
import React from 'react';
import TestimonialCard from './TestimonialCard';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const initials = ["MR", "JS", "AC"];
  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500"];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.testimonials.title}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.testimonials.items.map((item: any, index: number) => (
            <ScrollReveal key={index} delay={index * 200}>
              <TestimonialCard 
                avatarInitials={initials[index]}
                avatarBgClass={colors[index]}
                name={item.name}
                role={item.role}
                quote={item.quote}
                rating={5}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
