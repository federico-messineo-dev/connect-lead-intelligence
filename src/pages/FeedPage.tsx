import { 
  MapPin, 
  MessageCircle, 
  Phone, 
  Mail, 
  Bookmark,
  TrendingUp,
  ChevronRight,
  MoreHorizontal,
  X,
  Check
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useAppStore } from '../store';
import { ALL_LEADS } from '../constants';

const PRIMARY_FILTERS = ['Tutti i Settori', 'Ristorazione', 'Servizi IT', 'Retail'];
const OTHER_FILTERS = ['Salute & Benessere', 'Automotive', 'Real Estate', 'Education', 'Manifatturiero', 'Turismo'];

export default function FeedPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Tutti i Settori');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const toggleSaveLead = useAppStore(state => state.toggleSaveLead);
  const savedLeads = useAppStore(state => state.savedLeads);
  const setSelectedLead = useAppStore(state => state.setSelectedLead);

  const isSaved = (leadId: number) => savedLeads.some(l => l.id === leadId);

  const handleLeadClick = (leadId: number) => {
    setSelectedLead(leadId);
    navigate('/coach');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setShowMoreFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLeads = activeFilter === 'Tutti i Settori' 
    ? ALL_LEADS 
    : ALL_LEADS.filter(l => l.category === activeFilter);

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-2 md:space-y-4">
        <h1 className="text-4xl md:text-[3.5rem] font-black tracking-tighter leading-tight text-white">
          Feed Attività
        </h1>
        <p className="text-on-surface-variant text-base md:text-lg font-medium max-w-2xl">
          Scopri nuovi lead qualificati nella tua zona. Aggiornato in tempo reale dai nostri sistemi di ricerca AI.
        </p>
      </div>

      <div className="flex overflow-x-auto pb-4 -mx-6 px-6 md:pb-0 md:mx-0 md:px-0 md:flex-wrap items-center gap-3 md:gap-4 no-scrollbar">
        {PRIMARY_FILTERS.map((filter) => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "whitespace-nowrap px-8 py-3 rounded-full text-sm font-bold border transition-all duration-300",
              activeFilter === filter 
                ? "bg-gradient-to-r from-primary to-primary-dim text-surface border-transparent shadow-[0_10px_30px_rgba(0,112,235,0.2)]" 
                : "bg-white/5 text-on-surface-variant border-white/5 hover:bg-white/10 hover:text-on-surface"
            )}
          >
            {filter}
          </button>
        ))}

        <div className="relative" ref={moreRef}>
          <button 
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className={cn(
              "whitespace-nowrap px-8 py-3 rounded-full text-sm font-bold border transition-all duration-300 flex items-center gap-3",
              OTHER_FILTERS.includes(activeFilter)
                ? "bg-gradient-to-r from-primary to-primary-dim text-surface border-transparent"
                : "bg-white/5 text-on-surface-variant border-white/5 hover:bg-white/10 hover:text-on-surface"
            )}
          >
            <MoreHorizontal className="w-4 h-4" />
            {OTHER_FILTERS.includes(activeFilter) ? activeFilter : 'Altro...'}
          </button>

          <AnimatePresence>
            {showMoreFilters && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full mt-4 left-0 w-64 glass-card border border-white/10 shadow-2xl z-50 p-2"
              >
                <div className="p-4 border-b border-white/5 mb-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Altri Settori</h4>
                </div>
                <div className="space-y-1">
                  {OTHER_FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => {
                        setActiveFilter(f);
                        setShowMoreFilters(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex justify-between items-center group",
                        activeFilter === f ? "bg-primary/20 text-primary" : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                      )}
                    >
                      {f}
                      {activeFilter === f && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {activeFilter !== 'Tutti i Settori' && (
          <button 
            onClick={() => setActiveFilter('Tutti i Settori')}
            className="p-2 rounded-full hover:bg-white/5 text-on-surface-variant transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {filteredLeads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLeads.map((lead, i) => (
            <motion.article 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 3) * 0.1 }}
              key={lead.id}
              className="group glass-card overflow-hidden flex flex-col hover:border-primary/30 transition-colors duration-500"
            >
              <div className="h-64 w-full relative overflow-hidden">
                <img 
                  src={lead.image} 
                  alt={lead.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  {lead.status && (
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border",
                      lead.status === 'Nuovo' ? "bg-primary/20 text-primary border-primary/20" : "bg-tertiary/20 text-tertiary border-tertiary/20"
                    )}>
                      {lead.status}
                    </span>
                  )}
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border bg-white/10 text-white border-white/10">
                    {lead.category}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-black text-white tracking-tighter mb-1 drop-shadow-2xl">
                    {lead.name}
                  </h3>
                  <div className="flex items-center text-on-surface-variant text-sm font-bold">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {lead.location}
                  </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col gap-8">
                <button 
                  onClick={() => handleLeadClick(lead.id)}
                  className="flex items-center justify-between p-5 rounded-2xl bg-surface-container-lowest/30 border border-white/5 hover:bg-surface-container-lowest/50 hover:border-secondary/40 transition-all group/score"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">SMM Score</p>
                      <p className="text-xl font-black text-on-surface group-hover/score:text-secondary transition-colors">
                        {lead.score}/100
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover/score:text-secondary transition-all group-hover/score:translate-x-1" />
                </button>

                <p className="text-on-surface-variant text-sm leading-relaxed font-medium line-clamp-2">
                  {lead.description}
                </p>

                <div className="mt-auto grid grid-cols-4 gap-2 pt-4 border-t border-white/5">
                    <a 
                      href={lead.mobile ? `https://wa.me/${lead.mobile}` : '#'} 
                      target={lead.mobile ? "_blank" : undefined}
                      rel="noreferrer"
                      className={cn(
                        "h-12 flex items-center justify-center rounded-xl transition-colors",
                        lead.mobile ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30" : "bg-white/5 text-on-surface-variant/30 cursor-not-allowed"
                      )}
                      onClick={(e) => !lead.mobile && e.preventDefault()}
                    >
                      <MessageCircle className="w-5 h-5 fill-emerald-500/10" />
                    </a>
                  <a 
                    href={lead.phone ? `tel:${lead.phone}` : '#'} 
                    className={cn(
                      "h-12 flex items-center justify-center rounded-xl transition-colors border",
                      lead.phone ? "glass-card border-white/5 text-on-surface hover:bg-white/10" : "bg-white/5 border-transparent text-on-surface-variant/30 cursor-not-allowed"
                    )}
                    onClick={(e) => !lead.phone && e.preventDefault()}
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                  <a 
                    href={lead.email ? `mailto:${lead.email}` : '#'} 
                    className={cn(
                      "h-12 flex items-center justify-center rounded-xl transition-colors border",
                      lead.email ? "glass-card border-white/10 text-on-surface hover:bg-white/10" : "bg-white/5 border-transparent text-on-surface-variant/30 cursor-not-allowed"
                    )}
                    onClick={(e) => !lead.email && e.preventDefault()}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={() => toggleSaveLead(lead)}
                    className={cn(
                      "h-12 flex items-center justify-center rounded-xl border transition-all",
                      isSaved(lead.id) ? "bg-tertiary/10 border-tertiary/30 text-tertiary" : "glass-card border-white/5 text-on-surface-variant hover:text-tertiary"
                    )}
                  >
                    <Bookmark className={cn("w-5 h-5", isSaved(lead.id) && "fill-tertiary")} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-20 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-on-surface-variant">
            <MoreHorizontal className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">Nessuna attività trovata</h3>
            <p className="text-on-surface-variant max-w-sm mx-auto">
              Non abbiamo trovato lead per il settore "{activeFilter}" in questa area. Prova un altro filtro!
            </p>
          </div>
          <button 
            onClick={() => setActiveFilter('Tutti i Settori')}
            className="px-8 py-3 rounded-full bg-white/5 text-white font-bold hover:bg-white/10 transition-all"
          >
            Reset Filtri
          </button>
        </motion.div>
      )}
    </div>
  );
}

