
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const { signIn, guestSignIn, isDemoMode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGuestAccess = async () => {
    setGuestLoading(true);
    await guestSignIn();
    setGuestLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight text-center">Login</h2>
        <p className="text-gray-500 text-center mb-8 font-medium">Bem-vindo de volta ao AI Tourguide Creator</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">E-mail</label>
            <input 
              type="email" 
              required 
              className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Senha</label>
            <input 
              type="password" 
              required 
              className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-500 text-xs font-bold text-center animate-bounce">{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading || guestLoading}
            className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" color="text-white" /> : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <button 
            onClick={handleGuestAccess}
            disabled={loading || guestLoading}
            className="w-full bg-emerald-50 text-emerald-600 border-2 border-dashed border-emerald-200 font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
          >
            {guestLoading ? <LoadingSpinner size="sm" color="text-emerald-600" /> : (
              <>
                <span className="text-xl">🚀</span> 
                Acesso Rápido (Modo Demo)
              </>
            )}
          </button>
          <p className="mt-2 text-[9px] text-gray-400 text-center font-bold uppercase tracking-tight">
            Entra instantaneamente para testar sem registo
          </p>
        </div>
        
        <p className="mt-8 text-center text-gray-500 font-medium">
          Não tem uma conta?{' '}
          <button onClick={onSwitchToRegister} className="text-blue-600 font-bold hover:underline">Registrar-se</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
