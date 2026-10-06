import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../shared/services/apiClient';

const ResetPasswordPage = () => {
  const [searchParams]  = useSearchParams();
  const navigate        = useNavigate();
  const token           = searchParams.get('token');

  const [tokenValid, setTokenValid] = useState(null);
  const [form, setForm]             = useState({ newPassword: '', confirmPassword: '' });
  const [loading, setLoading]       = useState(false);
  const [done, setDone]             = useState(false);
  const [error, setError]           = useState('');

  useEffect(() => {
    if (!token) { setTokenValid(false); return; }
    apiClient.post('/auth/verify-reset-token', { token })
      .then(() => setTokenValid(true))
      .catch(() => setTokenValid(false));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.newPassword.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (form.newPassword !== form.confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      await apiClient.post('/auth/reset-password', { token, newPassword: form.newPassword });
      setDone(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to reset password');
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

          {tokenValid === null && (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-[#f5a623] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Verifying your reset link...</p>
            </div>
          )}

          {tokenValid === false && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-3xl mx-auto mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Link expired or invalid</h2>
              <p className="text-gray-500 text-sm mb-6">This link has expired or already been used. Links are valid for 1 hour.</p>
              <Link to="/forgot-password"
                className="block w-full py-3 px-4 bg-[#f5a623] hover:bg-[#e8940a] text-[#0a0f1e] rounded-xl text-sm font-bold text-center transition-all">
                Request a New Link
              </Link>
            </div>
          )}

          {done && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Password reset!</h2>
              <p className="text-gray-500 text-sm mb-6">Redirecting you to sign in...</p>
              <Link to="/login"
                className="block w-full py-3 px-4 bg-[#0a0f1e] text-white rounded-xl text-sm font-bold text-center transition-all">
                Sign In Now
              </Link>
            </div>
          )}

          {tokenValid === true && !done && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Set a new password</h2>
                <p className="text-gray-500 text-sm">Choose a strong password you haven't used before.</p>
              </div>
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                  <input type="password" value={form.newPassword}
                    onChange={(e) => setForm((p) => ({ ...p, newPassword: e.target.value }))}
                    placeholder="Min 8 characters" autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                               focus:outline-none focus:ring-2 focus:ring-[#f5a623]/30 focus:border-[#f5a623] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                  <input type="password" value={form.confirmPassword}
                    onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="Repeat your new password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                               focus:outline-none focus:ring-2 focus:ring-[#f5a623]/30 focus:border-[#f5a623] transition-all" />
                </div>
                <ul className="text-xs space-y-1 pl-1">
                  <li className={form.newPassword.length >= 8 ? 'text-emerald-500' : 'text-gray-400'}>
                    {form.newPassword.length >= 8 ? '✓' : '○'} At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(form.newPassword) ? 'text-emerald-500' : 'text-gray-400'}>
                    {/[A-Z]/.test(form.newPassword) ? '✓' : '○'} One uppercase letter
                  </li>
                  <li className={/[0-9]/.test(form.newPassword) ? 'text-emerald-500' : 'text-gray-400'}>
                    {/[0-9]/.test(form.newPassword) ? '✓' : '○'} One number
                  </li>
                </ul>
                <button type="submit" disabled={loading}
                  className="w-full py-3 px-4 bg-[#f5a623] hover:bg-[#e8940a] disabled:opacity-60
                             text-[#0a0f1e] rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-[#0a0f1e] border-t-transparent rounded-full animate-spin" /> Resetting...</>
                    : 'Reset Password'
                  }
                </button>
              </form>
              <p className="text-center text-sm text-gray-500 mt-6">
                <Link to="/login" className="text-[#e8940a] hover:text-[#c47a08] font-medium transition-colors">Back to Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;