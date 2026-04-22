import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  LayoutDashboard, 
  Settings, 
  UserCircle, 
  Bell, 
  Search, 
  Bookmark, 
  Sparkles,
  ChevronRight,
  LogOut,
  Star,
  PanelLeftClose,
  PanelLeftOpen,
  AlertTriangle,
  Menu,
  Home,
  Database,
  Users,
  X
} from 'lucide-react';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAppStore } from '../store';
import { ALL_LEADS } from '../constants';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Home/Feed', path: '/feed' },
  { icon: BarChart3, label: 'Configura Ricerca', path: '/config' },
  { icon: Bookmark, label: 'Attività Salvate', path: '/leads' },
  { icon: Sparkles, label: 'AI Coach', path: '/coach' },
  { icon: Settings, label: 'Impostazioni', path: '/settings' },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, notifications, markNotificationAsRead } = useAppStore();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof ALL_LEADS>([]);
  const setSelectedLead = useAppStore(state => state.setSelectedLead);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = ALL_LEADS.filter(lead => 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close search and notifications on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
        setSearchQuery('');
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLead = (id: number) => {
    setSelectedLead(id);
    setShowSearch(false);
    setSearchQuery('');
    navigate('/coach');
  };

  // If we are on the login or register page, don't show the layout
  const isAuthPage = ['/', '/login', '/register'].includes(location.pathname);
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden bg-surface">
      {/* Background Mesh */}
      <div className="fixed inset-0 z-0 mesh-bg opacity-30 blur-[100px] pointer-events-none" />
      
      {/* Mobile Navbar (Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface/80 backdrop-blur-3xl border-t border-white/5 z-[100] flex items-center justify-around px-4">
        {navItems.slice(0, 4).map((item) => {
          const isCoach = item.path === '/coach';
          const isActive = location.pathname.startsWith(item.path);
          const onCoachPage = location.pathname === '/coach';
          
          if (isCoach) {
            return (
              <button
                key={item.path}
                disabled={!onCoachPage}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 transition-all",
                  onCoachPage ? "text-primary scale-110" : "text-on-surface-variant opacity-30 cursor-not-allowed"
                )}
              >
                <item.icon className={cn("w-6 h-6", onCoachPage && "fill-primary/20")} />
                <span className="text-[10px] font-black uppercase tracking-tighter">{item.label.split('/')[0]}</span>
              </button>
            );
          }
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 transition-all",
                isActive ? "text-primary scale-110" : "text-on-surface-variant opacity-60"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label.split('/')[0]}</span>
            </NavLink>
          );
        })}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 p-2 text-on-surface-variant opacity-60"
        >
          <Menu className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Menu</span>
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[150] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-80 h-full bg-surface-container-low border-l border-white/10 p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-tertiary flex items-center justify-center">
                    <Sparkles className="text-surface w-6 h-6 fill-surface" />
                  </div>
                  <span className="text-xl font-black text-white">Menu</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-on-surface-variant">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isCoach = item.path === '/coach';
                  const isActive = location.pathname.startsWith(item.path);
                  const onCoachPage = location.pathname === '/coach';
                  
                  if (isCoach) {
                    return (
                      <button
                        key={item.path}
                        disabled={!onCoachPage}
                        onClick={() => !onCoachPage && setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-2xl transition-all",
                          onCoachPage ? "bg-primary text-surface font-black" : "text-on-surface-variant/40 cursor-not-allowed"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-bold">{item.label}</span>
                      </button>
                    );
                  }
                  
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl transition-all",
                        isActive ? "bg-primary text-surface font-black" : "text-on-surface hover:bg-white/5"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-bold">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-4 p-4 text-on-surface font-bold hover:bg-white/5 rounded-2xl transition-all"
                >
                  <UserCircle className="w-5 h-5" />
                  Profilo & Account
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="w-full flex items-center gap-4 p-4 text-error font-black hover:bg-error/10 rounded-2xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Sidebar (Desktop Only) */}
      <motion.nav 
        initial={false}
        animate={{ width: isCollapsed ? 100 : 288 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="hidden md:flex fixed left-0 top-0 h-screen glass border-r-0 flex-col p-6 z-50 overflow-hidden"
      >
        {/* Brand & Toggle */}
        <div className={cn(
          "flex items-center gap-3 px-2 mb-10 transition-all duration-500",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-tertiary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                <Sparkles className="text-surface w-6 h-6 fill-surface" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-br from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                  Connect
                </h1>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.2em]">
                  Lead Intelligence
                </p>
              </div>
            </motion.div>
          )}
          
          {isCollapsed && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-tertiary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <Sparkles className="text-surface w-6 h-6 fill-surface" />
            </div>
          )}
        </div>

        {/* Links */}
        <div className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isCoach = item.path === '/coach';
            const isActive = location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={isCoach ? '#' : item.path}
                onClick={(e) => {
                  if (isCoach) {
                    e.preventDefault();
                  }
                }}
                className={({ isActive: isLinkActive }) => cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative",
                  isLinkActive 
                    ? "active-item text-white font-bold" 
                    : "text-on-surface-variant hover:text-on-surface hover:bg-white/5",
                  isCoach && !isActive && "opacity-50 cursor-default hover:bg-transparent hover:text-on-surface-variant",
                  isCollapsed && "justify-center px-0 h-12"
                )}
              >
                <>
                  <item.icon className={cn("w-5 h-5 shrink-0 transition-transform duration-300", isActive && "fill-primary/20", isCollapsed && "scale-110")} />
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  
                  {!isCollapsed && isCoach && !isActive && (
                    <span className="ml-2 text-[8px] font-black uppercase tracking-tighter bg-white/5 px-1.5 py-0.5 rounded border border-white/5 opacity-50 shrink-0">
                      Context
                    </span>
                  )}
                  
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                    />
                  )}
                  
                  {!isCollapsed && (
                    <ChevronRight className={cn(
                      "ml-auto w-4 h-4 opacity-0 -translate-x-2 transition-all shrink-0",
                      isActive ? "opacity-100 translate-x-0 text-primary" : (!isCoach && "group-hover:opacity-100 group-hover:translate-x-0")
                    )} />
                  )}
                </>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={cn("mt-auto pt-6", isCollapsed && "items-center flex flex-col")}>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 group relative overflow-hidden transition-all",
              isCollapsed ? "justify-center p-3 h-12" : ""
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
              <Star className="w-5 h-5 fill-secondary" />
            </div>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-left relative z-10 overflow-hidden whitespace-nowrap"
              >
                <p className="text-xs font-bold text-secondary tracking-wide uppercase">Upgrade Plan</p>
                <p className="text-[10px] text-on-surface-variant">Pro Plan • 70% used</p>
              </motion.div>
            )}
          </motion.button>
          
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className={cn(
              "w-full mt-4 flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error transition-colors text-xs font-medium relative z-10",
              isCollapsed ? "justify-center px-0" : ""
            )}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Sign Out</span>}
          </button>
        </div>
      </motion.nav>

      {/* Logout Confirmation Popup */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-surface/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm glass-card p-8 border-white/10 shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-error/10 border border-error/20 flex items-center justify-center text-error mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">Sei sicuro?</h3>
                <p className="text-on-surface-variant text-sm font-medium">Stai per uscire dalla tua sessione attuale.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 rounded-xl glass border-white/5 text-on-surface font-bold text-sm hover:bg-white/10 transition-all"
                >
                  Annulla
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="flex-1 py-3 rounded-xl bg-error text-white font-black text-sm shadow-xl shadow-error/20 hover:opacity-90 transition-all"
                >
                  Esci ora
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div 
        className="flex-1 flex flex-col min-w-0 md:ml-0"
      >
        {/* Top bar (Desktop) */}
        <header className="hidden md:flex h-20 items-center justify-between px-10 border-b border-white/5 sticky top-0 bg-surface/80 backdrop-blur-3xl z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20 group"
              title={isCollapsed ? "Espandi menu" : "Comprimi menu"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <PanelLeftClose className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {navItems.find(i => location.pathname.startsWith(i.path))?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <div className={cn(
                "flex items-center bg-white/5 rounded-full h-11 transition-all duration-500 border overflow-hidden",
                showSearch ? "w-96 border-primary/40 bg-white/10 px-4" : "w-11 border-transparent justify-center"
              )}>
                <button 
                  onClick={() => setShowSearch(!showSearch)} 
                  className={cn(
                    "transition-colors shrink-0 flex items-center justify-center",
                    showSearch ? "text-primary mr-3" : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  <Search className="w-5 h-5" />
                </button>
                {showSearch && (
                  <motion.input 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cerca per nome o settore..." 
                    className="bg-transparent border-none text-sm focus:ring-0 placeholder:text-on-surface-variant/50 w-full text-white"
                  />
                )}
              </div>

              {/* Results Dropdown */}
              <AnimatePresence>
                {showSearch && searchQuery.length > 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-4 right-0 w-96 glass-card border border-white/10 shadow-2xl overflow-hidden z-50"
                  >
                    <div className="max-h-[400px] overflow-y-auto">
                      {searchResults.length > 0 ? (
                        <div className="p-2 space-y-1">
                          {searchResults.map((lead) => (
                            <button
                              key={lead.id}
                              onClick={() => handleSelectLead(lead.id)}
                              className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all text-left group"
                            >
                              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/5">
                                <img src={lead.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">{lead.name}</p>
                                <p className="text-xs text-on-surface-variant truncate">{lead.category} • {lead.location}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-[10px] font-black text-secondary bg-secondary/10 px-2 py-1 rounded-md border border-secondary/20">
                                  {lead.score}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-10 text-center space-y-2">
                          <p className="text-sm font-bold text-white">Nessun risultato</p>
                          <p className="text-xs text-on-surface-variant">Prova a cambiare i termini di ricerca.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-4 py-1.5 rounded-full glass border-secondary/20 text-[10px] font-black uppercase tracking-[0.1em] text-secondary">
              Pro Plan Member
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div ref={notifRef} className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={cn(
                    "p-2 rounded-xl transition-all relative group",
                    showNotifications ? "bg-primary/20 text-primary" : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                  )}
                >
                  <Bell className="w-5 h-5 focus:animate-bell" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-tertiary rounded-full border-2 border-surface text-[10px] font-black text-surface flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full mt-4 right-0 w-80 bg-surface/95 backdrop-blur-3xl border border-white/20 shadow-2xl overflow-hidden z-50 p-2 rounded-[24px]"
                    >
                      <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Notifiche</h3>
                        <span className="text-[9px] font-black bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20">AGENT READY</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto space-y-1.5 p-1 mt-1">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <button
                              key={n.id}
                              onClick={() => {
                                markNotificationAsRead(n.id);
                              }}
                              className={cn(
                                "w-full text-left p-4 rounded-xl transition-all relative overflow-hidden group",
                                n.read ? "opacity-40 grayscale-[0.5]" : "bg-white/5 hover:bg-white/10"
                              )}
                            >
                              {!n.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary" />}
                              <div className="space-y-1.5">
                                <p className="text-xs font-black text-white tracking-tight">{n.title}</p>
                                <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed">
                                  {n.message}
                                </p>
                                <div className="flex items-center justify-between pt-1">
                                  <p className="text-[9px] font-black text-primary uppercase tracking-tighter opacity-80">
                                    {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                  {!n.read && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                  )}
                                </div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="py-12 text-center">
                            <Bell className="w-8 h-8 text-white/10 mx-auto mb-3" />
                            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Nessuna notifica</p>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-white/[0.02] mt-1 rounded-xl border border-white/5">
                        <p className="text-[9px] text-on-surface-variant font-medium text-center italic">
                          Le notifiche vengono salvate nella sessione.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => navigate('/settings')}
                className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 p-0.5 group shrink-0"
              >
                <div className="w-full h-full rounded-[10px] overflow-hidden">
                  <img 
                    src={user.avatar} 
                    alt="User" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                  />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Top bar (Mobile) */}
        <header className="md:hidden flex h-20 items-center justify-between px-6 border-b border-white/5 sticky top-0 bg-surface/80 backdrop-blur-3xl z-40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-tertiary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <Sparkles className="text-surface w-6 h-6 fill-surface" />
            </div>
            <h1 className="text-xl font-black text-white tracking-tighter">Connect</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-on-surface-variant relative"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-tertiary rounded-full border-2 border-surface animate-pulse" />}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="fixed inset-x-4 top-24 max-h-[60vh] bg-surface-container-high border border-white/10 shadow-2xl overflow-hidden z-[200] p-2 rounded-[24px]"
                  >
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-surface-container-high sticky top-0">
                      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Notifiche</h3>
                      <button onClick={() => setShowNotifications(false)}><X className="w-4 h-4 text-on-surface-variant" /></button>
                    </div>
                    <div className="overflow-y-auto space-y-1.5 p-1 mt-1">
                      {notifications.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => { markNotificationAsRead(n.id); setShowNotifications(false); }}
                          className={cn("w-full text-left p-4 rounded-xl transition-all relative overflow-hidden", n.read ? "opacity-40" : "bg-white/5")}
                        >
                          <p className="text-xs font-black text-white">{n.title}</p>
                          <p className="text-[10px] text-on-surface-variant">{n.message}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={() => navigate('/settings')}
              className="w-10 h-10 rounded-full border border-white/10 overflow-hidden"
            >
              <img src={user.avatar} alt="" className="w-full h-full object-cover" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 md:p-10 flex-1 overflow-x-hidden min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-[1400px] mx-auto pb-24 md:pb-0"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
