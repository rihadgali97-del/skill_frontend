import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import { ROUTES } from '../../../shared/constants/routes';

const LoginPage = () => {
  const [form, setForm]                 = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error }       = useAuth();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => { e.preventDefault(); await login(form); };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-[#0a0f1e] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#f5a623]/5 blur-2xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#6b4fa0]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#f5a623]/3 blur-3xl" />

        <div className="max-w-sm text-center relative z-10">
          {/* Logo placeholder — replace with actual logo img tag */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-[#f5a623]/20 border border-[#f5a623]/30 mb-6">
            <span className="text-5xl font-bold text-[#f5a623]">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Skillva<span className="text-[#f5a623]">Tech</span>
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">
            Skills Today. Innovation Tomorrow.
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            Your all-in-one platform for managing courses, clients, services and projects.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {['CRM', 'LMS', 'Invoices', 'Analytics', 'Services'].map((f) => (
              <span key={f} className="px-3 py-1 rounded-full text-xs font-medium bg-[#f5a623]/10 border border-[#f5a623]/20 text-[#f5a623]">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <span className="text-2xl font-bold text-gray-900">
              Skillva<span className="text-[#f5a623]">Tech</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623]/30
                           focus:border-[#f5a623] transition-all shadow-sm" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to={ROUTES.FORGOT_PASSWORD}
                  className="text-xs text-[#e8940a] hover:text-[#c47a08] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input name="password" type={showPassword ? 'text' : 'password'} required
                  value={form.password} onChange={handleChange} placeholder="••••••••"
                  className="w-full px-4 py-3 pr-16 rounded-xl bg-white border border-gray-300 text-gray-900
                             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623]/30
                             focus:border-[#f5a623] transition-all shadow-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-[#f5a623] hover:bg-[#e8940a] text-[#0a0f1e] font-bold
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to={ROUTES.REGISTER}
              className="text-[#e8940a] hover:text-[#c47a08] font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;