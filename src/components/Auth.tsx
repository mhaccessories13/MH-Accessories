import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (signUpError) throw signUpError;
        setVerificationSent(true);
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <section id="auth" className="bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-gray-900 rounded-2xl p-8 border border-yellow-600/30">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-yellow-500/20 rounded-full">
                <Mail className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Verify Your Email</h2>
            <p className="text-gray-300 text-center mb-6">
              We've sent a verification email to <strong>{email}</strong>. Please check your inbox and click the link to confirm your account.
            </p>
            <button
              onClick={() => {
                setVerificationSent(false);
                setIsLogin(true);
              }}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-2 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="auth" className="bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-gray-900 rounded-2xl p-8 border border-yellow-600/30">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-2xl font-bold text-white">{isLogin ? 'Sign In' : 'Create Account'}</h2>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-2 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-yellow-500 hover:text-yellow-400 text-sm font-medium transition"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
