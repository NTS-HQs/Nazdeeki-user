import { useAuthStore } from '../stores/authStore';

/**
 * Debug component to show current auth state and storage info
 * Only use in development - remove from production
 */
export const AuthDebugInfo = () => {
  const { 
    user, 
    isAuthenticated, 
    accessToken, 
    refreshToken, 
    lastLoginTime, 
    loginMethod,
    checkTokenValidity 
  } = useAuthStore();

  const clearStorage = () => {
    localStorage.removeItem('user-auth-storage');
    console.log('🗑️ [DEBUG] Cleared localStorage');
    window.location.reload();
  };

  const showStorageContent = () => {
    const stored = localStorage.getItem('user-auth-storage');
    console.log('📦 [DEBUG] localStorage content:', stored);
    alert('Check console for localStorage content');
  };

  const isValidTokens = checkTokenValidity();

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-xs">
      <h4 className="font-bold mb-2">🔧 Auth Debug Info</h4>
      <div className="space-y-1">
        <p><strong>User ID:</strong> {user?.id || 'None'}</p>
        <p><strong>Authenticated:</strong> {isAuthenticated ? '✅' : '❌'}</p>
        <p><strong>Valid Tokens:</strong> {isValidTokens ? '✅' : '❌'}</p>
        <p><strong>Login Method:</strong> {loginMethod || 'None'}</p>
        <p><strong>Last Login:</strong> {lastLoginTime ? new Date(lastLoginTime).toLocaleTimeString() : 'Never'}</p>
        <p><strong>Access Token:</strong> {accessToken ? '✅' : '❌'}</p>
        <p><strong>Refresh Token:</strong> {refreshToken ? '✅' : '❌'}</p>
      </div>
      <div className="flex gap-2 mt-3">
        <button 
          onClick={showStorageContent}
          className="bg-blue-600 px-2 py-1 rounded text-xs"
        >
          Show Storage
        </button>
        <button 
          onClick={clearStorage}
          className="bg-red-600 px-2 py-1 rounded text-xs"
        >
          Clear Storage
        </button>
      </div>
    </div>
  );
};