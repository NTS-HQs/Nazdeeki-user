
import { useAuthStore } from '../stores/authStore';

const HomePage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <main className="flex-grow p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 border-2">
          <p className="text-xl md:text-3xl font-bold text-gray-800 mb-4 text-center">Welcome to Nazdeeki!</p>
          
          {user && (
            <div className="bg-orange-50 border border-orange-200 rounded-sm p-4 md:p-8 my-6">
              <h2 className="text-lg font-semibold text-orange-800 mb-2">User Information</h2>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {user.name}</p>
                <p><span className="font-medium">Phone:</span> +91 {user.phone}</p>
                <p><span className="font-medium">User ID:</span> {user.id}</p>
                {user.email && <p><span className="font-medium">Email:</span> {user.email}</p>}
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">You are successfully logged in!</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-sm transition-colors my-4"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default HomePage;
