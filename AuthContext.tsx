
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './services/SupabaseClient';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  isPremium: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  guestSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER_KEY = 'ai-tour-mock-user';
const MOCK_DB_KEY = 'ai-tour-mock-users-db';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const isDemoMode = !supabase;

  useEffect(() => {
    const defaultGuest = { 
      id: 'original-access-user', 
      email: 'admin@aistudiocreator.com', 
      isPremium: true 
    };

    if (!supabase) {
      setUser(defaultGuest);
      setIsPremium(true);
      setLoading(false);
      return;
    }

    // Real Supabase Auth Initialization
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? defaultGuest);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsPremium(true);
      }
      setLoading(false);
    }).catch((err) => {
      console.warn("Supabase session check fallback to guest:", err);
      setUser(defaultGuest);
      setIsPremium(true);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', userId)
        .single();
      
      if (data) setIsPremium(data.is_premium);
    } catch (e) {
      console.error("Erro ao carregar perfil:", e);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      const db = JSON.parse(localStorage.getItem(MOCK_DB_KEY) || '[]');
      const found = db.find((u: any) => u.email === email && u.password === password);
      if (found) {
        const userSession = { email: found.email, id: found.id, isPremium: found.isPremium };
        setUser(userSession);
        setIsPremium(found.isPremium);
        localStorage.setItem(MOCK_USER_KEY, JSON.stringify(userSession));
        return { error: null };
      }
      return { error: { message: "Credenciais inválidas." } };
    }
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const guestSignIn = async () => {
    const guestUser = { id: 'demo-guest', email: 'guest@example.com', isPremium: true };
    setUser(guestUser);
    setIsPremium(true);
    setLoading(false);
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      const db = JSON.parse(localStorage.getItem(MOCK_DB_KEY) || '[]');
      const newUser = { id: Math.random().toString(36), email, password, isPremium: true };
      db.push(newUser);
      localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
      return { error: null };
    }
    return await supabase.auth.signUp({ email, password });
  };

  const signOut = async () => {
    if (!supabase) {
      setUser(null);
      setIsPremium(false);
      localStorage.removeItem(MOCK_USER_KEY);
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, isPremium, isDemoMode, signIn, signUp, signOut, guestSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
