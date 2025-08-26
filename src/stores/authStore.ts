import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  dob?: string;
  preference?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (tokens: { accessToken: string; refreshToken: string }, user: User) => void;
  logout: () => Promise<void>;
  updateTokens: (tokens: { accessToken: string; refreshToken?: string }) => void;
  setUser: (user: User) => void;
  checkTokenValidity: () => boolean;
  autoLogoutIfInvalid: () => void;
}

// Helper function to decode JWT without verification
const decodeJWT = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

// Helper function to check if token is expired
const isTokenExpired = (token: string) => {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;
  return Date.now() >= payload.exp * 1000;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (tokens, user) => {
        set({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        try {
          // Call logout API if we have a token
          const { accessToken } = get();
          if (accessToken) {
            const { logout: logoutApi } = await import('../lib/authApi');
            await logoutApi();
          }
        } catch (error) {
          console.error('Logout API call failed:', error);
          // Continue with local logout even if API call fails
        } finally {
          // Clear local storage and state
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          
          // Redirect to login page
          window.location.href = '/login';
        }
      },

      updateTokens: (tokens) => {
        set((state) => ({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken || state.refreshToken,
        }));
      },

      setUser: (user) => {
        set({ user });
      },

      // Check if current tokens are valid
      checkTokenValidity: () => {
        const { accessToken, refreshToken } = get();
        
        // If no tokens at all, not valid
        if (!accessToken || !refreshToken) {
          return false;
        }
        
        // If access token is expired, check refresh token
        if (isTokenExpired(accessToken)) {
          // If refresh token is also expired, not valid
          if (isTokenExpired(refreshToken)) {
            return false;
          }
        }
        
        return true;
      },

      // Auto logout if tokens are invalid
      autoLogoutIfInvalid: () => {
        const { checkTokenValidity, logout, isAuthenticated } = get();
        
        if (isAuthenticated && !checkTokenValidity()) {
          console.log('🚨 Auto-logout: Invalid or expired tokens detected');
          logout();
        }
      },
    }),
    {
      name: 'user-auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      // Add onRehydrateStorage to check token validity on app start
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Check token validity after rehydration
          setTimeout(() => {
            state.autoLogoutIfInvalid();
          }, 0);
        }
      },
    }
  )
);