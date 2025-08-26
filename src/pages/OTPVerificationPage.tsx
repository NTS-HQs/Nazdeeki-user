import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOTP, sendOTP } from '../lib/authApi';
import { useAuthStore } from '../stores/authStore';

const OTPVerificationPage = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  // Get phone number and signup status from location state
  const phoneNumber = location.state?.phoneNumber || '';
  const isSignup = location.state?.isSignup || false;

  useEffect(() => {
    // Redirect back to login if no phone number
    if (!phoneNumber) {
      navigate('/login');
    }
  }, [phoneNumber, navigate]);

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOTP = [...otp];
    newOTP[index] = value.replace(/\D/g, ''); // Only digits
    setOTP(newOTP);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verifyOTP(phoneNumber, otpCode);
      if (response.success && response.tokens && response.user) {
        // Store tokens and user data
        login(response.tokens, response.user);
        console.log(`${response.isSignup ? 'Signup' : 'Login'} successful!`);
        navigate('/home');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
      console.error('OTP verify error:', err);
      // Clear OTP inputs on error
      setOTP(['', '', '', '']);
      const firstInput = document.getElementById('otp-0');
      firstInput?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    setOTP(['', '', '', '']);

    try {
      const response = await sendOTP(phoneNumber);
      if (response.success) {
        setError('');
        console.log('OTP resent successfully');
        // You could show a success message here
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to resend OTP. Please try again.');
      console.error('OTP resend error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  if (!phoneNumber) {
    return null; // Will redirect in useEffect
  }

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
      
      {/* Center OTP Verification Form Layer */}
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

          {/* OTP Verification Form */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                OTP Verification
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                We've sent a 4-digit OTP to your mobile{'\n'}
                number ending with {phoneNumber.slice(-4)}.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* OTP Input Fields */}
            <div className="flex justify-center space-x-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none bg-gray-50"
                  maxLength={1}
                  disabled={loading}
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.some(digit => !digit)}
              className="w-full text-white font-medium py-4 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#FF6B35',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!loading && !otp.some(digit => !digit)) {
                  e.currentTarget.style.backgroundColor = '#E55A2B';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FF6B35';
              }}
            >
              {loading ? 'Verifying...' : 'Submit'}
            </button>

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">
                Didn't get the code?{' '}
                <button
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-orange-600 font-medium underline disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </p>
              
              {/* Back to Login */}
              <button
                onClick={handleBack}
                disabled={loading}
                className="text-gray-500 text-sm underline disabled:opacity-50 mt-2"
              >
                ← Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;