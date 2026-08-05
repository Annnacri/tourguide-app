
export type Language = 'en' | 'pt' | 'fr' | 'es' | 'de' | 'it';

export const translations: Record<Language, any> = {
  en: {
    nav: { login: "Professional Login", start: "Get Started" },
    hero: {
      title: "Scale Your ",
      titleAccent: "Tour Agency",
      titleSuffix: " with AI Infrastructure",
      subtitle: "The all-in-one platform for guides who want to scale. Create high-margin itineraries, export white-label PDFs, and dominate OTAs in seconds.",
      ctaPrimary: "🚀 Start Free Trial",
      ctaSecondary: "📺 View Workflow",
      footer: "Trusted by 500+ premium guides • No credit card required",
      watchDemo: {
        title: "The Professional Workflow",
        step1: "1. Market Input",
        step1Desc: "Enter your destination and vibe (e.g., 'London Underground History').",
        step2: "2. AI Optimization",
        step2Desc: "Our engine analyzes competition and builds a high-margin route.",
        step3: "3. Export & Sell",
        step3Desc: "Generate a premium PDF with your QR code and sell on OTAs.",
        close: "Start Generating"
      }
    },
    demo: {
      title: "Intelligence Terminal",
      subtitle: "Experience the power of the Gemini engine. Free trial includes 3 high-conversion generations.",
      creditsLeft: "Trial generations remaining",
      upgradeNow: "Unlock Unlimited Access",
      continentsTitle: "Select Destination Aura:",
      continents: {
        africa: "Africa",
        europe: "Europe",
        north_america: "North America",
        south_america: "South America",
        asia: "Asia",
        alentejo: "Exclusive Alentejo"
      },
      placeholder: "Describe the tour you want to build (e.g., 4h private tour in Lisbon)...",
      generateBtn: "🪄 Generate Commercial Tour",
      processingBtn: "Compiling Market Data...",
      savedToursTitle: "Project History",
      savedToursCount: "tours built",
      saveBtn: "Save Project",
      itineraryTitle: "Commercial Itinerary",
      pricingTitle: "Pricing Strategy",
      pricingClientSection: "Final Sale Price (for PDF)",
      pricingEditHint: "Edit this value to set your profit margin",
      exportPdf: "Export Premium PDF",
      pdfLocked: "PDF Export is a Professional Feature.",
      buySinglePdf: "Unlock this PDF for only €1.90",
      buySinglePdfDesc: "One-time payment for this specific itinerary. No subscription required.",
      orSubscribe: "Or get unlimited access from €9.99/mo",
      limitReachedTitle: "Trial Limit Reached",
      limitReachedDesc: "You've exhausted your free credits. Join our professional community to create unlimited tours and scale your business.",
    },
    features: {
      title: "Commercial-Grade Capabilities",
      subtitle: "Everything you need to run a high-margin tour agency.",
      items: [
        { title: "AI Generation", desc: "Advanced reasoning for unique routes." },
        { title: "Market Intel", desc: "Real-time competitor pricing analysis." },
        { title: "OTA Optimized", desc: "Perfect for GetYourGuide & Viator." },
        { title: "White-Label", desc: "Your branding on every document." },
        { title: "Analytics", desc: "Track your agency growth effortlessly." },
        { title: "Multi-Language", desc: "Scale to international markets instantly." }
      ]
    },
    testimonials: {
      title: "Elite Guide Success Stories",
      subtitle: "Join hundreds of professionals scaling their revenue.",
      items: [
        { name: "Marco Rossi", role: "Luxury Guide, Rome", quote: "Increased my booking value by 40% with these professional PDFs." },
        { name: "Sarah Jenkins", role: "Agency Owner, NYC", quote: "The speed of itinerary generation is a game changer for my team." },
        { name: "João Silva", role: "Private Guide, Lisbon", quote: "Finally, a tool built for the business side of tour guiding." }
      ]
    },
    cta: {
      title: "Ready to Scale Your\nAgency Infrastructure?",
      subtitle: "Join the professional community today. Start your 3-tour free trial.",
      primary: "Start Building Now",
      secondary: "Explore Terminal",
      footer: "Trusted by guides in 40+ countries."
    },
    pricing: {
      title: "Pricing Plans for Scalable Growth",
      subtitle: "From independent guides to global agencies. Choose your scale.",
      billingMonthly: "Monthly",
      billingSemiannual: "Semiannual (Save 20%)",
      saveLabel: "Save 20%",
      planActivated: "Professional Access Granted! 🚀",
      cryptoTitle: "Crypto Payments — Coming Soon",
      cryptoDesc: "Soon: crypto payments framework. USDC & USDT will be accepted.",
      plans: [
        { name: "Free Trial", desc: "Perfect for evaluation", btn: "Current Plan", features: ["3 tours total", "PDF Preview only", "Standard AI engine"] },
        { name: "Starter", desc: "For independent guides", btn: "Subscribe Starter", features: ["20 tours per month", "Premium PDF Export", "No Ads", "Basic Support"] },
        { name: "Professional", desc: "For agencies & scale", btn: "Go Pro Now", features: ["Unlimited tours", "White-label (No logo)", "Priority AI engine", "VIP Support"] }
      ]
    },
    pdf: {
      branding: "AI TOURGUIDE CREATOR • PROFESSIONAL SALES MATERIAL",
      overview: "TOUR OVERVIEW",
      itinerary: "PROPOSED ITINERARY",
      footer: "Generated by Professional AI Infrastructure"
    },
    footer: {
      desc: "Empowering the tourism industry with next-gen AI solutions.",
      product: "Platform",
      support: "Resources",
      company: "Legal",
      links: { features: "Features", pricing: "Pricing", help: "Support", about: "Our Story" },
      rights: "Proprietary SaaS Infrastructure. All rights reserved."
    },
    infoModals: {
      privacy: { title: "Privacy Policy", content: "We protect your agency data with enterprise-grade encryption." },
      terms: { title: "Terms of Service", content: "Usage is subject to professional ethics and local tourism laws." },
      about: { title: "Our Mission", content: "We bridge the gap between AI technology and professional tourism." },
      support: { title: "Support Center", content: "Contact us at travelnow351@gmail.com for dedicated help." },
      features: { title: "Our Capabilities", content: "Automated routing, market pricing, and premium document generation." }
    }
  },
  pt: {
    nav: { login: "Acesso Profissional", start: "Começar Agora" },
    hero: {
      title: "Escalone a sua ",
      titleAccent: "Agência de Tours",
      titleSuffix: " com Infraestrutura de IA",
      subtitle: "A plataforma tudo-em-um para guias que querem crescer. Crie roteiros de alta margem, exporte PDFs white-label e domine as OTAs em segundos.",
      ctaPrimary: "🚀 Começar Teste Grátis",
      ctaSecondary: "📺 Ver Fluxo de Trabalho",
      footer: "Confiado por +500 guias premium • Sem cartão necessário",
      watchDemo: {
        title: "O Fluxo Profissional",
        step1: "1. Entrada de Mercado",
        step1Desc: "Insira o destino e a energia do tour (ex: 'História Subterrânea de Londres').",
        step2: "2. Otimização por IA",
        step2Desc: "O nosso motor analisa a concorrência e cria uma rota de alta rentabilidade.",
        step3: "3. Exportar e Vender",
        step3Desc: "Gere um PDF premium com o seu QR code e venda nas OTAs.",
        close: "Começar a Gerar"
      }
    },
    demo: {
      title: "Terminal de Inteligência",
      subtitle: "O seu teste gratuito inclui 3 gerações de alta conversão.",
      creditsLeft: "Gerações restantes no teste",
      upgradeNow: "Desbloquear Acesso Ilimitado",
      continentsTitle: "Selecione a Aura do Destino:",
      continents: {
        africa: "África",
        europe: "Europa",
        north_america: "América do Norte",
        south_america: "América do Sul",
        asia: "Ásia",
        alentejo: "Exclusivo Alentejo"
      },
      placeholder: "Descreva o tour que deseja criar (ex: tour privado de 4h em Lisboa)...",
      generateBtn: "🪄 Gerar Tour Comercial",
      processingBtn: "Compilando Dados...",
      savedToursTitle: "Histórico de Projetos",
      savedToursCount: "tours criados",
      saveBtn: "Guardar Projeto",
      itineraryTitle: "Itinerário Comercial",
      pricingTitle: "Estratégia de Preços",
      pricingClientSection: "Preço Final de Venda (PDF)",
      pricingEditHint: "Edite este valor para definir a sua margem de lucro",
      exportPdf: "Exportar PDF Premium",
      pdfLocked: "Exportação de PDF é Pro.",
      buySinglePdf: "Desbloquear este PDF por apenas €1.90",
      buySinglePdfDesc: "Pagamento único para este roteiro específico. Sem subscrição.",
      orSubscribe: "Ou tenha acesso ilimitado desde €9.99/mês",
      limitReachedTitle: "Limite de Teste Atingido",
      limitReachedDesc: "Esgotou os seus créditos gratuitos. Junte-se à nossa comunidade profissional para criar tours ilimitados e escalar o seu negócio.",
    },
    features: {
      title: "Capacidades de Nível Comercial",
      subtitle: "Tudo o que precisa para gerir uma agência de tours de alta margem.",
      items: [
        { title: "Geração por IA", desc: "Raciocínio avançado para rotas únicas." },
        { title: "Intel de Mercado", desc: "Análise de preços da concorrência em tempo real." },
        { title: "Otimizado para OTAs", desc: "Perfeito para GetYourGuide e Viator." },
        { title: "White-Label", desc: "A sua marca em todos os documentos." },
        { title: "Analytics", desc: "Acompanhe o crescimento da sua agência sem esforço." },
        { title: "Multi-Idioma", desc: "Escalone para mercados internacionais instantaneamente." }
      ]
    },
    testimonials: {
      title: "Histórias de Sucesso",
      subtitle: "Junte-se a centenas de profissionais.",
      items: [
        { name: "Marco Rossi", role: "Guia de Luxo, Roma", quote: "Aumentei o valor das minhas reservas em 40% com estes PDFs profissionais." },
        { name: "Sarah Jenkins", role: "Dona de Agência, NYC", quote: "A velocidade de geração de roteiros é um divisor de águas." },
        { name: "João Silva", role: "Guia Privado, Lisboa", quote: "Finalmente, uma ferramenta construída para o negócio." }
      ]
    },
    cta: {
      title: "Pronto para Escalar a\nInfraestrutura da Sua Agência?",
      subtitle: "Junte-se à comunidade profissional hoje. Comece o seu teste de 3 tours.",
      primary: "Começar a Criar",
      secondary: "Explorar Terminal",
      footer: "Confiado por guias em mais de 40 países."
    },
    pricing: {
      title: "Planos de Preços para Crescimento",
      subtitle: "De guias independentes a agências globais.",
      billingMonthly: "Mensal",
      billingSemiannual: "Semestral (Poupe 20%)",
      saveLabel: "Poupe 20%",
      planActivated: "Acesso Profissional Ativado! 🚀",
      cryptoTitle: "Pagamentos Crypto — Brevemente",
      cryptoDesc: "Em breve: pagamentos em crypto. USDC & USDT serão aceites.",
      plans: [
        { name: "Teste Grátis", desc: "Perfeito para avaliação", btn: "Plano Atual", features: ["3 tours no total", "Apenas preview de PDF", "Motor IA Standard"] },
        { name: "Starter", desc: "Para guias independentes", btn: "Subscrever Starter", features: ["20 tours por mês", "Exportação PDF Premium", "Sem Anúncios", "Suporte Básico"] },
        { name: "Profissional", desc: "Para agências e escala", btn: "Ser Pro Agora", features: ["Tours ilimitados", "White-label (Sem logo)", "Motor IA Prioritário", "Suporte VIP"] }
      ]
    },
    pdf: {
      branding: "AI TOURGUIDE CREATOR • MATERIAL DE VENDA PROFISSIONAL",
      overview: "VISÃO GERAL DO TOUR",
      itinerary: "ITINERÁRIO PROPOSTO",
      footer: "Gerado por Infraestrutura de IA Profissional"
    },
    footer: {
      desc: "Capacitando a indústria do turismo com soluções de IA de próxima geração.",
      product: "Plataforma",
      support: "Recursos",
      company: "Legal",
      links: { features: "Funcionalidades", pricing: "Preços", help: "Suporte", about: "A Nossa História" },
      rights: "Infraestrutura SaaS Proprietária. Todos os direitos reservados."
    }
  },
  fr: {
    nav: { login: "Connexion Pro", start: "Démarrer" },
    hero: {
      title: "Développez votre ",
      titleAccent: "Agence de Tours",
      titleSuffix: " avec l'IA",
      subtitle: "La plateforme tout-en-un pour les guides. Créez des itinéraires rentables, exportez des PDF premium et dominez les OTA en quelques secondes.",
      ctaPrimary: "🚀 Essai Gratuit",
      ctaSecondary: "📺 Voir le Flux",
      footer: "Approuvé par +500 guides premium",
      watchDemo: {
        title: "Le Flux de Travail Professionnel",
        step1: "1. Analyse Marché",
        step2: "2. Optimisation IA",
        step3: "3. Export & Vente",
        close: "Commencer"
      }
    },
    demo: {
      title: "Terminal d'Intelligence",
      subtitle: "Votre essai gratuit inclut 3 générations haute performance.",
      continents: {
        africa: "Afrique",
        europe: "Europe",
        north_america: "Amérique du Nord",
        south_america: "Amérique du Sud",
        asia: "Asie",
        alentejo: "Exclusif Alentejo"
      },
      placeholder: "Décrivez le tour que vous souhaitez créer...",
      generateBtn: "🪄 Générer un Tour Commercial",
      exportPdf: "Exporter PDF Premium",
      pricingClientSection: "Prix de Vente Final (PDF)"
    },
    features: {
      title: "Capacités de Niveau Commercial",
      items: [
        { title: "Génération par IA", desc: "Raisonnement avancé pour des routes uniques." },
        { title: "Intel Marché", desc: "Analyse des prix concurrents en tempo réel." },
        { title: "Optimisé OTA", desc: "Parfait pour GetYourGuide & Viator." }
      ]
    },
    pricing: {
      title: "Tarification pour la Croissance",
      billingMonthly: "Mensuel",
      billingSemiannual: "Semestriel (-20%)",
      cryptoTitle: "Paiements Crypto — Bientôt",
      cryptoDesc: "Bientôt : paiements en crypto. USDC & USDT seront acceptés.",
      plans: [
        { name: "Essai Gratuit", btn: "Plan Actuel", features: ["3 tours", "Aperçu PDF", "IA Standard"] },
        { name: "Starter", btn: "S'abonner Starter", features: ["20 tours/mois", "Export PDF Premium", "Sans Pub"] },
        { name: "Professionnel", btn: "Devenir Pro", features: ["Tours illimités", "White-label", "IA Prioritaire"] }
      ]
    },
    pdf: {
      branding: "AI TOURGUIDE CREATOR • DOCUMENTATION COMMERCIALE",
      overview: "APERÇU DU TOUR",
      itinerary: "ITINÉRAIRE PROPOSÉ"
    }
  },
  es: {
    nav: { login: "Acceso Profesional", start: "Comenzar" },
    hero: {
      title: "Escala tu ",
      titleAccent: "Agencia de Tours",
      titleSuffix: " con IA",
      subtitle: "La plataforma todo en uno para guías. Crea itinerarios de alta rentabilidad, exporta PDFs marca blanca y domina las OTAs.",
      ctaPrimary: "🚀 Prueba Gratis",
      ctaSecondary: "📺 Ver Proceso",
      footer: "Confiado por +500 guías premium",
      watchDemo: {
        title: "Flujo de Trabajo Profesional",
        step1: "1. Datos del Mercado",
        step2: "2. Optimización IA",
        step3: "3. Exportar y Vender",
        close: "Comenzar a Crear"
      }
    },
    demo: {
      title: "Terminal de Inteligencia",
      subtitle: "Tu prueba gratuita incluye 3 generaciones de alta conversión.",
      continents: {
        africa: "África",
        europe: "Europa",
        north_america: "América del Norte",
        south_america: "América del Sur",
        asia: "Asia",
        alentejo: "Exclusivo Alentejo"
      },
      placeholder: "Describe el tour que quieres crear...",
      generateBtn: "🪄 Generar Tour Comercial",
      exportPdf: "Exportar PDF Premium",
      pricingClientSection: "Precio Final de Venta (PDF)"
    },
    features: {
      title: "Capacidades Comerciales",
      items: [
        { title: "Generación IA", desc: "Razonamiento avanzado para rutas únicas." },
        { title: "Intel de Mercado", desc: "Análisis de precios de la competencia." },
        { title: "Optimizado OTAs", desc: "Ideal para GetYourGuide y Viator." }
      ]
    },
    pricing: {
      title: "Planes de Crecimiento",
      billingMonthly: "Mensual",
      billingSemiannual: "Semestral (Ahorra 20%)",
      cryptoTitle: "Pagos Crypto — Próximamente",
      cryptoDesc: "Próximamente: pagos en cripto. Se aceptarán USDC y USDT.",
      plans: [
        { name: "Prueba Gratis", btn: "Plan Actual", features: ["3 tours", "Previsualización PDF", "IA Estándar"] },
        { name: "Starter", btn: "Suscribir Starter", features: ["20 tours/mes", "Exportación PDF Premium", "Sin Anuncios"] },
        { name: "Profesional", btn: "Ir a Pro", features: ["Tours ilimitados", "Marca Blanca", "IA Prioritaria"] }
      ]
    },
    pdf: {
      branding: "AI TOURGUIDE CREATOR • MATERIAL DE VENTA PROFESIONAL",
      overview: "RESUMEN DEL TOUR",
      itinerary: "ITINERARIO PROPUESTO"
    }
  },
  de: {
    nav: { login: "Profi-Login", start: "Jetzt Starten" },
    hero: {
      title: "Skalieren Sie Ihre ",
      titleAccent: "Tour-Agentur",
      titleSuffix: " mit KI-Infrastruktur",
      subtitle: "Die All-in-One-Plattform für Reiseleiter. Erstellen Sie rentable Routen, exportieren Sie White-Label-PDFs und dominieren Sie OTAs.",
      ctaPrimary: "🚀 Gratis Testen",
      ctaSecondary: "📺 Workflow Ansehen",
      footer: "Vertraut von +500 Premium-Guides",
      watchDemo: {
        title: "Der professionelle Workflow",
        step1: "1. Markteingabe",
        step2: "2. KI-Optimierung",
        step3: "3. Export & Verkauf",
        close: "Jetzt Erstellen"
      }
    },
    demo: {
      title: "Intelligenz-Terminal",
      subtitle: "Ihre kostenlose Testversion enthält 3 Hochleistungs-Generationen.",
      continents: {
        africa: "Afrika",
        europe: "Europa",
        north_america: "Nordamerika",
        south_america: "Südamerika",
        asia: "Asien",
        alentejo: "Exklusives Alentejo"
      },
      placeholder: "Beschreiben Sie die Tour, die Sie erstellen möchten...",
      generateBtn: "🪄 Kommerzielle Tour Erstellen",
      exportPdf: "Premium-PDF Exportieren",
      pricingClientSection: "Endverkaufspreis (PDF)"
    },
    features: {
      title: "Gewerbliche Funktionen",
      items: [
        { title: "KI-Generierung", desc: "Fortschrittliche Routenplanung für Unikate." },
        { title: "Markt-Intel", desc: "Echtzeit-Konkurrenzanalyse der Preise." },
        { title: "OTA Optimiert", desc: "Perfekt für GetYourGuide & Viator." }
      ]
    },
    pricing: {
      title: "Preispläne für Wachstum",
      billingMonthly: "Monatlich",
      billingSemiannual: "Halbjährlich (-20%)",
      cryptoTitle: "Kryptozahlungen — Demnächst",
      cryptoDesc: "Demnächst: Kryptozahlungs-Framework. USDC & USDT werden akzeptiert.",
      plans: [
        { name: "Testversion", btn: "Aktueller Plan", features: ["3 Touren gesamt", "PDF-Vorschau", "Standard-KI"] },
        { name: "Starter", btn: "Starter Abonnieren", features: ["20 Touren/Monat", "Premium-PDF Export", "Werbefrei"] },
        { name: "Professional", btn: "Pro Werden", features: ["Unbegrenzte Touren", "White-Label", "Priorisierte KI"] }
      ]
    },
    pdf: {
      branding: "AI TOURGUIDE CREATOR • PROFESSIONELLES VERKAUFSMATERIAL",
      overview: "TOUR-ÜBERSICHT",
      itinerary: "VORSCHLAG REISEVERLAUF"
    }
  },
  it: {
    nav: { login: "Accesso Pro", start: "Inizia Ora" },
    hero: {
      title: "Scala la tua ",
      titleAccent: "Agenzia di Tour",
      titleSuffix: " con l'IA",
      subtitle: "La piattaforma all-in-one per guide. Crea itinerari ad alto margine, esporta PDF white-label e domina le OTA in pochi secondi.",
      ctaPrimary: "🚀 Prova Gratuita",
      ctaSecondary: "📺 Guarda il Workflow",
      footer: "Scelto da +500 guide premium",
      watchDemo: {
        title: "Il Workflow Professionale",
        step1: "1. Input di Mercato",
        step2: "2. Ottimizzazione IA",
        step3: "3. Esporta e Vendi",
        close: "Inizia a Generare"
      }
    },
    demo: {
      title: "Terminale d'Intelligenza",
      subtitle: "La tua prova gratuita include 3 generazioni ad alta conversione.",
      continents: {
        africa: "Africa",
        europe: "Europa",
        north_america: "America del Nord",
        south_america: "America del Sud",
        asia: "Asia",
        alentejo: "Esclusivo Alentejo"
      },
      placeholder: "Descrivi il tour che vuoi creare...",
      generateBtn: "🪄 Genera Tour Commerciale",
      exportPdf: "Esporta PDF Premium",
      pricingClientSection: "Prezzo di Vendita Finale (PDF)"
    },
    features: {
      title: "Capacità Professionali",
      items: [
        { title: "Generazione IA", desc: "Ragionamento avançato per percorsi unici." },
        { title: "Intel di Mercato", desc: "Analisi prezzi concorrenza in tempo real." },
        { title: "Ottimizzato OTA", desc: "Ideale per GetYourGuide e Viator." }
      ]
    },
    pricing: {
      title: "Piani per la Crescita",
      billingMonthly: "Mensile",
      billingSemiannual: "Semestrale (Risparmia 20%)",
      cryptoTitle: "Pagamenti Crypto — In Arrivo",
      cryptoDesc: "In arrivo: pagamenti in cripto. USDC e USDT saranno accettati.",
      plans: [
        { name: "Prova Gratuita", btn: "Piano Attuale", features: ["3 tour totali", "Anteprima PDF", "Motore IA Standard"] },
        { name: "Starter", btn: "Abbonati Starter", features: ["20 tour/mese", "Esportazione PDF Premium", "Senza Pubblicità"] },
        { name: "Professionale", btn: "Diventa Pro", features: ["Tour illimitati", "White-label", "Motore IA Prioritario"] }
      ]
    },
    pdf: {
      branding: "AI TOURGUIDE CREATOR • MATERIALE DI VENDITA PROFESSIONALE",
      overview: "DESCRIZIONE TOUR",
      itinerary: "ITINERARIO PROPOSTO"
    }
  }
};
