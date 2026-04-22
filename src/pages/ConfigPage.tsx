import { motion } from 'motion/react';
import { 
  Rocket, 
  MapPin, 
  Store, 
  Search, 
  X, 
  PlusCircle, 
  Key,
  Database,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAppStore } from '../store';
import { ALL_LEADS } from '../constants';

export default function ConfigPage() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState(['Ristoranti', 'Hotel & Ospitalità']);
  const [isSearching, setIsSearching] = useState(false);
  const { setSearchPerformedThisSession, setSearchResultsCount, setIsSearching: setGlobalIsSearching } = useAppStore();

  const categories = ['Servizi B2B', 'Retail & Negozi', 'Professionisti', 'Sanità & Benessere', 'Logistica'];

  const handleStartSearch = () => {
    setIsSearching(true);
    setGlobalIsSearching(true);
    
    setTimeout(() => {
      setIsSearching(false);
      setGlobalIsSearching(false);
      setSearchPerformedThisSession(true);
      setSearchResultsCount(ALL_LEADS.length);
      navigate('/feed');
    }, 7000);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Header */}
      <div className="max-w-2xl space-y-3 md:space-y-4 text-center md:text-left">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-black tracking-tighter leading-tight"
        >
          Definisci il tuo <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
            Target Ideale.
          </span>
        </motion.h1>
        <p className="text-on-surface-variant text-base md:text-lg">
          Configura i parametri di ricerca per estrarre lead altamente qualificati dalla rete.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Col: Main Inputs */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Location Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 md:p-8 group overflow-hidden"
          >
            <div className="flex gap-4 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 fill-primary/20" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-bold">Località <span className="text-tertiary">*</span></h3>
                <p className="text-xs md:text-sm text-on-surface-variant">Seleziona la città, provincia o regione target.</p>
              </div>
            </div>

            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Es. Milano, Lombardia, Italia..."
                className="w-full bg-surface-container-lowest/30 border border-white/5 rounded-full py-5 pl-14 pr-8 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest/50 transition-all outline-none"
              />
            </div>
          </motion.div>

          {/* Category Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 md:p-8 group overflow-hidden"
          >
            <div className="flex gap-4 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                <Store className="w-5 h-5 md:w-6 md:h-6 fill-secondary/20" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-bold">Categoria Attività <span className="text-tertiary">*</span></h3>
                <p className="text-xs md:text-sm text-on-surface-variant">Seleziona uno o più settori merceologici.</p>
              </div>
            </div>

            {/* Selected Chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {selectedCategories.map(cat => (
                <motion.span 
                  layout
                  key={cat}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-bold backdrop-blur-md"
                >
                  {cat}
                  <button onClick={() => setSelectedCategories(s => s.filter(c => c !== cat))} className="hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </motion.span>
              ))}
            </div>

            {/* Selection Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => !selectedCategories.includes(cat) && setSelectedCategories([...selectedCategories, cat])}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-full border border-white/5 text-sm font-bold text-on-surface-variant hover:bg-white/10 hover:text-on-surface transition-all group/btn"
                >
                  {cat}
                  <PlusCircle className="w-5 h-5 text-on-surface-variant group-hover/btn:text-primary transition-colors" />
                </button>
              ))}
              <input 
                type="text" 
                placeholder="Altra categoria..."
                className="bg-white/5 rounded-full border border-white/5 px-6 py-4 text-sm outline-none focus:ring-1 focus:ring-secondary/20"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Col: Meta & Actions */}
        <div className="space-y-8">
          {/* Keywords Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 h-fit overflow-hidden"
          >
            <div className="flex gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20">
                <Key className="w-6 h-6 fill-tertiary/20" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Parole Chiave</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-tertiary/60">Opzionale</p>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              Affina i risultati cercando termini specifici nei siti web o nelle descrizioni.
            </p>
            <textarea 
              rows={4}
              placeholder="Es. gluten free, pet friendly, software gestionale..."
              className="w-full bg-surface-container-lowest/30 border border-white/5 rounded-[24px] p-6 text-on-surface outline-none focus:ring-2 focus:ring-tertiary/20 resize-none transition-all placeholder:text-on-surface-variant/30"
            />
          </motion.div>

          {/* Stats Mini Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 space-y-6 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-on-surface-variant">Ricerche Attive</span>
              </div>
              <span className="bg-primary/20 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-black">3 / 5</span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="space-y-1">
              <span className="text-sm font-medium text-on-surface-variant">Lead Trovati (Oggi)</span>
              <p className="text-4xl font-black text-white">1,248</p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Floating Bottom Action */}
      <div className="fixed bottom-24 md:bottom-10 inset-x-6 md:left-auto md:right-10 flex flex-col items-center md:items-end gap-4 z-30">
        <motion.button 
          whileHover={{ scale: isSearching ? 1 : 1.05, y: isSearching ? 0 : -5 }}
          whileTap={{ scale: isSearching ? 1 : 0.95 }}
          onClick={handleStartSearch}
          disabled={isSearching}
          className={cn(
            "w-full md:w-auto text-surface font-black text-lg px-8 md:px-12 py-4 md:py-5 rounded-full shadow-[0_20px_50px_rgba(0,112,235,0.3)] flex items-center justify-center gap-3",
            isSearching ? "bg-white/10 cursor-not-allowed" : "bg-gradient-to-r from-primary to-primary-dim active:shadow-inner"
          )}
        >
          {isSearching ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Ricerca in corso...
            </>
          ) : (
            <>
              <Rocket className="w-6 h-6 fill-surface" />
              Avvia Ricerca
            </>
          )}
        </motion.button>
      </div>

    </div>
  );
}
