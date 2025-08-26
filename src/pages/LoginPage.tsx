import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '../lib/authApi';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleGetOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await sendOTP(phoneNumber);
      if (response.success) {
        console.log(`OTP sent successfully. ${response.isSignup ? 'New user signup' : 'Existing user login'}`);
        // Navigate to OTP verification page with phone number and signup status
        navigate('/otp-verification', {
          state: {
            phoneNumber: phoneNumber,
            isSignup: response.isSignup
          }
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.');
      console.error('OTP send error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Layer - 3.png */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/pages/3.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Bottom Layer - 4.png */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{
          backgroundImage: "url('/pages/4.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Center Login Form Layer - Similar to 5.png */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div 
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4"
          style={{
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/source_Black_and_White_Simple_Circle_Brush_Name_Logo__8_-removebg-preview.png"
                alt="Nazdeeki Logo"
                className="w-[300px] h-[105px] object-cover"
              />
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Login with Mobile
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Quick login with a one-time password (OTP)
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Phone Input */}
            <div className="relative">
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 px-4 py-3">
                <span className="text-sm mr-2">🇮🇳</span>
                <span className="text-gray-600 mr-2">+91</span>
                <span className="text-gray-300 mr-2">|</span>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  maxLength={10}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Get OTP Button */}
            <button
              onClick={handleGetOTP}
              disabled={loading || phoneNumber.length !== 10}
              className="w-full text-white font-medium py-4 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#FF6B35',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!loading && phoneNumber.length === 10) {
                  e.currentTarget.style.backgroundColor = '#E55A2B';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FF6B35';
              }}
            >
              {loading ? 'Sending...' : 'Get OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
