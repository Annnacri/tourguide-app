
import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { Language } from '../translations';
import { downloadProjectZip } from '../services/ExportZipService';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportZip = async () => {
    setIsExporting(true);
    await downloadProjectZip();
    setIsExporting(false);
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  ];

  const scrollToPricing = () => {
    const element = document.getElementById('pricing-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white dark:bg-dark-900 shadow-sm border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">AI Tourguide Creator</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-50 dark:bg-dark-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Seletor de Idioma */}
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-gray-50 dark:bg-dark-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 sm:p-2 appearance-none cursor-pointer transition-colors"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.code.toUpperCase()}
                </option>
              ))}
            </select>

            {user && (
              <button 
                onClick={() => signOut()}
                className="text-gray-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 text-xs font-black uppercase tracking-widest px-2 transition-colors"
              >
                Sair
              </button>
            )}

            <button 
              onClick={handleExportZip}
              disabled={isExporting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Descarregar ficheiro .ZIP com todo o código fonte"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{isExporting ? 'A criar ZIP...' : 'Baixar ZIP'}</span>
            </button>

            <button 
              onClick={scrollToPricing}
              className="hidden sm:block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out"
            >
              {t.nav.start}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
