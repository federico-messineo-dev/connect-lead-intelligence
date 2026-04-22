import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Star, 
  Instagram, 
  Globe, 
  Search,
  Lightbulb,
  Target,
  DollarSign,
  MessageCircle,
  Brain,
  ArrowLeft,
  X,
  Phone,
  Mail
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppStore } from '../store';
import { ALL_LEADS } from '../constants';
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function CoachPage() {
  const navigate = useNavigate();
  const selectedLeadId = useAppStore(state => state.selectedLeadId);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  
  // Find lead by ID or use a default one if none selected
  const lead = ALL_LEADS.find(l => l.id === selectedLeadId) || ALL_LEADS[0];

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    
    setIsGeneratingPDF(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0f172a', // Match theme surface color
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`AI_Report_${lead.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-8 md:space-y-12 pb-20 relative" ref={reportRef}>
      <AnimatePresence>
        {showContactPopup && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactPopup(false)}
              className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-card p-6 sm:p-10 border-white/10 shadow-2xl space-y-6 sm:space-y-8"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Contatta Cliente</h3>
                  <p className="text-on-surface-variant text-xs sm:text-sm font-medium">{lead.name}</p>
                </div>
                <button 
                  onClick={() => setShowContactPopup(false)}
                  className="p-1 sm:p-2 rounded-full hover:bg-white/5 text-on-surface-variant transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <a 
                  href={lead.mobile ? `https://wa.me/${lead.mobile}` : '#'} 
                  target="_blank" rel="noreferrer"
                  className={cn(
                    "flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border transition-all group",
                    lead.mobile ? "glass-card border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20" : "opacity-40 grayscale cursor-not-allowed border-transparent bg-white/5"
                  )}
                  onClick={(e) => !lead.mobile && e.preventDefault()}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/30">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-emerald-500/20" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-bold text-emerald-400">WhatsApp</p>
                    <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium">{lead.mobile || 'Non disponibile'}</p>
                  </div>
                </a>

                <a 
                  href={lead.phone ? `tel:${lead.phone}` : '#'} 
                  className={cn(
                    "flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border transition-all group",
                    lead.phone ? "glass-card border-white/5 hover:bg-primary/10 hover:border-primary/30" : "opacity-40 grayscale cursor-not-allowed border-transparent bg-white/5"
                  )}
                  onClick={(e) => !lead.phone && e.preventDefault()}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-primary transition-colors">Telefono Fisso</p>
                    <p className="text-[10px] sm:text-xs text-on-surface-variant">{lead.phone || 'Non disponibile'}</p>
                  </div>
                </a>

                <a 
                  href={lead.email ? `mailto:${lead.email}` : '#'} 
                  className={cn(
                    "flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border transition-all group",
                    lead.email ? "glass-card border-white/5 hover:bg-tertiary/10 hover:border-tertiary/30" : "opacity-40 grayscale cursor-not-allowed border-transparent bg-white/5"
                  )}
                  onClick={(e) => !lead.email && e.preventDefault()}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-tertiary/20 flex items-center justify-center text-tertiary">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-tertiary transition-colors">Email</p>
                    <p className="text-[10px] sm:text-xs text-on-surface-variant">{lead.email || 'Non disponibile'}</p>
                  </div>
                </a>
              </div>

              <p className="text-[9px] sm:text-[10px] text-on-surface-variant font-bold text-center uppercase tracking-widest leading-relaxed">
                Le informazioni derivano dall'analisi pubblica della scheda attività.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-8">
        <div className="space-y-4 md:space-y-6">
          <button 
            onClick={() => navigate(-1)}
            data-html2canvas-ignore
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-xs sm:text-sm group"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
            Torna indietro
          </button>
          <div className="space-y-1 md:space-y-2">
            <h1 className="text-4xl md:text-[3.5rem] font-black tracking-tighter leading-tight text-white mb-1 md:mb-2">
              {lead.name}
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant font-medium">{lead.location} • {lead.category}</p>
          </div>
        </div>
        <div className="flex gap-3 md:gap-4 pt-4 md:pt-16" data-html2canvas-ignore>
          <button 
            onClick={handleExportPDF}
            disabled={isGeneratingPDF}
            className={cn(
              "flex-1 md:flex-none px-4 sm:px-8 py-3 rounded-2xl glass-card border-white/10 text-primary font-bold transition-all flex items-center justify-center gap-2 text-sm",
              isGeneratingPDF ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"
            )}
          >
            {isGeneratingPDF ? (
              <>
                <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ...
              </>
            ) : (
              'Esporta PDF'
            )}
          </button>
          <button 
            onClick={() => setShowContactPopup(true)}
            className="flex-1 md:flex-none px-4 sm:px-8 py-3 rounded-2xl bg-gradient-to-br from-primary to-primary-dim text-surface font-black shadow-xl shadow-primary/20 hover:opacity-90 transition-all text-sm"
          >
            Contatta
          </button>
        </div>
      </div>

      {/* Bento Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 relative overflow-hidden flex flex-col justify-center min-h-[300px]"
        >
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-secondary/20 rounded-full blur-[60px]" />
          <div className="relative z-10 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Punteggio SMM</p>
            <div className="flex items-baseline gap-2">
              <span className="text-8xl font-black text-white tracking-tighter">{(lead.score / 10).toFixed(1)}</span>
              <span className="text-3xl text-on-surface-variant font-bold">/10</span>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              {lead.description}
            </p>
          </div>
        </motion.div>

        {/* Engagement Card */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-10 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-32 h-32 text-primary" />
            </div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="bg-emerald-400/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-400/20">
                +12% vs mese scorso
              </span>
            </div>
            <div className="mt-8 relative z-10">
              <p className="text-sm text-on-surface-variant font-bold mb-2">Engagement Rate Stimato</p>
              <p className="text-4xl font-black text-white">4.2%</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10 flex flex-col justify-between relative group overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Star className="w-32 h-32 text-tertiary" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20 relative z-10">
              <Star className="w-6 h-6 fill-tertiary/20" />
            </div>
            <div className="mt-8 relative z-10">
              <p className="text-sm text-on-surface-variant font-bold mb-2">Sentiment Recensioni</p>
              <p className="text-4xl font-black text-white">Eccellente</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Analysis Grid */}
      <div className="space-y-8">
        <h3 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
          <div className="w-1 h-8 bg-secondary rounded-full" />
          Analisi Canali Dettagliata
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: Instagram, 
              title: lead.stats?.ig.label || 'Instagram Focus', 
              color: 'text-purple-400',
              stats: [
                { label: 'Status', value: lead.stats?.ig.value, status: lead.stats?.ig.type },
                { label: 'Insight', value: lead.stats?.ig.trend, status: 'ok' },
                { label: 'Volume', value: 'Medio', status: 'warning' }
              ],
              suggestion: `Opportunità: Migliorare la presenza su ${lead.stats?.ig.label} puntando su contenuti video.`
            },
            { 
              icon: Search, 
              title: lead.stats?.gmb.label || 'Recensioni Google', 
              color: 'text-blue-400',
              stats: [
                { label: 'Status', value: lead.stats?.gmb.value, status: lead.stats?.gmb.type },
                { label: 'Insight', value: lead.stats?.gmb.trend, status: 'ok' },
                { label: 'Volume', value: '450+', status: 'ok' }
              ],
              suggestion: 'Criticità: La gestione locale è fondamentale per la SEO.'
            },
            { 
              icon: Globe, 
              title: lead.stats?.web.label || 'Sito Web & SEO', 
              color: 'text-emerald-400',
              stats: [
                { label: 'Status', value: lead.stats?.web.value, status: lead.stats?.web.type },
                { label: 'Insight', value: lead.stats?.web.trend, status: 'ok' },
                { label: 'Performance', value: '82/100', status: 'warning' }
              ],
              suggestion: 'Azione: Ottimizzare la conversione della landing page principale.'
            }
          ].map((card, i) => (
            <motion.div 
              key={card.title}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="glass-card p-8 flex flex-col gap-8 relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <card.icon className={cn("w-6 h-6", card.color)} />
                <h4 className="text-xl font-bold">{card.title}</h4>
              </div>
              
              <div className="space-y-4 flex-1">
                {card.stats.map(stat => (
                  <div key={stat.label} className="flex justify-between items-center text-sm font-medium">
                    <span className="text-on-surface-variant">{stat.label}</span>
                    <span className={cn(
                      "font-bold",
                      stat.status === 'ok' ? "text-emerald-400" : stat.status === 'warning' ? "text-yellow-400" : "text-error"
                    )}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-sm text-primary font-bold flex gap-3">
                  <Lightbulb className="w-5 h-5 shrink-0" />
                  {card.suggestion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Suggestions Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary opacity-40" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl">
            <Brain className="w-10 h-10 fill-primary/20" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-3xl font-black tracking-tight text-white space-x-2">
              <span>Suggerimenti AI per</span>
              <span className="text-primary">{lead.name}</span>
            </h3>
            <p className="text-on-surface-variant">Strategie personalizzate generate per chiudere il contratto.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card bg-surface-container-lowest/30 p-8 border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-secondary">
              <Target className="w-6 h-6" />
              <h4 className="text-xl font-bold text-white">L'Angolo d'Attacco</h4>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Basato su un punteggio di {(lead.score / 10).toFixed(1)}, la strategia migliore è focalizzarsi su: {lead.stats?.ig.trend}. 
              Mostra come i loro competitor diretti stiano ottenendo più visibilità grazie a strategie social più aggressive.
            </p>
          </div>
          <div className="glass-card bg-surface-container-lowest/30 p-8 border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-tertiary">
              <DollarSign className="w-6 h-6" />
              <h4 className="text-xl font-bold text-white">Proposta Commerciale</h4>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Proponi un pacchetto di prova per risolvere il problema principale: {lead.stats?.web.trend}. 
              Offri un audit completo gratuito della presenza digital per instaurare fiducia e dimostrare competenza tecnica.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
