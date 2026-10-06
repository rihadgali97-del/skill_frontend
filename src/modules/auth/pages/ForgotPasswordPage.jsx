import { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../../shared/services/apiClient';

const ForgotPasswordPage = () => {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Please enter your email address'); return; }
    setLoading(true); setError('');
    try {
      await apiClient.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Something went wrong');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#0a0f1e] flex items-center justify-center text-[#f5a623] font-bold text-xl mx-auto mb-4">S</div>
          <span className="text-xl font-bold text-gray-900">Skillva<span className="text-[#f5a623]">Tech</span></span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#f5a623]/10 border border-[#f5a623]/20 flex items-center justify-center text-3xl mx-auto mb-4">📧</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-500 text-sm mb-6">
                If <strong>{email}</strong> is registered, a reset link has been sent. Check your spam folder too.
              </p>
              <p className="text-xs text-gray-400 mb-6">The link expires in 1 hour.</p>
              <Link to="/login"
                className="block w-full py-3 px-4 bg-[#0a0f1e] hover:bg-[#131929] text-white rounded-xl text-sm font-semibold text-center transition-all">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Forgot your password?</h2>
                <p className="text-gray-500 text-sm">Enter your email and we'll send a reset link.</p>
              </div>
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com" autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 text-sm
                               focus:outline-none focus:ring-2 focus:ring-[#f5a623]/30 focus:border-[#f5a623] transition-all" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 px-4 bg-[#f5a623] hover:bg-[#e8940a] disabled:opacity-60
                             text-[#0a0f1e] rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-[#0a0f1e] border-t-transparent rounded-full animate-spin" /> Sending...</>
                    : 'Send Reset Link'
                  }
                </button>
              </form>
              <p className="text-center text-sm text-gray-500 mt-6">
                Remember it?{' '}
                <Link to="/login" className="text-[#e8940a] hover:text-[#c47a08] font-medium transition-colors">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;