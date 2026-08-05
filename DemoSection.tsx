
import React, { useState, useEffect, useRef } from 'react';
import { generateTourContent } from '../services/GeminiService';
import { GeneratedTourData, SavedTour } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../AuthContext';
import { generatePremiumPdf } from '../services/PdfService';

const GEN_COUNT_KEY = 'ai-tour-creator-gen-count';
const TEST_PDF_COUNT_KEY = 'ai-tour-creator-test-pdf-count';
const SAVED_TOURS_BASE_KEY = 'ai-tour-creator-saved-v2';
const USER_TIER_KEY = 'ai-tour-user-tier';
const FREE_GEN_LIMIT = 8;
const TEST_PDF_LIMIT = 4;

// Link de pagamento do Stripe para o Produto PDF individual (prod_TzVMlyDfb2JHUS)
// Nota: Recomenda-se criar um "Payment Link" no Stripe para este produto e colar o URL aqui.
const STRIPE_SINGLE_PDF_LINK = 'https://buy.stripe.com/p/TzVMlyDfb2JHUS'; 

type ContinentKey = 'africa' | 'europe' | 'north_america' | 'south_america' | 'asia' | 'alentejo';
type UserTier = 'free' | 'starter' | 'pro';

interface ContinentConfig {
  id: ContinentKey;
  image: string;
  audio: string;
  icon: string;
  accentClass: string;
  bgAccentClass: string;
  borderAccentClass: string;
}

const continentsConfig: ContinentConfig[] = [
  { id: 'europe', icon: '🏰', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=1200', audio: 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e01f4.mp3', accentClass: 'text-blue-500', bgAccentClass: 'bg-blue-600', borderAccentClass: 'border-blue-400/50' },
  { id: 'north_america', icon: '🗽', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=1200', audio: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8b92b6a07.mp3', accentClass: 'text-red-500', bgAccentClass: 'bg-red-600', borderAccentClass: 'border-red-400/50' },
  { id: 'south_america', icon: '🦜', image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=1200', audio: 'https://cdn.pixabay.com/audio/2022/05/27/audio_03e07d0f94.mp3', accentClass: 'text-emerald-500', bgAccentClass: 'bg-emerald-600', borderAccentClass: 'border-emerald-400/50' },
  { id: 'asia', icon: '⛩️', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200', audio: 'https://cdn.pixabay.com/audio/2022/01/18/audio_8b2c55e933.mp3', accentClass: 'text-rose-500', bgAccentClass: 'bg-rose-600', borderAccentClass: 'border-rose-400/50' },
  { id: 'africa', icon: '🦁', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200', audio: 'https://cdn.pixabay.com/audio/2022/03/10/audio_b044d1d92a.mp3', accentClass: 'text-amber-500', bgAccentClass: 'bg-amber-600', borderAccentClass: 'border-amber-400/50' },
  { id: 'alentejo', icon: '🌾', image: 'https://images.unsplash.com/photo-1563290219-036120593003?auto=format&fit=crop&q=80&w=1920', audio: 'https://cdn.pixabay.com/audio/2021/08/04/audio_bb6430373c.mp3', accentClass: 'text-lime-500', bgAccentClass: 'bg-lime-700', borderAccentClass: 'border-lime-500/50' }
];

const continentPresets: Record<ContinentKey, string[]> = {
  europe: [
    "🚶‍♂️ Passeio a Pé 2h na Zona Antiga de Lisboa (Alfama e Baixa)",
    "🍷 Tour Gastronómico 3h & Prova de Vinhos no Porto",
    "🏰 Excursão de Dia Inteiro em Sintra, Pena & Cabo da Roca",
    "🏛️ Roteiro Histórico 3h no Coliseu e Fórum Romano em Roma"
  ],
  africa: [
    "🦁 Safari Fotográfico de 1 Dia na Reserva do Serengeti (Tanzânia)",
    "🕌 Roteiro Cultural 3h pelos Souks e Medina de Marraquexe (Marrocos)",
    "🏜️ Excursão ao Pôr do Sol no Deserto do Saara (Merzouga)",
    "🌊 Passeio de Barco & Pinguins na Cidade do Cabo (África do Sul)"
  ],
  north_america: [
    "🗽 Tour Arquitetura & História 3h em Manhattan (Nova Iorque)",
    "🌉 Passeio de Bicicleta 3h na Ponte Golden Gate (São Francisco)",
    "🌮 Tour Gastronómico 2h no Bairro Antigo da Cidade do México",
    "🌴 Roteiro Art Déco & Praia em South Beach (Miami)"
  ],
  south_america: [
    "🦜 Roteiro Histórico & Vistas do Cristo Redentor no Rio de Janeiro",
    "🏔️ Excursão de 1 Dia a Machu Picchu & Vale Sagrado (Peru)",
    "🥩 Tour Gastronómico & Tango 3h em San Telmo (Buenos Aires)",
    "⛵ Passeio de Barco pelas Ilhas e Praias de Paraty (Brasil)"
  ],
  asia: [
    "⛩️ Passeio Cultural 3h pelos Templos e Bosque de Bambu em Quioto",
    "🥢 Tour Noturno de Street Food nos Mercados de Bangcoc (Tailândia)",
    "🏮 Excursão de 1 Dia à Grande Muralha da China (Pequim)",
    "🌴 Roteiro de Praias & Cultura Templo em Bali (Indonésia)"
  ],
  alentejo: [
    "🌾 Roteiro Gastronómico & Prova de Vinhos e Azeites em Évora",
    "🏰 Roteiro de Castelos Medievais em Monsaraz e Marvão (Alentejo)",
    "🌊 Passeio na Rota Vicentina & Costa Alentejana (Porto Covo)",
    "🍇 Tour de Vindima & Prova de Queijos Serpa na Planície Alentejana"
  ]
};

const DemoSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  
  const [userInput, setUserInput] = useState("");
  const [generatedTour, setGeneratedTour] = useState<GeneratedTourData | null>(null);
  const [editableClientPrice, setEditableClientPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [userTier, setUserTier] = useState<UserTier>('free');
  const [genCount, setGenCount] = useState(0);
  const [testPdfCount, setTestPdfCount] = useState(0);
  const [savedTours, setSavedTours] = useState<SavedTour[]>([]);
  const [isDevMode, setIsDevMode] = useState(false);
  const [titleClickCount, setTitleClickCount] = useState(0);
  
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showSinglePdfModal, setShowSinglePdfModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportingHistoryId, setExportingHistoryId] = useState<string | null>(null);

  const [isEditingItinerary, setIsEditingItinerary] = useState(false);
  const [editableItinerary, setEditableItinerary] = useState<{time: string, description: string}[]>([]);

  const [selectedContinent, setSelectedContinent] = useState<ContinentConfig>(continentsConfig[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const historyKey = user ? `${SAVED_TOURS_BASE_KEY}_${user.id}` : null;

  useEffect(() => {
    const savedTier = localStorage.getItem(USER_TIER_KEY) as UserTier;
    if (savedTier) setUserTier(savedTier);
    setGenCount(parseInt(localStorage.getItem(GEN_COUNT_KEY) || "0"));
    setTestPdfCount(parseInt(localStorage.getItem(TEST_PDF_COUNT_KEY) || "0"));
    
    if (historyKey) {
      const savedProjects = localStorage.getItem(historyKey);
      if (savedProjects) {
        setSavedTours(JSON.parse(savedProjects));
      }
    }

    const handleTierUpdate = () => {
      const updatedTier = localStorage.getItem(USER_TIER_KEY) as UserTier;
      if (updatedTier) setUserTier(updatedTier);
    };

    window.addEventListener('user-tier-updated', handleTierUpdate);
    return () => window.removeEventListener('user-tier-updated', handleTierUpdate);
  }, [historyKey]);

  const handleTitleClick = () => {
    const newCount = titleClickCount + 1;
    setTitleClickCount(newCount);
    if (newCount === 5) {
      setIsDevMode(!isDevMode);
      setTitleClickCount(0);
    }
    setTimeout(() => setTitleClickCount(0), 3000);
  };

  const handleGenerateTour = async () => {
    if (!userInput.trim() || isLoading) return;
    
    if (!isDevMode && userTier === 'free' && genCount >= FREE_GEN_LIMIT) {
      setShowLimitModal(true);
      return;
    }

    setIsLoading(true);
    setGeneratedTour(null);
    setError(null);
    
    try {
      const tourData = await generateTourContent(userInput, language, selectedContinent.id);
      setGeneratedTour(tourData);
      setEditableClientPrice(tourData.clientPrice || "€99");
      setEditableItinerary(tourData.itinerary);
      
      if (!isDevMode) {
        const newCount = genCount + 1;
        setGenCount(newCount);
        localStorage.setItem(GEN_COUNT_KEY, newCount.toString());
      }
    } catch (err: any) { 
      setError(err.message);
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleSaveProject = () => {
    if (!generatedTour || !historyKey) return;
    
    const newSavedTour: SavedTour = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      continentId: selectedContinent.id,
      continentImage: selectedContinent.image,
      data: { ...generatedTour, clientPrice: editableClientPrice }
    };
    
    const updatedTours = [newSavedTour, ...savedTours].slice(0, 30);
    setSavedTours(updatedTours);
    localStorage.setItem(historyKey, JSON.stringify(updatedTours));
  };

  const handleQuickExport = async (tour: SavedTour, e: React.MouseEvent) => {
    e.stopPropagation();
    if (exportingHistoryId) return;

    setExportingHistoryId(tour.id);
    try {
      await generatePremiumPdf(tour.data, tour.continentImage, tour.continentId, t.pdf);
    } catch (err) {
      setError("Erro ao exportar PDF do histórico.");
    } finally {
      setExportingHistoryId(null);
    }
  };

  const handleLoadSavedTour = (tour: SavedTour) => {
    setGeneratedTour(tour.data);
    setEditableClientPrice(tour.data.clientPrice);
    setEditableItinerary(tour.data.itinerary);
    setIsEditingItinerary(false);
    const cont = continentsConfig.find(c => c.id === tour.continentId);
    if (cont) setSelectedContinent(cont);
    document.getElementById('tour-preview-area')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteSavedTour = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!historyKey) return;
    const updated = savedTours.filter(t => t.id !== id);
    setSavedTours(updated);
    localStorage.setItem(historyKey, JSON.stringify(updated));
  };

  const handleExportPdf = async () => {
    if (!generatedTour || isExporting) return;

    setIsExporting(true);
    try {
      const finalTour = { ...generatedTour, clientPrice: editableClientPrice };
      await generatePremiumPdf(finalTour, selectedContinent.image, selectedContinent.id, t.pdf);
      const newTestCount = testPdfCount + 1;
      setTestPdfCount(newTestCount);
      localStorage.setItem(TEST_PDF_COUNT_KEY, newTestCount.toString());
    } catch (e) { 
      setError("Erro ao exportar PDF."); 
    } finally { 
      setIsExporting(false); 
    }
  };

  const handleContinentSelect = (config: ContinentConfig) => {
    setSelectedContinent(config);
    if (audioRef.current) {
      audioRef.current.src = config.audio;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleSaveItineraryChanges = () => {
    if (!generatedTour) return;
    setGeneratedTour({
      ...generatedTour,
      itinerary: editableItinerary
    });
    setIsEditingItinerary(false);
  };

  const handleItineraryItemChange = (index: number, field: 'time' | 'description', value: string) => {
    const newItinerary = [...editableItinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setEditableItinerary(newItinerary);
  };

  return (
    <section className="py-20 bg-white dark:bg-dark-950 transition-colors duration-300" id="demo-section">
      <audio ref={audioRef} loop crossOrigin="anonymous" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          <h2 
            onClick={handleTitleClick}
            className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight uppercase cursor-pointer select-none"
          >
            {t.demo.title}
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">{t.demo.subtitle}</p>
          
          <div className="mt-6 flex justify-center items-center gap-6">
            <div className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest bg-gray-50 dark:bg-dark-900 px-4 py-2 rounded-full border border-gray-100 dark:border-slate-800">
               {genCount} / {FREE_GEN_LIMIT} {t.demo.creditsLeft}
            </div>
            {isDevMode && (
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">
                  Dev Mode: {TEST_PDF_LIMIT - testPdfCount} Free Test PDFs Left
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="relative rounded-[3rem] p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[700px] flex flex-col border border-gray-100 dark:border-slate-800">
          <div className="absolute inset-0 z-0">
            <img 
              src={generatedTour?.imageUrl || selectedContinent.image} 
              className="w-full h-full object-cover transition-all duration-1000" 
              alt="Background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 dark:from-dark-950/95 dark:via-dark-950/40" />
          </div>

          <div className="relative z-10 flex flex-col h-full space-y-8">
            <div className="bg-black/85 dark:bg-dark-900/90 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/10 dark:border-slate-800 shadow-2xl">
              <div className="mb-10 text-center">
                <h3 className="text-[11px] font-black text-white/50 dark:text-slate-400 uppercase tracking-[0.3em] mb-6">{t.demo.continentsTitle}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {continentsConfig.map(c => (
                    <button 
                      key={c.id} 
                      onClick={() => handleContinentSelect(c)} 
                      className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border-2 ${
                        selectedContinent.id === c.id 
                          ? `${c.borderAccentClass} bg-white/10 dark:bg-slate-800/50 scale-105` 
                          : 'border-transparent bg-white/5 dark:bg-slate-900/40 hover:bg-white/10 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-2xl mb-2 filter drop-shadow-md group-hover:scale-110 transition-transform">{c.icon}</span>
                      <span className={`text-xs font-black uppercase tracking-widest text-center leading-tight ${
                        selectedContinent.id === c.id ? 'text-white' : 'text-gray-400 dark:text-slate-400'
                      }`}>
                        {t.demo.continents[c.id]}
                      </span>
                      {selectedContinent.id === c.id && (
                        <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full ${c.bgAccentClass}`}></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Presets de Roteiros Rápidos Dinâmicos por Continente/Região */}
              <div className="mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                  ⚡ Sugestões para {t.demo.continents[selectedContinent.id]}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {(continentPresets[selectedContinent.id] || continentPresets.europe).map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setUserInput(preset)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10 transition-all hover:scale-105 active:scale-95 text-left"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-9">
                  <textarea 
                    className="w-full bg-black/40 dark:bg-dark-950/40 p-6 rounded-2xl text-white border border-white/10 dark:border-slate-800 min-h-[140px] focus:border-white/40 outline-none transition-all text-lg placeholder:text-gray-600 dark:placeholder:text-slate-600 font-medium"
                    placeholder={t.demo.placeholder}
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                  />
                </div>
                <div className="lg:col-span-3">
                  <button 
                    onClick={handleGenerateTour} 
                    disabled={isLoading} 
                    className={`w-full h-full ${selectedContinent.bgAccentClass} text-white font-black py-6 rounded-2xl disabled:opacity-50 flex flex-col items-center justify-center gap-3 uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-2xl`}
                  >
                    {isLoading ? <LoadingSpinner size="md" color="text-white" /> : <span className="text-4xl">🪄</span>} 
                    <span className="text-xs leading-tight text-center font-black">
                      {isLoading ? "Processando..." : t.demo.generateBtn}
                    </span>
                  </button>
                </div>
              </div>
              {error && <p className="mt-4 text-red-400 text-xs font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">{error}</p>}
            </div>

            {generatedTour && (
              <div id="tour-preview-area" className="bg-white/95 dark:bg-dark-900/95 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-500 p-8 sm:p-12 border dark:border-slate-800">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12 border-b border-gray-100 dark:border-slate-800 pb-10">
                  <div className="flex-1">
                    {generatedTour.tourFormat && (
                      <span className={`inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white ${selectedContinent.bgAccentClass}`}>
                        🏷️ {generatedTour.tourFormat}
                      </span>
                    )}
                    <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">{generatedTour.title}</h3>
                    <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed font-medium">{generatedTour.shortDescription}</p>
                    <div className="mt-8 flex gap-4">
                      <button onClick={handleSaveProject} className="text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-slate-300 px-8 py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-dark-700 transition-all active:scale-95">
                        💾 {t.demo.saveBtn}
                      </button>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col gap-2 items-end">
                    <button onClick={handleExportPdf} disabled={isExporting} className={`${selectedContinent.bgAccentClass} text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all disabled:opacity-50 shadow-xl hover:brightness-110 active:scale-95`}>
                      {isExporting ? "Exportando..." : (isDevMode && testPdfCount < TEST_PDF_LIMIT ? "Export Test PDF" : t.demo.exportPdf)}
                    </button>
                  </div>
                </div>

                {/* Bloco de Destaques e Dica de Ouro para o Guia */}
                {(generatedTour.highlights?.length > 0 || generatedTour.insiderTip) && (
                  <div className="mb-12 grid md:grid-cols-2 gap-6 bg-blue-50/50 dark:bg-dark-950/60 p-8 rounded-3xl border border-blue-100 dark:border-slate-800">
                    {generatedTour.highlights?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-black text-blue-900 dark:text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <span>✨</span> Destaques do Anúncio (GetYourGuide / Viator):
                        </h4>
                        <ul className="space-y-2">
                          {generatedTour.highlights.map((h, idx) => (
                            <li key={idx} className="text-sm font-semibold text-gray-700 dark:text-slate-300 flex items-start gap-2">
                              <span className="text-blue-500 font-bold">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {generatedTour.insiderTip && (
                      <div>
                        <h4 className="text-xs font-black text-amber-900 dark:text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <span>💡</span> Dica de Ouro para o Guia de Turismo:
                        </h4>
                        <p className="text-sm font-medium italic text-gray-700 dark:text-slate-300 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 leading-relaxed">
                          "{generatedTour.insiderTip}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-16">
                  <div className="space-y-10">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                         <span className={`w-4 h-4 rounded-full ${selectedContinent.bgAccentClass}`}></span>
                         {t.demo.itineraryTitle}
                      </h4>
                      <button 
                        onClick={() => isEditingItinerary ? handleSaveItineraryChanges() : setIsEditingItinerary(true)}
                        className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${
                          isEditingItinerary 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-dark-700'
                        }`}
                      >
                        {isEditingItinerary ? '✅ Save Changes' : '✏️ Edit'}
                      </button>
                    </div>
                    <div className="space-y-12 border-l-2 border-gray-100 dark:border-slate-800 ml-4">
                      {(isEditingItinerary ? editableItinerary : generatedTour.itinerary).map((item, i) => (
                        <div key={i} className="relative pl-12">
                          <div className={`absolute -left-[9px] top-1.5 w-4 h-4 bg-white dark:bg-dark-900 border-4 rounded-full ${selectedContinent.borderAccentClass}`}></div>
                          
                          {isEditingItinerary ? (
                            <div className="space-y-3">
                              <input 
                                type="text"
                                value={item.time}
                                onChange={(e) => handleItineraryItemChange(i, 'time', e.target.value)}
                                className="w-full bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 outline-none focus:border-blue-500"
                              />
                              <textarea 
                                value={item.description}
                                onChange={(e) => handleItineraryItemChange(i, 'description', e.target.value)}
                                className="w-full bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 dark:text-slate-200 outline-none focus:border-blue-500 min-h-[80px]"
                              />
                            </div>
                          ) : (
                            <>
                              <span className={`text-xs font-black ${selectedContinent.accentClass} uppercase tracking-[0.2em] mb-3 block`}>{item.time}</span>
                              <p className="text-gray-800 dark:text-slate-200 font-semibold leading-relaxed text-lg">{item.description}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Inclusões e Exclusões */}
                    {(generatedTour.included?.length > 0 || generatedTour.notIncluded?.length > 0) && (
                      <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-slate-800">
                        {generatedTour.included?.length > 0 && (
                          <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">✅ O que Inclui:</h5>
                            <ul className="space-y-1 text-xs font-medium text-gray-700 dark:text-slate-300">
                              {generatedTour.included.map((inc, i) => <li key={i}>• {inc}</li>)}
                            </ul>
                          </div>
                        )}
                        {generatedTour.notIncluded?.length > 0 && (
                          <div className="bg-rose-500/5 p-4 rounded-2xl border border-rose-500/10">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-2">❌ Não Inclui:</h5>
                            <ul className="space-y-1 text-xs font-medium text-gray-700 dark:text-slate-300">
                              {generatedTour.notIncluded.map((ninc, i) => <li key={i}>• {ninc}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-10">
                    <div className="bg-gray-50 dark:bg-dark-950/50 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800">
                      <h4 className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-6">{t.demo.pricingClientSection}</h4>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={editableClientPrice} 
                          onChange={e => setEditableClientPrice(e.target.value)}
                          className="w-full bg-white dark:bg-dark-900 p-6 rounded-2xl border-2 border-gray-100 dark:border-slate-800 text-3xl font-black text-gray-900 dark:text-white outline-none focus:border-blue-600 dark:focus:border-blue-500 shadow-inner"
                        />
                      </div>
                      <p className="mt-4 text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">{t.demo.pricingEditHint}</p>

                      {/* Tabela de Preços Recomendados por Canal OTA */}
                      {generatedTour.suggestedPrices && (
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800">
                          <h5 className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">📊 Preço Benchmark para Placa/Canal OTA:</h5>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="bg-white dark:bg-dark-900 p-3 rounded-xl border border-gray-200 dark:border-slate-800">
                              <span className="block text-[9px] font-black text-orange-500 uppercase">GetYourGuide</span>
                              <span className="text-xs font-black text-gray-900 dark:text-white mt-1 block">{generatedTour.suggestedPrices.GetYourGuide}</span>
                            </div>
                            <div className="bg-white dark:bg-dark-900 p-3 rounded-xl border border-gray-200 dark:border-slate-800">
                              <span className="block text-[9px] font-black text-emerald-500 uppercase">Viator</span>
                              <span className="text-xs font-black text-gray-900 dark:text-white mt-1 block">{generatedTour.suggestedPrices.Viator}</span>
                            </div>
                            <div className="bg-white dark:bg-dark-900 p-3 rounded-xl border border-gray-200 dark:border-slate-800">
                              <span className="block text-[9px] font-black text-rose-500 uppercase">Airbnb</span>
                              <span className="text-xs font-black text-gray-900 dark:text-white mt-1 block">{generatedTour.suggestedPrices.AirbnbExperiences}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {generatedTour.imageUrl && (
                      <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video border-4 border-white dark:border-slate-800">
                        <img src={generatedTour.imageUrl} alt="Tour Destination" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History Section (Pro Terminal) */}
        {savedTours.length > 0 && (
          <div className="mt-24">
            <div className="flex justify-between items-center mb-10 border-b border-gray-100 dark:border-slate-800 pb-6">
               <div className="flex items-center gap-4">
                 <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                 <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{t.demo.savedToursTitle}</h3>
               </div>
               <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-[0.2em] bg-gray-100 dark:bg-dark-900 px-6 py-2 rounded-full border border-gray-200 dark:border-slate-800">
                 {savedTours.length} {t.demo.savedToursCount}
               </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedTours.map((tour) => {
                const tourContinent = continentsConfig.find(c => c.id === tour.continentId);
                return (
                  <div 
                    key={tour.id} 
                    className="group relative bg-white dark:bg-dark-900 border border-gray-100 dark:border-slate-800 p-8 rounded-[2rem] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                          {new Date(tour.timestamp).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg">{tourContinent?.icon}</span>
                          <span className={`text-[10px] font-black uppercase tracking-[0.1em] ${tourContinent?.accentClass}`}>
                            {t.demo.continents[tour.continentId]}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => handleQuickExport(tour, e)}
                          className={`p-3 rounded-xl transition-all shadow-sm ${exportingHistoryId === tour.id ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-gray-50 dark:bg-dark-800 text-gray-400 dark:text-slate-500 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white'}`}
                        >
                          {exportingHistoryId === tour.id ? (
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </button>
                        <button 
                          onClick={(e) => handleDeleteSavedTour(tour.id, e)}
                          className="bg-gray-50 dark:bg-dark-800 text-gray-400 dark:text-slate-500 p-3 rounded-xl hover:bg-red-500 dark:hover:bg-red-500 hover:text-white dark:hover:text-white transition-all shadow-sm"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col h-full">
                      <h4 className="text-xl font-black text-gray-900 dark:text-white mb-6 line-clamp-2 leading-tight tracking-tight">{tour.data.title}</h4>
                      
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50 dark:border-slate-800">
                        <span className="text-2xl font-black text-gray-900 dark:text-white">{tour.data.clientPrice}</span>
                        <button 
                          onClick={() => handleLoadSavedTour(tour)}
                          className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:gap-2 transition-all flex items-center gap-1 group"
                        >
                          Ver Detalhes 
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modais de Limite e Pagamento Único */}
      {showLimitModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 dark:bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-dark-900 rounded-[3rem] p-12 max-w-xl text-center shadow-2xl border dark:border-slate-800">
            <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 text-amber-500 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">⚠️</div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Limite Atingido</h3>
            <p className="text-gray-500 dark:text-slate-400 mb-10 text-lg leading-relaxed">Esgotou as suas gerações gratuitas. Atualize para o plano Pro para continuar a escalar a sua agência.</p>
            <button onClick={() => { setShowLimitModal(false); document.getElementById('pricing-section')?.scrollIntoView({behavior: 'smooth'}); }} className="w-full bg-blue-600 text-white font-black py-6 rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl">Ver Planos Profissionais</button>
          </div>
        </div>
      )}

      {showSinglePdfModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/95 dark:bg-black/98 backdrop-blur-3xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-dark-900 rounded-[3rem] p-12 max-w-xl text-center shadow-2xl border dark:border-slate-800">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">💎</div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Exportação Bloqueada</h3>
            <p className="text-gray-500 dark:text-slate-400 mb-10 text-lg leading-relaxed">Desbloqueie este PDF específico ou subscreva um plano profissional para downloads ilimitados.</p>
            <div className="flex flex-col gap-4">
              <a href={STRIPE_SINGLE_PDF_LINK} target="_blank" className="bg-blue-600 text-white font-black py-6 rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl text-center">Comprar este PDF (€1.90)</a>
              <button onClick={() => { setShowSinglePdfModal(false); document.getElementById('pricing-section')?.scrollIntoView({behavior: 'smooth'}); }} className="bg-gray-100 dark:bg-dark-800 text-gray-900 dark:text-white font-black py-6 rounded-2xl uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-dark-700 transition-all">Ver Planos Mensais</button>
              <button onClick={() => setShowSinglePdfModal(false)} className="mt-4 text-[10px] font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest hover:text-gray-600 dark:hover:text-slate-300">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DemoSection;
