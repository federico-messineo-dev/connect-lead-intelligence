import { motion } from 'motion/react';
import { Search, MapPin, Store, Trash2, Users, Calendar, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, Lead } from '../store';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { searchHistory, deleteFromSearchHistory, clearSearchHistory } = useAppStore();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewResults = (leadsFound: Lead[]) => {
    navigate('/feed');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFromSearchHistory(id);
  };

  if (searchHistory.length === 0) {
    return (
      <div className="space-y-12 pb-20">
        <div className="max-w-2xl space-y-3 md:space-y-4 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tighter leading-tight"
          >
            Cronologia <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Ricerche</span>
          </motion.h1>
          <p className="text-on-surface-variant text-base md:text-lg">
            Le tue ricerche salveranno qui. Nessuna ricerca effettuata ancora.
          </p>
        </div>

        <div className="glass-card p-12 text-center">
          <Search className="w-16 h-16 mx-auto mb-4 text-on-surface-variant/30" />
          <h3 className="text-xl font-bold text-on-surface mb-2">Nessuna Cronologia</h3>
          <p className="text-on-surface-variant">Effettua una ricerca per iniziare a costruire la tua cronologia.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-2xl space-y-3 md:space-y-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tighter leading-tight"
          >
            Cronologia <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Ricerche</span>
          </motion.h1>
          <p className="text-on-surface-variant text-base md:text-lg">
            Visualizza e gestisci tutte le tue ricerche precedenti.
          </p>
        </div>

        <button 
          onClick={clearSearchHistory}
          className="text-sm font-medium text-error hover:text-error/80 transition-colors"
        >
          Cancella tutto
        </button>
      </div>

      <div className="space-y-4">
        {searchHistory.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 md:p-8 hover:border-primary/30 transition-colors cursor-pointer group"
            onClick={() => handleViewResults(entry.leadsFound)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 text-on-surface">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-bold text-lg">{entry.location}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {entry.categories.map((cat) => (
                    <span 
                      key={cat}
                      className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(entry.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {entry.resultsCount} lead
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleDelete(entry.id, e)}
                  className="p-2 text-on-surface-variant hover:text-error transition-colors rounded-full hover:bg-error/10"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}