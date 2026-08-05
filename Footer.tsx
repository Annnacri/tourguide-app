
import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { downloadProjectZip } from '../services/ExportZipService';

interface FooterProps {
  onOpenInfo: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenInfo }) => {
  const { t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportZip = async () => {
    setIsExporting(true);
    await downloadProjectZip();
    setIsExporting(false);
  };
  
  const socialLinks = [
    { 
      name: 'Instagram', 
      url: 'https://instagram.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    { 
      name: 'TikTok', 
      url: 'https://tiktok.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.417 6.417 0 01-1.87-1.5c-.02 3.86-.02 7.71-.02 11.56 0 2.14-.54 4.14-1.9 5.76-1.36 1.62-3.32 2.65-5.41 2.89-2.09.24-4.22-.24-5.88-1.57-1.66-1.33-2.65-3.33-2.7-5.43-.05-2.1.8-4.19 2.37-5.59 1.57-1.4 3.65-2.05 5.74-1.83.01 1.45.01 2.91.01 4.36-1.14-.15-2.32.1-3.21.84a3.12 3.12 0 00-1.07 2.27c-.03 1.05.47 2.05 1.3 2.7.83.65 1.93.87 2.97.6 1.04-.27 1.88-1.03 2.31-1.99.38-.85.49-1.8.49-2.73V.02z" />
        </svg>
      )
    },
    { 
      name: 'X', 
      url: 'https://x.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
        </svg>
      )
    },
  ];
  
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 sm:py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Logo, Contato e Redes */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">AI Tourguide Creator</h3>
              <div className="flex flex-col gap-1">
                <a 
                  href="mailto:travelnow351@gmail.com" 
                  className="text-sm hover:text-blue-400 transition-colors duration-200"
                >
                  travelnow351@gmail.com
                </a>
                <a 
                  href="https://aistudiocreator.com" 
                  target="_blank"
                  className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors"
                >
                  www.aistudiocreator.com
                </a>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors duration-300 transform hover:scale-110"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Descrição */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">{t.footer.product}</h4>
            <p className="text-sm leading-relaxed max-w-xs">{t.footer.desc}</p>
          </div>

          {/* Links de Suporte */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">{t.footer.support}</h4>
            <ul className="space-y-3 text-sm">
              <li onClick={() => onOpenInfo('features')} className="hover:text-white transition-colors duration-200 cursor-pointer">{t.footer.links.features}</li>
              <li onClick={() => onOpenInfo('pricing')} className="hover:text-white transition-colors duration-200 cursor-pointer">{t.footer.links.pricing}</li>
              <li onClick={() => onOpenInfo('help')} className="hover:text-white transition-colors duration-200 cursor-pointer">{t.footer.links.help}</li>
              <li 
                onClick={handleExportZip} 
                className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors duration-200 cursor-pointer flex items-center gap-1"
              >
                <span>📦 {isExporting ? 'A gerar ZIP...' : 'Baixar Código (.ZIP)'}</span>
              </li>
            </ul>
          </div>

          {/* Links de Empresa */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">{t.footer.company}</h4>
            <ul className="space-y-3 text-sm">
              <li onClick={() => onOpenInfo('about')} className="hover:text-white transition-colors duration-200 cursor-pointer">{t.footer.links.about}</li>
              <li onClick={() => onOpenInfo('privacy')} className="hover:text-white transition-colors duration-200 cursor-pointer">Privacy Policy</li>
              <li onClick={() => onOpenInfo('terms')} className="hover:text-white transition-colors duration-200 cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>

        {/* Barra de Copyright e Branding */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} AI Tourguide Creator. {t.footer.rights}
          </p>
          <p className="font-medium text-gray-500">
            Created by <span className="text-blue-500/80">AhnaX</span>. AI Tourguide Creator
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
