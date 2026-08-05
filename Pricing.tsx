
import React, { useState, useEffect } from 'react';
import PricingCard from './PricingCard';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';
import LoadingSpinner from './LoadingSpinner';

// ==========================================================
// CONFIGURAÇÃO STRIPE
// ==========================================================
const STRIPE_PUBLIC_KEY = (import.meta as any).env?.VITE_STRIPE_PUBLIC_KEY || 
                          process.env.VITE_STRIPE_PUBLIC_KEY || 
                          'pk_live_51QsQLmLOy5CWZ2h1MHNCGFSskBHnpLgeXANRESOHsKIwJd1PBiazfc3RLgxVNKyTdJjUYsjuV0S1kimRRuK6SQgy00cA6DsGM9';

// NOTA: Substitua estes 'price_...' pelos IDs reais que encontra dentro de cada produto no Stripe
const PRICE_IDS = {
  starter: {
    monthly: 'price_COLE_AQUI_O_ID_MENSAL_STARTER', // Substitua pelo ID que começa com price_
    semiannual: 'price_COLE_AQUI_O_ID_SEMESTRAL_STARTER'
  },
  pro: {
    monthly: 'price_COLE_AQUI_O_ID_MENSAL_PRO',    // Substitua pelo ID que começa com price_
    semiannual: 'price_COLE_AQUI_O_ID_SEMESTRAL_PRO'
  }
};

interface PricingProps {
  onOpenCryptoInfo?: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onOpenCryptoInfo }) => {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'semiannual'>('monthly');
  const [statusMessage, setStatusMessage] = useState<{ text: string, type: 'success' | 'loading' | 'error' } | null>(null);

  // DETECTAR SUCESSO NO PAGAMENTO (Quando o utilizador volta do Stripe)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      // Simular ativação do plano no localStorage (já que não há backend real nesta demo)
      localStorage.setItem('ai-tour-user-tier', 'starter'); // Ou detetar qual foi o plano
      window.dispatchEvent(new Event('user-tier-updated'));
      
      setStatusMessage({ 
        text: "Pagamento Concluído! Acesso Profissional Ativado. 🚀", 
        type: 'success' 
      });
      
      // Limpar o URL para não mostrar a mensagem sempre que fizer refresh
      window.history.replaceState({}, document.title, window.location.pathname);
      
      setTimeout(() => setStatusMessage(null), 8000);
    }
  }, []);
  
  const getPricingData = (index: number) => {
    if (index === 0) return { price: "€0", suffix: "" }; 
    if (billingCycle === 'monthly') {
      return { price: index === 1 ? "€9.99" : "€19.99", suffix: "/mês" };
    } else {
      return { 
        price: index === 1 ? "€47.94" : "€95.94", 
        suffix: "/6 meses",
        subtext: index === 1 ? "equiv. €7.99/mês" : "equiv. €15.99/mês"
      };
    }
  };

  const tiers = ["free", "starter", "pro"] as const;

  const handlePlanSelect = async (tier: "free" | "starter" | "pro") => {
    try {
      if (tier === 'free') {
        localStorage.setItem('ai-tour-user-tier', 'free');
        window.dispatchEvent(new Event('user-tier-updated'));
        setStatusMessage({ text: "Plano Grátis Ativado", type: 'success' });
        setTimeout(() => setStatusMessage(null), 3000);
        return;
      }

      const priceId = PRICE_IDS[tier as "starter" | "pro"][billingCycle];

      // Verificação de ID de Produto vs Preço
      if (priceId.startsWith('prod_')) {
        setStatusMessage({ 
          text: "Erro: Forneceu um Product ID. Precisa do Price ID (clique no preço dentro do Stripe).", 
          type: 'error' 
        });
        return;
      }

      if (!priceId || priceId.includes('COLE_AQUI')) {
        setStatusMessage({ text: "ID do Stripe não configurado para este plano.", type: 'error' });
        return;
      }

      setStatusMessage({ text: "A redirecionar para o Checkout seguro...", type: 'loading' });

      // @ts-ignore
      const stripe = window.Stripe ? window.Stripe(STRIPE_PUBLIC_KEY) : null;
      if (!stripe) throw new Error("Stripe.js não carregou.");

      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: window.location.origin + '?payment=success',
        cancelUrl: window.location.origin,
      });

      if (error) throw error;

    } catch (err: any) {
      console.error("Stripe Checkout Error:", err);
      setStatusMessage({ 
        text: "Erro no Checkout. Verifique se o ID de Preço existe no Stripe Live.", 
        type: 'error' 
      });
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-dark-950 transition-colors duration-300" id="pricing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t.pricing.title}</h2>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-bold uppercase transition-colors ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
              {t.pricing.billingMonthly}
            </span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'semiannual' : 'monthly')}
              className="relative w-16 h-8 bg-gray-200 dark:bg-dark-800 rounded-full p-1 shadow-inner"
            >
              <div className={`w-6 h-6 bg-white dark:bg-blue-500 rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'semiannual' ? 'translate-x-8' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-bold uppercase transition-colors ${billingCycle === 'semiannual' ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
              {t.pricing.billingSemiannual}
            </span>
          </div>
        </ScrollReveal>

        {statusMessage && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-top-10">
            <div className={`px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-2xl flex items-center gap-3 border ${
              statusMessage.type === 'success' ? 'bg-green-600 border-green-400 text-white' : 
              statusMessage.type === 'error' ? 'bg-red-600 border-red-400 text-white' : 
              'bg-blue-600 border-blue-400 text-white'
            }`}>
              {statusMessage.type === 'loading' && <LoadingSpinner size="sm" color="text-white" />}
              {statusMessage.text}
            </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.pricing.plans.map((plan: any, index: number) => {
            const pricing = getPricingData(index);
            return (
              <PricingCard 
                key={index}
                name={plan.name}
                price={pricing.price}
                priceSuffix={pricing.suffix}
                description={pricing.subtext || plan.desc}
                features={plan.features}
                isPopular={index === 1}
                buttonText={plan.btn}
                buttonClass={index === 1 ? "bg-yellow-400 text-gray-900" : index === 2 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-dark-800 text-gray-500"}
                onClick={() => handlePlanSelect(tiers[index])}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
