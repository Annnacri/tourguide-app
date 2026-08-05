
import React from 'react';
import { PricingPlanInfo } from '../types';

interface PricingCardProps extends PricingPlanInfo {
  onClick?: () => void;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`w-5 h-5 ${className}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
  </svg>
);

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  priceSuffix,
  description,
  features,
  isPopular,
  buttonText,
  buttonClass,
  textColorClass = 'text-gray-900',
  borderColorClass = 'border-gray-200 dark:border-slate-800',
  bgColorClass = 'bg-white dark:bg-dark-900',
  badgeText = "Mais Popular",
  onClick
}) => {
  const popularStyles = isPopular 
    ? "border-blue-600 dark:border-blue-500 scale-105 shadow-xl dark:shadow-blue-900/20" 
    : "hover:shadow-lg";
  
  const popularBadge = isPopular && (
    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
      <span className="bg-yellow-400 dark:bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
        {badgeText}
      </span>
    </div>
  );

  return (
    <div className={`${bgColorClass} border-2 ${borderColorClass} rounded-2xl p-8 relative transition-all duration-300 ${popularStyles}`}>
      {popularBadge}
      <div className="text-center">
        <h3 className={`text-2xl font-black ${isPopular ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-slate-200'} mb-2`}>{name}</h3>
        <div className={`text-4xl font-black ${isPopular ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-slate-200'} mb-4`}>
          {price}
          <span className={`text-lg font-bold ${isPopular ? 'opacity-80' : 'text-gray-500 dark:text-slate-500'}`}>{priceSuffix}</span>
        </div>
        <p className={`${isPopular ? 'opacity-80 dark:text-slate-300' : 'text-gray-600 dark:text-slate-400'} mb-6 text-sm font-medium`}>{description}</p>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center text-sm font-medium ${isPopular ? 'text-gray-800 dark:text-slate-200' : 'text-gray-700 dark:text-slate-300'}`}>
            <CheckIcon className={isPopular ? "text-yellow-500 mr-2" : "text-green-500 mr-2"} />
            {feature}
          </li>
        ))}
      </ul>
      <button 
        onClick={onClick}
        className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-150 ease-in-out hover:brightness-110 active:scale-95 shadow-md ${buttonClass}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
