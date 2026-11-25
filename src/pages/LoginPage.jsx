import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GrocaveLogo from '../components/GrocaveLogo';
import { adminLogin, getCurrentAdminUser } from '../data/adminStore';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    const existing = getCurrentAdminUser();
    if (existing) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = adminLogin(email, password);
      setLoading(false);

      if (res.success) {
        navigate('/admin', { replace: true });
      } else {
        setError(res.error || 'Authentication failed. Please verify your credentials.');
      }
    }, 350);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0B0F] text-[#F7F8FA] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-grid-pattern selection:bg-[#6A00FF] selection:text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#6A00FF]/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />

      {/* Top back navigation */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#6A00FF]" />
          <span className="hidden sm:inline">Back to</span>
          <span>grocave.online</span>
        </Link>
      </div>

      {/* Main Login Card - Compact, vertically centered, zero layout shift */}
      <div className="w-full max-w-sm sm:max-w-md my-auto">
        
        {/* Card Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block focus:outline-none mb-3">
            <GrocaveLogo variant="horizontal" size="md" />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6A00FF]/15 border border-[#6A00FF]/30 text-[#b992ff] text-[10px] font-mono uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Authorized Management Only</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Admin & Lead Portal
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Sign in with your authorized staff credentials
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl bg-[#141420]/95 backdrop-blur-xl border border-white/10 p-5 sm:p-7 shadow-2xl glow-purple">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Authorized Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@grocave.online"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-300">
                  Password
                </label>
                <span className="text-[10px] text-gray-500 font-mono">Encrypted</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6A00FF] via-[#7B1CFF] to-[#975BFF] hover:from-[#5C00E6] hover:to-[#8840FF] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#6A00FF]/30 hover:shadow-[#6A00FF]/50 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Secure notice without exposing confidential credentials */}
          <div className="mt-5 pt-4 border-t border-white/10 text-center text-[11px] text-gray-500">
            <span>Public registration is closed. Contact the Superadmin for staff invitations.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
