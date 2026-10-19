import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Session } from '../types';
import { activate } from '../api/activation';
import { authenticate } from '../api/xtream';

const KEY = 'iptv_session';
type Ctx = {
  session: Session | null;
  loading: boolean;
  signIn: (code: string) => Promise<void>;
  signOut: () => Promise<void>;
};
const AuthContext = createContext<Ctx>(null as any);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await SecureStore.getItemAsync(KEY);
        if (raw) {
          const s: Session = JSON.parse(raw);
          await authenticate(s); // تأكد أن الاشتراك ما زال صالحاً
          setSession(s);
        }
      } catch {
        await SecureStore.deleteItemAsync(KEY).catch(() => {});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = useCallback(async (code: string) => {
    const s = await activate(code);
    await authenticate(s);
    await SecureStore.setItemAsync(KEY, JSON.stringify(s));
    setSession(s);
  }, []);

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(KEY).catch(() => {});
    setSession(null);
  }, []);

  return <AuthContext.Provider value={{ session, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
}
