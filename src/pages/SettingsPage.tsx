import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  ShieldCheck, 
  Cpu, 
  CreditCard,
  Bell,
  HelpCircle,
  Bolt,
  ChevronRight,
  Info,
  X,
  Check,
  Lock,
  Mail
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { useAppStore } from '../store';

const PROFILE_AVATARS = [
  'https://picsum.photos/seed/mario/200/200',
  'https://picsum.photos/seed/lucia/200/200',
  'https://picsum.photos/seed/paolo/200/200',
  'https://picsum.photos/seed/giulia/200/200',
  'https://picsum.photos/seed/marco/200/200',
  'https://picsum.photos/seed/anna/200/200',
  'https://picsum.photos/seed/roberto/200/200',
  'https://picsum.photos/seed/elena/200/200',
  'https://picsum.photos/seed/stefano/200/200',
  'https://picsum.photos/seed/chiara/200/200',
];

export default function SettingsPage() {
  const { user, updateUser } = useAppStore();
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [apiAlertEnabled, setApiAlertEnabled] = useState(true);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showBillingPopup, setShowBillingPopup] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);
  
  const [editForm, setEditForm] = useState({ ...user, password: '' });

  // Sync edit form with store if store user changes
  useEffect(() => {
    setEditForm({ ...user, password: '' });
  }, [user]);

  const handleSaveProfile = () => {
    updateUser({
      name: editForm.name,
      email: editForm.email,
      avatar: editForm.avatar,
      workspace: editForm.workspace
    });
    setShowEditPopup(false);
  };

  return (
    <div className="space-y-12 pb-20 relative">
      {/* Popups */}
      <AnimatePresence>
        {showEditPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditPopup(false)}
              className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass-card p-10 border-white/10 shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-white tracking-tight">Modifica Profilo</h3>
                  <p className="text-on-surface-variant text-sm font-medium">Personalizza la tua identità su Connect.</p>
                </div>
                <button 
                  onClick={() => setShowEditPopup(false)}
                  className="p-2 rounded-full hover:bg-white/5 text-on-surface-variant transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Avatar Selection */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Scegli Immagine Profilo</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4">
                  {PROFILE_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setEditForm(prev => ({ ...prev, avatar: url }))}
                      className={cn(
                        "relative w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all group",
                        editForm.avatar === url ? "border-primary scale-105 shadow-lg shadow-primary/20" : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                      {editForm.avatar === url && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                      <input 
                        type="email" 
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-surface-container-lowest/30 border border-white/5 rounded-full pl-11 pr-6 py-3 text-sm font-bold text-on-surface focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-2">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                      <input 
                        type="password" 
                        placeholder="Lascia vuoto per non cambiare"
                        value={editForm.password}
                        onChange={(e) => setEditForm(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full bg-surface-container-lowest/30 border border-white/5 rounded-full pl-11 pr-6 py-3 text-sm font-bold text-on-surface focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-1">Nome Completo</label>
                    <input 
                      type="text" 
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-surface-container-lowest/30 border border-white/5 rounded-full px-6 py-3 text-sm font-bold text-on-surface focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-2">Workspace</label>
                    <input 
                      type="text" 
                      value={editForm.workspace}
                      onChange={(e) => setEditForm(prev => ({ ...prev, workspace: e.target.value }))}
                      className="w-full bg-surface-container-lowest/30 border border-white/5 rounded-full px-6 py-3 text-sm font-bold text-on-surface focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowEditPopup(false)}
                  className="flex-1 py-4 rounded-full border border-white/5 text-sm font-black text-on-surface-variant hover:bg-white/5 hover:text-white transition-all"
                >
                  Annulla
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex-1 py-4 rounded-full bg-gradient-to-r from-primary to-primary-dim text-surface font-black shadow-xl shadow-primary/20 hover:opacity-90 transition-all"
                >
                  Salva Modifiche
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showBillingPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBillingPopup(false)}
              className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-card p-10 border-white/10 shadow-2xl space-y-8"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-white tracking-tight">Gestione Fatturazione</h3>
                  <p className="text-on-surface-variant text-sm font-medium">Controlla il tuo piano e i pagamenti.</p>
                </div>
                <button 
                  onClick={() => setShowBillingPopup(false)}
                  className="p-2 rounded-full hover:bg-white/5 text-on-surface-variant transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {isSubscribed ? (
                <div className="space-y-8">
                  <div className="bg-surface-container-lowest/30 rounded-3xl p-8 border border-white/5 space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Piano Attuale</p>
                        <p className="text-2xl font-black text-white">Pro Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-white">€79,90</p>
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Al mese</p>
                      </div>
                    </div>
                    
                    <div className="h-px bg-white/5" />
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#003087]/10 flex items-center justify-center border border-[#003087]/20">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.007 6.463c-.157-.775-.436-1.423-.836-1.933-.51-.652-1.246-.983-2.193-.983H6.84a1.21 1.21 0 0 0-1.144 1.146l-2.073 13.1c-.04.254.14.478.368.5l2.673.25c.231.022.454-.15.523-.396l.872-3.111c.07-.247.29-.42.52-.42h3.332c3.486 0 5.485-1.743 5.485-5.385 0-.963-.146-1.841-.47-2.628-.276-.669-.728-1.127-1.353-1.14z" fill="#003087"/>
                          <path d="M12.924 10.973c1.01 0 1.764-.09 2.215-.27.424-.168.749-.444.97-.822.18-.31.282-.705.282-1.173 0-.583-.122-1.018-.363-1.306-.307-.367-.843-.55-1.603-.55h-2.162c-.22 0-.414.162-.44.4l-.59 3.32c-.015.086.046.162.124.162h1.567z" fill="#003087"/>
                          <path d="M11.666 11.23H8.334c-.23 0-.45.174-.52.42l-.872 3.11c-.07.247-.456.284-.687.262l-2.672-.25a.342.342 0 0 1-.301-.337V14.3l.53-3.323c.026-.238.22-.4.44-.4h4.166s.54.025.86.353c.273.284.227.64.227.64z" fill="#009CDE"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">Metodo di Pagamento</p>
                        <p className="text-xs text-on-surface-variant font-medium">PayPal • federico.***@gmail.com</p>
                      </div>
                      <Check className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={() => {
                        // In a real app, this would call an API
                        setIsSubscribed(false);
                      }}
                      className="w-full py-4 rounded-xl border border-error/20 text-error font-black hover:bg-error/5 transition-all text-sm uppercase tracking-widest"
                    >
                      Disattiva Abbonamento
                    </button>
                    <p className="text-[10px] text-on-surface-variant font-bold text-center uppercase tracking-widest leading-relaxed px-4">
                      La disattivazione avrà effetto alla fine del periodo di fatturazione corrente (15 Nov 2026).
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-8 py-10">
                  <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto text-error border border-error/20">
                    <X className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-white">Abbonamento Disattivato</h4>
                    <p className="text-on-surface-variant text-sm font-medium">
                      Il tuo piano Pro scadrà il 15 Nov 2026. <br />Puoi riattivarlo in qualsiasi momento per non perdere i tuoi dati.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsSubscribed(true)}
                    className="w-full py-4 rounded-full bg-primary text-surface font-black shadow-xl shadow-primary/20 hover:opacity-90 transition-all"
                  >
                    Riattiva Pro Plan
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-[3.5rem] font-black tracking-tighter leading-tight text-white mb-2">
          Impostazioni
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant font-medium max-w-2xl mx-auto md:mx-0">
          Gestisci il tuo profilo, l'abbonamento e le impostazioni del sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col */}
        <div className="lg:col-span-1 space-y-8">
          {/* User Profile */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 space-y-8 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Profilo Utente</h3>
            </div>

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-full glass border-white/10 p-1">
                <img 
                  src={user.avatar} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black text-white px-1">{user.name}</h4>
                <p className="text-sm text-on-surface-variant px-1 font-bold">{user.email}</p>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-2">Nome Workspace</label>
                <input 
                  type="text" 
                  readOnly
                  value={user.workspace}
                  className="w-full bg-surface-container-lowest/30 border border-white/5 rounded-full px-6 py-3 text-sm font-bold text-on-surface-variant focus:outline-none cursor-default"
                />
              </div>
              <button 
                onClick={() => {
                  setEditForm({ ...user, password: '' });
                  setShowEditPopup(true);
                }}
                className="w-full py-4 rounded-full border-2 border-white/5 text-sm font-black hover:bg-white/5 transition-all text-white"
              >
                Modifica Profilo
              </button>
            </div>
          </motion.section>

          {/* Subscription */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 space-y-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 font-bold">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Abbonamento</h3>
            </div>

            <div className="bg-surface-container-lowest/30 rounded-3xl p-6 border border-white/5 relative z-10 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-secondary font-black tracking-tight">{isSubscribed ? 'Pro Plan' : 'Piano Sospeso'}</span>
                <span className={cn(
                  "text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-widest",
                  isSubscribed 
                    ? "bg-secondary/10 text-secondary border-secondary/20" 
                    : "bg-error/10 text-error border-error/20"
                )}>
                  {isSubscribed ? 'Attivo' : 'Disattivato'}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                {isSubscribed ? 'Fatturato mensilmente.' : 'L\'abbonamento non è attivo.'} <br /> 
                {isSubscribed && 'Prossimo rinnovo: 15 Nov 2026.'}
              </p>
              <div className="space-y-2">
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={cn("h-full", isSubscribed ? "bg-secondary" : "bg-on-surface-variant/20")} style={{ width: '70%' }} />
                </div>
                <p className="text-[10px] text-on-surface-variant font-bold text-right uppercase tracking-widest">70 / 100 Leads Generati</p>
              </div>
            </div>

            <button 
              onClick={() => setShowBillingPopup(true)}
              className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-dim text-surface font-black shadow-xl shadow-primary/20 hover:opacity-90 transition-all relative z-10"
            >
              Gestisci Fatturazione
            </button>
          </motion.section>
        </div>

        {/* Right Col */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tokens & API */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 space-y-8 group relative overflow-hidden"
          >
             <div className="absolute right-0 top-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
               <Cpu className="w-48 h-48 text-tertiary" />
             </div>
             <div className="flex items-center gap-4 relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20">
                 <Cpu className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold">Token e Limiti API</h3>
             </div>
             <p className="text-on-surface-variant text-lg leading-relaxed relative z-10">
               Ogni operazione di "ricerca attività" o "analisi AI" consuma token. Questo perché utilizziamo risorse cloud avanzate e modelli di intelligenza artificiale di ultima generazione per elaborare i dati dei tuoi lead con la massima precisione e velocità.
             </p>
             <div className="bg-surface-container-lowest/30 rounded-3xl p-8 border border-white/5 relative z-10 flex gap-6 items-start">
               <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                 <Bolt className="w-6 h-6 fill-secondary/20" />
               </div>
               <div className="space-y-2">
                 <h4 className="text-xl font-bold text-white tracking-tight">Vantaggi del Pro Plan</h4>
                 <p className="text-on-surface-variant leading-relaxed">
                   Con il tuo abbonamento Pro, hai a disposizione un limite giornaliero elevato che ti permette di eseguire operazioni complesse senza interruzioni. Il conteggio dei token si resetta automaticamente ogni 24 ore.
                 </p>
               </div>
             </div>
          </motion.section>

          {/* Preferences */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-10 space-y-8"
          >
             <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                    <Bolt className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Preferenze di Sistema</h3>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex items-center justify-between p-6 rounded-3xl hover:bg-white/5 transition-all group">
                   <div className="space-y-1">
                     <h4 className="font-bold text-lg text-white">Notifiche Email</h4>
                     <p className="text-sm text-on-surface-variant">Ricevi report settimanali sulle performance della ricerca.</p>
                   </div>
                   <button 
                     onClick={() => setNotifEnabled(!notifEnabled)}
                     className={cn(
                       "w-14 h-8 rounded-full relative transition-all duration-500",
                       notifEnabled ? "bg-primary shadow-[0_0_20px_rgba(0,112,235,0.4)]" : "bg-white/10"
                     )}
                   >
                     <motion.div 
                       animate={{ x: notifEnabled ? 28 : 4 }}
                       className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg" 
                     />
                   </button>
                </div>

                <div className="flex items-center justify-between p-6 rounded-3xl hover:bg-white/5 transition-all group">
                   <div className="space-y-1">
                     <h4 className="font-bold text-lg text-white">Avvisi di Limite API</h4>
                     <p className="text-sm text-on-surface-variant">Notifica quando raggiungi l'80% del limite del piano.</p>
                   </div>
                   <button 
                     onClick={() => setApiAlertEnabled(!apiAlertEnabled)}
                     className={cn(
                       "w-14 h-8 rounded-full relative transition-all duration-500",
                       apiAlertEnabled ? "bg-primary shadow-[0_0_20px_rgba(0,112,235,0.4)]" : "bg-white/10"
                     )}
                   >
                     <motion.div 
                       animate={{ x: apiAlertEnabled ? 28 : 4 }}
                       className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg" 
                     />
                   </button>
                </div>
             </div>

             <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <button className="flex items-center gap-3 text-secondary font-bold hover:text-secondary-dim transition-colors group">
                   <HelpCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                   <span>Centro di Supporto</span>
                </button>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                  <Info className="w-3 h-3" />
                  Connect v2.4.1
                </div>
             </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
