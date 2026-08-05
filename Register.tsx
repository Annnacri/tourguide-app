
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Registo Concluido</h2>
          <p className="text-gray-500 font-medium mb-8">Pode agora entrar na sua conta e começar a criar tours.</p>
          <button onClick={onSwitchToLogin} className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl uppercase tracking-widest shadow-lg">Ir para Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight text-center">Criar Conta</h2>
        <p className="text-gray-500 text-center mb-8 font-medium">Comece a criar tours profissionais hoje</p>
        
        <form onSubmit={handleRegister} className="space-y-6">
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
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Senha (mín. 6 caracteres)</label>
            <input 
              type="password" 
              required 
              minLength={6}
              className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-500 text-xs font-bold text-center animate-bounce">{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" color="text-white" /> : 'Registrar'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-gray-500 font-medium">
          Já tem uma conta?{' '}
          <button onClick={onSwitchToLogin} className="text-blue-600 font-bold hover:underline">Entrar</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
