import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  email: string;
  firstname: string;
  lastname: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  authenticated: boolean;
  isLoading: boolean;
  
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;
  signIn: (token: string, user: User) => void;
  getAuthenticatedUser: () => Promise<{ authenticated: boolean; user: User | null }>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      authenticated: false,
      isLoading: false,

      setToken: (token: string) => {
        set({ token });
      },

      setUser: (user: User) => {
        set({ user });
      },

      setAuthenticated: (authenticated: boolean) => {
        set({ authenticated });
      },

      logout: () => {
        set({ token: null, user: null, authenticated: false });
      },

      signIn: (token: string, user: User) => {
        set({ token, user, authenticated: true });
      },

      getAuthenticatedUser: async () => {
        const { token } = get();
        const defaultReturnObject = { authenticated: false, user: null };
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        try {
          if (!token) {
            set({ authenticated: false, user: null });
            return defaultReturnObject;
          }
          
          set({ isLoading: true });
          const response = await axios({
            method: 'GET',
            url: `${API_URL}/auth/me`,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
    
          const { authenticated = false, user = null } = response.data;
          
          set({ authenticated, user, isLoading: false });
          return authenticated ? { authenticated, user } : defaultReturnObject;
          
        } catch (err) {

          set({ authenticated: false, user: null, isLoading: false });
          return defaultReturnObject;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user, authenticated: state.authenticated }),
    }
  )
);
