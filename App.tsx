
import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import DemoSection from './components/DemoSection.tsx';
import Features from './components/Features.tsx';
import Pricing from './components/Pricing.tsx';
import Testimonials from './components/Testimonials.tsx';
import CallToAction from './components/CallToAction.tsx';
import Footer from './components/Footer.tsx';
import InfoModal from './components/InfoModal.tsx';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import { LanguageProvider } from './LanguageContext.tsx';
import { AuthProvider, useAuth } from './AuthContext.tsx';
import { ThemeProvider } from './ThemeContext.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeInfoTab, setActiveInfoTab] = useState<string | null>(null);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const handleOpenInfo = (tab: string) => {
    setActiveInfoTab(tab);
  };

  const handleCloseInfo = () => {
    setActiveInfoTab(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <LoadingSpinner size="lg" color="text-blue-500" />
      </div>
    );
  }

  // Se o utilizador não estiver logado, mostra Login ou Registro
  if (!user) {
    return (
      <>
        {authView === 'login' ? (
          <Login onSwitchToRegister={() => setAuthView('register')} />
        ) : (
          <Register onSwitchToLogin={() => setAuthView('login')} />
        )}
      </>
    );
  }

  // Se logado, mostra o conteúdo principal (limpo, sem banners de demo)
  return (
    <div className="bg-gray-50 dark:bg-dark-950 text-gray-800 dark:text-slate-100 antialiased transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <DemoSection />
        <Features />
        <Pricing onOpenCryptoInfo={() => handleOpenInfo('crypto')} />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer onOpenInfo={handleOpenInfo} />
      
      {activeInfoTab && (
        <InfoModal tab={activeInfoTab} onClose={handleCloseInfo} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
