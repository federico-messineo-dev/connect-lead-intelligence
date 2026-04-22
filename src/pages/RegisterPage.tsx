import { motion } from 'motion/react';
import { 
  Zap, 
  Lock, 
  Github, 
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Building
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { FormEvent } from 'react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    navigate('/feed');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6 bg-surface">
      
      {/* Background Mesh Layer */}
      <div className="absolute inset-0 z-0 mesh-bg opacity-30 blur-[80px]" />
      
      {/* Additional Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/20 blur-[150px] mix-blend-screen" />
      </div>

      <motion.main 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg p-10 glass-card shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] space-y-10"
      >
        {/* Header */}
        <header className="text-center space-y-6 flex flex-col items-center">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-primary via-secondary to-tertiary flex items-center justify-center shadow-2xl shadow-primary/30"
          >
            <Zap className="w-8 h-8 text-surface fill-surface" />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-br from-primary via-secondary to-tertiary bg-clip-text text-transparent">
              Crea un Account
            </h1>
            <p className="text-on-surface-variant text-sm font-medium">Inizia a scalare la tua agenzia con Connect</p>
          </div>
        </header>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-2">Nome Completo</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Mario Rossi"
                  className="w-full bg-surface-container-lowest/30 border-none rounded-full py-3.5 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none text-on-surface text-sm"
                />
              </div>
            </div>

            {/* Workspace */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-2">Agenzia / Workspace</label>
              <div className="relative group">
                <Building className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Connect Agency"
                  className="w-full bg-surface-container-lowest/30 border-none rounded-full py-3.5 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none text-on-surface text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-2">Email Lavorativa</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-surface-container-lowest/30 border-none rounded-full py-3.5 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none text-on-surface text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-surface-container-lowest/30 border-none rounded-full py-3.5 pl-12 pr-14 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none text-on-surface text-sm"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-dim text-surface font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:shadow-inner transition-all mt-4"
          >
            Registrati ora
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>

        {/* Separator */}
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink-0 mx-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">O registrati con</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        {/* Social */}
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center justify-center gap-2 py-3 rounded-2xl glass border-white/5 hover:bg-white/10 transition-colors">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] font-black text-surface shrink-0">G</div>
            <span className="text-[10px] font-bold">Google</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-2 py-3 rounded-2xl glass border-white/5 hover:bg-white/10 transition-colors">
            <Github className="w-5 h-5 shrink-0" />
            <span className="text-[10px] font-bold">GitHub</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-2 py-3 rounded-2xl glass border-white/5 hover:bg-white/10 transition-colors">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-surface" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05 1.72-3.14 1.72-1.07 0-1.42-.66-2.65-.66-1.25 0-1.64.64-2.64.66-1.05.02-2-1.12-3.13-2.18-1.78-1.55-3.1-4.38-3.1-6.87 0-3.88 2.5-5.92 4.9-5.92 1.25 0 2.45.86 3.22.86.75 0 2.22-.92 3.75-.78 1.48.1 2.22.68 2.72 1.3-1.22.75-2.05 2.15-2.05 3.55 0 1.95 1.45 3.32 3.12 3.32.08 0 .15 0 .23-.01a7.22 7.22 0 0 1-.98 2.94M12.03 5.4c.05-1.5.83-2.88 2.05-3.82-1.05-.12-2.18.28-3.05 1.1-.88.85-1.58 2.2-1.42 3.65 1.28.1 2.38-.93 2.42-.93z"/>
              </svg>
            </div>
            <span className="text-[10px] font-bold">Apple</span>
          </button>
        </div>

        <p className="text-center text-sm text-on-surface-variant">
          Hai già un account? <Link to="/login" className="text-primary font-bold hover:underline">Accedi</Link>
        </p>
      </motion.main>
    </div>
  );
}
