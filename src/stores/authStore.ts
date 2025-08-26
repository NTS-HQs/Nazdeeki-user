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
  
  // Additional state tracking (optional)
  lastLoginTime: string | null;
  loginMethod: 'otp' | null;
  
  // Actions
  login: (tokens: { accessToken: string; refreshToken: string }, user: User) => void;
  logout: () => Promise<void>;
  updateTokens: (tokens: { accessToken: string; refreshToken?: string }) => void;
  setUser: (user: User) => void;
  checkTokenValidity: () => boolean;
  autoLogoutIfInvalid: () => void;
  initializeFromStorage: () => void;
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
      lastLoginTime: null,
      loginMethod: null,

      login: (tokens, user) => {
        set({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
          lastLoginTime: new Date().toISOString(),
          loginMethod: 'otp',
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
            lastLoginTime: null,
            loginMethod: null,
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

      // Manual initialization from storage (backup method)
      initializeFromStorage: () => {
        try {
          const stored = localStorage.getItem('user-auth-storage');
          if (stored) {
            const parsedState = JSON.parse(stored);
            console.log('🔄 [MANUAL-INIT] Manually initializing from localStorage');
            
            if (parsedState.state) {
              const { user, accessToken, refreshToken, isAuthenticated, lastLoginTime, loginMethod } = parsedState.state;
              
              // Only restore if we have valid token data
              if (user && accessToken && refreshToken) {
                set({
                  user,
                  accessToken,
                  refreshToken,
                  isAuthenticated,
                  lastLoginTime,
                  loginMethod,
                });
                
                console.log('✅ [MANUAL-INIT] Auth state manually restored');
                
                // Validate tokens after manual restore
                setTimeout(() => {
                  get().autoLogoutIfInvalid();
                }, 0);
              }
            }
          }
        } catch (error) {
          console.error('🚨 [MANUAL-INIT] Error manually initializing from storage:', error);
        }
      },
    }),
    {
      name: 'user-auth-storage',
      
      // Specify which states to persist (all auth-related states)
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        lastLoginTime: state.lastLoginTime,
        loginMethod: state.loginMethod,
      }),
      
      // Enhanced storage configuration for reliability
      storage: {
        getItem: (name) => {
          try {
            const item = localStorage.getItem(name);
            console.log('🔄 [STORAGE] Loading auth state from localStorage');
            return item ? JSON.parse(item) : null;
          } catch (error) {
            console.error('🚨 [STORAGE] Error loading from localStorage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
            console.log('💾 [STORAGE] Auth state saved to localStorage');
          } catch (error) {
            console.error('🚨 [STORAGE] Error saving to localStorage:', error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
            console.log('🗑️ [STORAGE] Auth state removed from localStorage');
          } catch (error) {
            console.error('🚨 [STORAGE] Error removing from localStorage:', error);
          }
        },
      },
      
      // Handle state rehydration after page reload/restart
      onRehydrateStorage: () => {
        console.log('🔄 [REHYDRATION] Starting auth state rehydration...');
        return (state, error) => {
          if (error) {
            console.error('🚨 [REHYDRATION] Error rehydrating auth state:', error);
            return;
          }
          
          if (state) {
            console.log('✅ [REHYDRATION] Auth state successfully rehydrated');
            console.log('👤 [REHYDRATION] User:', state.user?.name, state.user?.id);
            console.log('🔐 [REHYDRATION] Authenticated:', state.isAuthenticated);
            
            // Validate tokens after rehydration
            setTimeout(() => {
              console.log('🔍 [VALIDATION] Checking token validity after rehydration...');
              state.autoLogoutIfInvalid();
            }, 100); // Small delay to ensure state is fully loaded
          } else {
            console.log('📭 [REHYDRATION] No previous auth state found');
          }
        };
      },
      
      // Version for handling schema changes
      version: 1,
      
      // Migrate function for future schema updates
      migrate: (persistedState: any, version: number) => {
        console.log(`🔄 [MIGRATION] Migrating auth state from version ${version}`);
        return persistedState;
      },
    }
  )
);