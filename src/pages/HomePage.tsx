
import { useAuthStore } from '../stores/authStore';
import { AuthDebugInfo } from '../components/AuthDebugInfo';

const HomePage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <main className="flex-grow p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Nazdeeki!</h1>
          
          {user && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold text-orange-800 mb-2">User Information</h2>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {user.name}</p>
                <p><span className="font-medium">Phone:</span> +91 {user.phone}</p>
                <p><span className="font-medium">User ID:</span> {user.id}</p>
                {user.email && <p><span className="font-medium">Email:</span> {user.email}</p>}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <p className="text-gray-600">You are successfully logged in!</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Debug info - only shows in development */}
      <AuthDebugInfo />
    </main>
  );
};

export default HomePage;
