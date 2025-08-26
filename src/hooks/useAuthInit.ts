import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

/**
 * Hook to ensure authentication state is properly initialized
 * Call this in your main App component to guarantee state persistence
 */
export const useAuthInit = () => {
  const { isAuthenticated, user, initializeFromStorage, autoLogoutIfInvalid } = useAuthStore();

  useEffect(() => {
    console.log('🚀 [AUTH-INIT] Initializing authentication state...');
    
    // Check if Zustand's persist middleware has loaded the state
    const checkInitialization = () => {
      // If we don't have state but localStorage has data, manually initialize
      if (!isAuthenticated && !user) {
        const stored = localStorage.getItem('user-auth-storage');
        if (stored) {
          console.log('🔄 [AUTH-INIT] Zustand persist may have failed, manually initializing...');
          initializeFromStorage();
        }
      }
      
      // Always validate tokens on app start
      autoLogoutIfInvalid();
      
      console.log('✅ [AUTH-INIT] Authentication initialization complete');
      console.log('🔐 [AUTH-INIT] Current auth status:', { isAuthenticated, userId: user?.id });
    };

    // Small delay to ensure Zustand persist has completed
    const timer = setTimeout(checkInitialization, 200);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array - only run once on mount

  return { isAuthenticated, user };
};