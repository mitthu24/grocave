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
  KeyRound,
  ArrowLeft,
  CheckCircle2
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
    }, 400);
  };

  const handleFillSuperAdmin = () => {
    setEmail('mitthuraj293@gmail.com');
    setPassword('Super@123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-grid-pattern">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#6A00FF]/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Bar with Back to Website */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#6A00FF]" />
          <span>Back to Website</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mt-8 sm:mt-0">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block focus:outline-none mb-4">
            <GrocaveLogo variant="stacked" size="md" />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A00FF]/15 border border-[#6A00FF]/30 text-[#b992ff] text-[11px] font-mono uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Personnel Only</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Admin & Lead Command Portal
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Access lead management, client inquiries, and platform administration.
          </p>
        </div>

        {/* Login Box */}
        <div className="rounded-2xl bg-[#141420]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl glow-purple">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Authorized Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. mitthuraj293@gmail.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-300">
                  Password
                </label>
                <span className="text-[11px] text-gray-500">Secure AES-256</span>
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
                  className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6A00FF] via-[#7B1CFF] to-[#975BFF] hover:from-[#5C00E6] hover:to-[#8840FF] text-white font-bold text-sm shadow-lg shadow-[#6A00FF]/30 hover:shadow-[#6A00FF]/50 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating Session...</span>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Superadmin Credentials Helper for user */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#b992ff] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Default Superadmin Credentials</span>
                </span>
                <button
                  type="button"
                  onClick={handleFillSuperAdmin}
                  className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#6A00FF]/30 hover:bg-[#6A00FF] text-white transition-colors"
                >
                  Auto-Fill
                </button>
              </div>
              <div className="text-[11px] text-gray-400 font-mono space-y-0.5">
                <div>Email: <span className="text-gray-200">mitthuraj293@gmail.com</span></div>
                <div>Pass: <span className="text-gray-200">Super@123</span></div>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center text-[11px] text-gray-500">
            <span>Public registration is disabled. Contact Superadmin for team invitations.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
