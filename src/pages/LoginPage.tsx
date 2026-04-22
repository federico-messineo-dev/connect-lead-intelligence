import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  MessageSquare, 
  Lock, 
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { FormEvent } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    navigate('/feed');
  };

  const handleForgot = (e: FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
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
        className="relative z-10 w-full max-w-md p-10 glass-card shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
      >
        <AnimatePresence mode="wait">
          {!isForgot ? (
            <motion.div 
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              {/* Header */}
              <header className="text-center space-y-6 flex flex-col items-center">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="w-20 h-20 rounded-[30px] bg-gradient-to-br from-primary via-secondary to-tertiary flex items-center justify-center shadow-2xl shadow-primary/30"
                >
                  <Zap className="w-10 h-10 text-surface fill-surface" />
                </motion.div>
                <div className="space-y-1">
                  <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-br from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                    Connect
                  </h1>
                  <p className="text-on-surface-variant text-sm font-medium">Welcome back to Lead Intelligence</p>
                </div>
              </header>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-8">
                {/* Email */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-2">Work Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                    <input 
                      type="email" 
                      placeholder="name@company.com"
                      className="w-full bg-surface-container-lowest/30 border-none rounded-full py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none text-on-surface"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Password</label>
                    <button 
                      type="button" 
                      onClick={() => setIsForgot(true)}
                      className="text-[10px] text-primary font-black uppercase tracking-widest hover:text-primary-dim transition-colors"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full bg-surface-container-lowest/30 border-none rounded-full py-4 pl-14 pr-14 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none text-on-surface"
                      required
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

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 rounded-full bg-gradient-to-r from-primary to-primary-dim text-surface font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:shadow-inner transition-all"
                >
                  Accedi
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>

              {/* Separator */}
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink-0 mx-6 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Or continue with</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-2 py-3 rounded-2xl glass border-white/5 hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.38-1.36-.38-2.09s.16-1.43.38-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-[10px] font-bold">Google</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 py-3 rounded-2xl glass border-white/5 hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05 1.72-3.14 1.72-1.07 0-1.42-.66-2.65-.66-1.25 0-1.64.64-2.64.66-1.05.02-2-1.12-3.13-2.18-1.78-1.55-3.1-4.38-3.1-6.87 0-3.88 2.5-5.92 4.9-5.92 1.25 0 2.45.86 3.22.86.75 0 2.22-.92 3.75-.78 1.48.1 2.22.68 2.72 1.3-1.22.75-2.05 2.15-2.05 3.55 0 1.95 1.45 3.32 3.12 3.32.08 0 .15 0 .23-.01a7.22 7.22 0 0 1-.98 2.94M12.03 5.4c.05-1.5.83-2.88 2.05-3.82-1.05-.12-2.18.28-3.05 1.1-.88.85-1.58 2.2-1.42 3.65 1.28.1 2.38-.93 2.42-.93z"/>
                  </svg>
                  <span className="text-[10px] font-bold">Apple</span>
                </button>
              </div>

              <p className="text-center text-sm text-on-surface-variant">
                Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up</Link>
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="forgot"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              {!emailSent ? (
                <>
                  {/* Header */}
                  <header className="space-y-6 flex flex-col items-center text-center">
                    <button 
                      onClick={() => setIsForgot(false)}
                      className="self-start flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Torna al login
                    </button>
                    <div className="w-20 h-20 rounded-[30px] bg-white/5 flex items-center justify-center border border-white/10 shadow-xl">
                      <Lock className="w-10 h-10 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-3xl font-black tracking-tighter text-white">
                        Recupero Password
                      </h2>
                      <p className="text-on-surface-variant text-sm font-medium">Inserisci la tua email per ricevere un link di reset</p>
                    </div>
                  </header>

                  {/* Form */}
                  <form onSubmit={handleForgot} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-2">Email Aziendale</label>
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                        <input 
                          type="email" 
                          placeholder="name@company.com"
                          className="w-full bg-surface-container-lowest/30 border-none rounded-full py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none text-on-surface"
                          required
                        />
                      </div>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-5 rounded-full bg-white text-surface font-black text-lg shadow-xl hover:bg-opacity-90 transition-all"
                    >
                      Invia Link
                    </motion.button>
                  </form>
                </>
              ) : (
                <div className="text-center space-y-8 py-4">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-500 border border-emerald-500/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white tracking-tight">Email Inviata!</h2>
                    <p className="text-on-surface-variant font-medium leading-relaxed">
                      Abbiamo inviato le istruzioni per il reset della password alla tua email. Controlla anche la cartella spam.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsForgot(false);
                      setEmailSent(false);
                    }}
                    className="w-full py-4 rounded-full border border-white/10 text-on-surface font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
                  >
                    Torna al login
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
