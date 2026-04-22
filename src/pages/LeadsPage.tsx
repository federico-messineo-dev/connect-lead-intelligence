import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, 
  Download, 
  MapPin, 
  Flame, 
  TrendingUp, 
  MessageSquare, 
  Phone, 
  ArrowRight, 
  UserPlus, 
  Mail,
  Trash2,
  Search,
  MessageCircle,
  Check,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ALL_LEADS } from '../constants';

const SECTORS = ['Tutti i Settori', 'Ristorazione', 'Servizi IT', 'Retail', 'Salute & Benessere', 'Automotive'];

export default function LeadsPage() {
  const navigate = useNavigate();
  const { savedLeads, toggleSaveLead, setSelectedLead } = useAppStore();
  const [activeSector, setActiveSector] = useState('Tutti i Settori');
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const enrichedSavedLeads = savedLeads.map(saved => {
    const latestInfo = ALL_LEADS.find(l => l.id === saved.id);
    return { ...saved, ...latestInfo };
  });

  const filteredLeads = enrichedSavedLeads.filter(l => 
    activeSector === 'Tutti i Settori' || l.category === activeSector
  );

  const handleLeadClick = (leadId: number) => {
    setSelectedLead(leadId);
    navigate('/coach');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const priorityLeads = filteredLeads.filter(l => l.score >= 80);
  const regularLeads = filteredLeads.filter(l => l.score < 80);

  const handleExportCSV = () => {
    if (savedLeads.length === 0) return;

    const headers = ['ID', 'Nome', 'Settore', 'Location', 'Score', 'Mobile', 'Email', 'Telefono'];
    const rows = enrichedSavedLeads.map(lead => [
      lead.id,
      `"${lead.name}"`,
      `"${lead.category}"`,
      `"${lead.location}"`,
      lead.score,
      lead.mobile || '',
      lead.email || '',
      lead.phone || ''
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `saved_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
        <div>
          <h1 className="text-4xl md:text-[3.5rem] font-black tracking-tighter leading-tight text-white mb-1 md:mb-2 text-center md:text-left">
            Archivio Lead
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium text-center md:text-left">
            {savedLeads.length} aziende salvate. <span className="text-primary font-bold">{priorityLeads.length} pronte.</span>
          </p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-3 justify-center md:justify-start">
          <div className="relative flex-1 md:flex-none" ref={filterRef}>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "w-full px-4 md:px-6 py-3 rounded-2xl glass-card flex items-center justify-center gap-2 text-xs md:text-sm font-bold transition-all",
                activeSector !== 'Tutti i Settori' ? "text-primary border-primary/30" : "text-on-surface hover:bg-white/10"
              )}
            >
              <Filter className="w-4 h-4 md:w-5 md:h-5" />
              {activeSector === 'Tutti i Settori' ? 'Filtra' : activeSector}
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full mt-4 right-0 w-64 glass-card border border-white/10 shadow-2xl z-50 p-2"
                >
                  <div className="p-4 border-b border-white/5 mb-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Filtra per Settore</h4>
                  </div>
                  <div className="space-y-1">
                    {SECTORS.map(f => (
                      <button
                        key={f}
                        onClick={() => {
                          setActiveSector(f);
                          setShowFilters(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex justify-between items-center group",
                          activeSector === f ? "bg-primary/20 text-primary" : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                        )}
                      >
                        {f}
                        {activeSector === f && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {activeSector !== 'Tutti i Settori' && (
            <button 
              onClick={() => setActiveSector('Tutti i Settori')}
              className="p-3 rounded-2xl glass-card text-on-surface-variant hover:text-error transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button 
            onClick={handleExportCSV}
            disabled={savedLeads.length === 0}
            className={cn(
              "flex-1 md:flex-none px-4 md:px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dim text-surface flex items-center justify-center gap-2 text-xs md:text-sm font-black shadow-xl shadow-primary/20 transition-all",
              savedLeads.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            )}
          >
            <Download className="w-4 h-4 md:w-5 md:h-5" />
            CSV
          </button>
        </div>
      </div>

      {savedLeads.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="glass-card p-20 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-on-surface-variant">
            <Search className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">Nessun lead salvato</h3>
            <p className="text-on-surface-variant max-w-sm mx-auto">
              Inizia a esplorare il feed e salva le attività che ti interessano per vederle apparire qui.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Priority Leads List */}
          <AnimatePresence>
            {priorityLeads.map(contact => (
              <motion.div 
                layout
                key={contact.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                className="col-span-1 lg:col-span-2 glass-card p-10 relative overflow-hidden group flex flex-col"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 group-hover:bg-primary/20 transition-all duration-700" />
                
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-[28px] glass-card flex items-center justify-center text-3xl font-black text-white shadow-2xl relative overflow-hidden border border-white/10 shrink-0">
                      <img src={contact.image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="relative z-10 drop-shadow-lg">{contact.name.charAt(0)}</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-3xl font-black text-white tracking-tighter capitalize">{contact.name}</h4>
                      <div className="flex items-center gap-3 text-on-surface-variant font-bold text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        {contact.location}
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        {contact.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button 
                      onClick={() => handleLeadClick(contact.id)}
                      className="bg-tertiary/10 text-tertiary px-5 py-2 rounded-full border border-tertiary/30 flex items-center gap-2 hover:bg-tertiary/20 transition-all cursor-pointer"
                    >
                      <Flame className="w-5 h-5 fill-tertiary/20" />
                      <span className="text-sm font-black uppercase tracking-widest">Score: {contact.score}</span>
                    </button>
                    <button 
                      onClick={() => toggleSaveLead(contact)}
                      className="p-2 text-on-surface-variant hover:text-error transition-colors" title="Rimuovi"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 relative z-10">
                  <button 
                    onClick={() => handleLeadClick(contact.id)}
                    className="flex-1 min-w-[200px] py-5 rounded-2xl bg-primary text-surface font-black text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-3 group/pitch"
                  >
                    Vedi Dettagli AI
                    <ArrowRight className="w-6 h-6 group-hover/pitch:translate-x-1 transition-all" />
                  </button>
                  <div className="flex gap-2">
                    <a 
                      href={contact.mobile ? `https://wa.me/${contact.mobile}` : '#'}
                      target={contact.mobile ? "_blank" : undefined}
                      rel="noreferrer"
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                        contact.mobile ? "glass-card border-emerald-500/30 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20" : "bg-white/5 text-on-surface-variant/30 cursor-not-allowed"
                      )}
                      onClick={(e) => !contact.mobile && e.preventDefault()}
                    >
                      <MessageCircle className="w-6 h-6 fill-current opacity-20" />
                    </a>
                    <a 
                      href={contact.email ? `mailto:${contact.email}` : '#'}
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                        contact.email ? "glass-card border-white/10 text-on-surface hover:bg-white/10" : "bg-white/5 text-on-surface-variant/30 cursor-not-allowed"
                      )}
                      onClick={(e) => !contact.email && e.preventDefault()}
                    >
                      <Mail className="w-6 h-6" />
                    </a>
                    <a 
                      href={contact.phone ? `tel:${contact.phone}` : '#'}
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                        contact.phone ? "glass-card border-white/10 text-on-surface hover:bg-white/10" : "bg-white/5 text-on-surface-variant/30 cursor-not-allowed"
                      )}
                      onClick={(e) => !contact.phone && e.preventDefault()}
                    >
                      <Phone className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Regular Leads List */}
          <AnimatePresence>
            {regularLeads.map((contact, i) => (
              <motion.div 
                layout
                key={contact.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-8 flex flex-col group overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center text-xl font-black text-white relative overflow-hidden border border-white/10">
                    <img src={contact.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10" />
                    <span className="relative z-10 drop-shadow-md">{contact.name.charAt(0)}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button 
                      onClick={() => handleLeadClick(contact.id)}
                      className="bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 flex items-center gap-2 hover:bg-primary/20 transition-all cursor-pointer"
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-black">SMM: {contact.score}</span>
                    </button>
                    <button 
                      onClick={() => toggleSaveLead(contact)}
                      className="p-1.5 text-on-surface-variant hover:text-error transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1 mb-8">
                  <h4 className="text-2xl font-black text-on-surface tracking-tighter truncate capitalize">{contact.name}</h4>
                  <div className="flex items-center text-on-surface-variant text-xs font-bold gap-2">
                    <MapPin className="w-3 h-3 text-primary" />
                    {contact.location}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-6 pt-4 border-t border-white/5">
                  <a 
                    href={contact.mobile ? `https://wa.me/${contact.mobile}` : '#'} 
                    target={contact.mobile ? "_blank" : undefined}
                    rel="noreferrer"
                    className={cn(
                      "h-10 flex items-center justify-center rounded-lg transition-colors",
                      contact.mobile ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30" : "bg-white/5 text-on-surface-variant/30 cursor-not-allowed"
                    )}
                    onClick={(e) => !contact.mobile && e.preventDefault()}
                  >
                    <MessageCircle className="w-4 h-4 fill-emerald-500/10" />
                  </a>
                  <a 
                    href={contact.phone ? `tel:${contact.phone}` : '#'} 
                    className={cn(
                      "h-10 flex items-center justify-center rounded-lg transition-colors border",
                      contact.phone ? "glass-card border-white/5 text-on-surface hover:bg-white/10" : "bg-white/5 border-transparent text-on-surface-variant/30 cursor-not-allowed"
                    )}
                    onClick={(e) => !contact.phone && e.preventDefault()}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a 
                    href={contact.email ? `mailto:${contact.email}` : '#'} 
                    className={cn(
                      "h-10 flex items-center justify-center rounded-lg transition-colors border",
                      contact.email ? "glass-card border-white/5 text-on-surface hover:bg-white/10" : "bg-white/5 border-transparent text-on-surface-variant/30 cursor-not-allowed"
                    )}
                    onClick={(e) => !contact.email && e.preventDefault()}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <div className="flex items-center justify-center text-xs font-black text-on-surface-variant/20 italic">
                    ID #{contact.id}
                  </div>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => handleLeadClick(contact.id)}
                    className="w-full py-4 rounded-xl border border-primary/30 text-primary font-black hover:bg-primary/10 transition-all text-xs flex items-center justify-center gap-2 group/btn"
                  >
                    Vedi Dettagli
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-all" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Call to action if leads exist but not many */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card bg-gradient-to-br from-surface-bright/20 to-surface-container-low/20 p-10 flex flex-col items-center justify-center text-center space-y-6 border-white/5 relative overflow-hidden group min-h-[300px]"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-2xl relative z-10 group-hover:scale-110 transition-transform">
              <UserPlus className="w-10 h-10" />
            </div>
            <div className="space-y-2 relative z-10">
              <h4 className="text-2xl font-black text-white tracking-tighter">Trova Altri</h4>
              <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
                Il tuo feed si aggiorna ogni 15 minuti con nuovi potenziali clienti.
              </p>
            </div>
            <button 
              onClick={() => navigate('/feed')}
              className="px-8 py-3 rounded-2xl glass border-white/10 font-bold text-on-surface hover:bg-white/10 transition-all relative z-10"
            >
              Torna al Feed
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
