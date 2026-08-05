
import React from 'react';
import { FeatureInfo } from '../types';

const FeatureCard: React.FC<FeatureInfo> = ({ icon, title, description, bgColorClass }) => {
  return (
    <div className="bg-white dark:bg-dark-900 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border dark:border-slate-800">
      <div className={`w-12 h-12 ${bgColorClass} dark:brightness-90 rounded-lg flex items-center justify-center mb-4 text-2xl shadow-inner`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
