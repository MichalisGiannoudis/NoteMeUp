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
  refreshToken: () => Promise<boolean>;
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

      refreshToken: async () => {
        const { token } = get();
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        
        if (!token) {
          return false;
        }
        
        try {
          const response = await axios({
            method: 'POST',
            url: `${API_URL}/auth/refresh`,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response?.data?.token) {
            set({ token: response.data.token });
            return true;
          }
          
          return false;
        } catch (err) {
          get().logout();
          return false;
        }
      },

      getAuthenticatedUser: async () => {
        const { token } = get();
        const defaultReturnObject = { authenticated: false, user: null };
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        if (!token) {
          set({ authenticated: false, user: null });
          return defaultReturnObject;
        }
        
        try {
          const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            const expiry = payload.exp * 1000;
            
            if (expiry < Date.now()) {
              const refreshed = await get().refreshToken();
              if (!refreshed) {
                set({ authenticated: false, user: null, isLoading: false });
                return defaultReturnObject;
              }
            }
          }
          
          set({ isLoading: true });
          const response = await axios({
            method: 'GET',
            url: `${API_URL}/auth/me`,
            headers: {
              Authorization: `Bearer ${get().token}`,
              'X-CSRF-Protection': '1'
            },
            withCredentials: true
          });
    
          const { authenticated = false, user = null } = response.data;
          
          set({ authenticated, user, isLoading: false });
          return authenticated ? { authenticated, user } : defaultReturnObject;
          
        } catch (err: any) {
          if (err?.response?.status === 401) {
            const refreshed = await get().refreshToken();
            if (!refreshed) {
              set({ authenticated: false, user: null, isLoading: false });
              return defaultReturnObject;
            }
            
            return get().getAuthenticatedUser();
          }

          set({ authenticated: false, user: null, isLoading: false });
          return defaultReturnObject;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user, authenticated: state.authenticated }),
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
